export const post = {
  title: "Fine-tuning Llama with LoRA: What actually works vs what tutorials skip",
  date: "2026-02-20",
  tags: ["LLMs", "LoRA", "Fine-tuning", "PyTorch"],
  slug: "finetuning-llama-lora-what-actually-works",
  excerpt:
    "Most LoRA tutorials show you the happy path. Here's what they don't tell you — gradient checkpointing, rank selection, learning rate schedules, and why your loss curve is lying to you.",
  content: `
Every LoRA tutorial ends the same way: loss goes down, the model answers your test prompt correctly, tutorial over.

What they don't show you is the second training run where loss goes to zero in epoch one and the model repeats the last token forever. Or the one where validation loss diverges at step 400. Or the run that looked perfect but the model forgot how to write coherent English.

I've fine-tuned enough models to know the gap between "it ran" and "it works." This is what that gap looks like — and how to close it.

---

## First: what LoRA actually does

Most explanations stop at "it's low-rank adaptation." Let's be precise.

A standard linear layer has weight matrix W of shape [d_out, d_in]. Full fine-tuning updates every element of W — that's d_out × d_in parameters. For a 7B model, this is tens of billions of numbers to store, update, and checkpoint.

LoRA freezes W and adds two small matrices:

**ΔW = B × A**

Where A has shape [r, d_in] and B has shape [d_out, r], and r is the rank — typically 4 to 64. The number of trainable parameters drops from d_out × d_in to r × (d_in + d_out), which for r=16 on a 4096-dim layer is roughly a 128x reduction.

At inference, you just add the two weight matrices: W_effective = W + (alpha/r) × B × A. The alpha is a scaling hyperparameter — more on that shortly.

**What this means practically:** you're not changing the model's knowledge. You're learning a *correction* to its existing representations. This is why LoRA works for task adaptation but struggles with teaching the model genuinely new facts it was never trained on.

---

## The hyperparameters that actually matter

### Rank (r)

This is the most misunderstood setting. Higher rank = more capacity = more parameters = not always better.

The rule of thumb I use:
- **r=4 to 8** — style adaptation, formatting, tone changes
- **r=16** — task-specific behavior, instruction following, domain vocabulary
- **r=32 to 64** — significant knowledge shift, code generation, complex reasoning

Don't start at r=64. Start at r=16, get a baseline, then go up only if you have evidence the model needs more capacity. Higher rank also means more VRAM and slower training.

### Alpha (lora_alpha)

Alpha controls the effective learning rate of the LoRA weights via the scaling factor alpha/r. Tutorials usually set alpha = 2×rank and move on.

This is mostly fine, but understand what it's doing: if you double the rank without changing alpha, you've halved the effective scale of your updates. If your training feels sluggish at r=32, try alpha=64 or alpha=32 — same rank, different scaling.

A simpler mental model: alpha/r is a multiplier on your LoRA gradient. Keep it between 0.5 and 2.0 as a starting point.

### Target modules

Most tutorials target only q_proj and v_proj. This works, but you're leaving capacity on the table.

For instruction tuning and chat-style fine-tuning, I recommend targeting all projection layers:

**q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj**

This covers attention AND the MLP blocks, which is where a lot of the "knowledge" actually lives. The parameter count goes up maybe 2–3x, but the quality improvement is meaningful.

For style-only changes (tone, format, persona), q_proj + v_proj is enough.

### Learning rate

This is where most runs fail. The common mistake is using the same LR as pre-training (1e-4 or 2e-4) without any warmup.

What works:
- **Learning rate:** 1e-4 to 3e-4 for most tasks
- **Warmup:** 3–5% of total steps, always
- **Schedule:** cosine decay, not linear
- **Batch size:** effective batch of 16–32 (use gradient accumulation)

The warmup is not optional. Without it, the first few batches hammer the LoRA weights with huge gradients and you spend the rest of training recovering.

---

## The things tutorials skip

### Gradient checkpointing is not optional at 7B+

If you're fine-tuning anything above 3B parameters and you're not using gradient checkpointing, you will run out of memory. It trades compute for memory — you recompute activations during the backward pass instead of storing them.

Enable it with:

**model.gradient_checkpointing_enable()**

And for quantized models (QLoRA):

**model = prepare_model_for_kbit_training(model)**

This call does three things: enables gradient checkpointing, casts layer norms to float32, and disables the KV cache. All three are necessary.

### Your loss curve is probably lying

A smoothly decreasing training loss is not success. It's a necessary but insufficient condition.

Watch for:
- **Train loss drops fast, val loss doesn't move** — you're memorizing the training set, not learning the pattern
- **Val loss decreases then suddenly spikes** — gradient exploding, add or reduce max_grad_norm
- **Both losses decrease but outputs are broken** — the metric you care about isn't captured by cross-entropy loss (common with instruction tuning)

The fix for the last one: evaluate qualitatively every N steps. Run 20 test prompts and read the outputs. No metric captures "the model now always responds in the wrong language" the way your eyes do.

### Token distribution matters more than dataset size

5,000 high-quality, diverse examples consistently beats 50,000 repetitive ones. The model already knows how to write — it's learning *how you want it to write*.

Watch out for:
- **Template leakage** — if every example has the exact same instruction prefix, the model learns to parrot the prefix, not generalize
- **Length imbalance** — if 80% of your examples are under 100 tokens, the model will learn to give short answers even when you want long ones
- **Label noise** — one bad example doesn't matter; 5% bad examples with a consistent pattern will teach the model that pattern

### The paged optimizer is not a gimmick

When using QLoRA (4-bit quantization + LoRA), use paged_adamw_32bit as your optimizer. It pages optimizer states to CPU when they don't fit in GPU VRAM.

The difference in practice: a run that would OOM at step 800 with regular AdamW will finish cleanly. The speed cost is minimal — maybe 5–10% slower.

### Max sequence length is a tradeoff, not a target

Setting max_seq_length to 2048 because "the model supports it" is a mistake if your training data averages 200 tokens. You're wasting compute and inflating batch size estimates.

Set max_seq_length to roughly 1.5× the 95th percentile of your data lengths. Check with:

**data_lengths = [len(tokenizer(example)['input_ids']) for example in dataset]**
**print(sorted(data_lengths)[int(0.95 * len(data_lengths))])**

---

## What the eval loop should actually look like

Standard LoRA tutorials check perplexity and call it done. Perplexity is a valid sanity check — if it's not going down, something is wrong. But it doesn't tell you if the model is actually useful.

A minimal eval loop I use:

**1. Perplexity on held-out data** — sanity check, should decrease

**2. 20 fixed test prompts** — same prompts every eval, lets you track qualitative changes over training

**3. Format compliance check** — does the output follow your expected format? For JSON extraction tasks, can you actually parse the JSON? For chat tasks, does the model stop when it should?

**4. Adversarial prompts** — does fine-tuning break general capability? Ask it something outside your training domain. A fine-tuned model that can only do one thing is often worse than a general model with a good system prompt.

---

## The fast iteration loop

Fine-tuning is empirical. You will run many experiments. Here's how to make each one cheap:

**Start small:** Use TinyLlama-1.1B or Llama-3.2-1B for your first 5 experiments. Validate the data pipeline, the loss curve shape, and the output quality before scaling to 7B.

**Log everything:** Use wandb or even just a CSV. Track: run name, model, rank, alpha, lr, batch size, dataset size, final val loss, qualitative assessment. You will forget which run was which.

**Save adapters, not full models:** A LoRA adapter for a 7B model is ~100MB. The merged model is ~14GB. Save adapters during training, merge only when you have a good checkpoint.

**Use the EarlyStopping:** If val loss hasn't improved in 3 evaluations, stop. You're either in a local minimum or overfitting. More steps won't help.

---

## The quick reference

| Setting | Conservative | Recommended | Aggressive |
|---------|-------------|-------------|------------|
| Rank | 4 | 16 | 64 |
| Alpha | 8 | 32 | 64 |
| LR | 1e-4 | 2e-4 | 3e-4 |
| Warmup | 5% | 3% | 1% |
| Target modules | q,v | q,k,v,o | all linear |
| Epochs | 1 | 3 | 5 |

Start conservative. Move right only when you have evidence the model needs more.

---

## One last thing

The best fine-tuned model is the one you can actually evaluate. Before you write a single line of training code, write your evaluation. Know what "good" looks like for your task. Know how you'll measure it.

Training a model without a clear evaluation is like navigating without a map. The loss curve will go down. The model will sound fluent. And it still might be completely wrong for your use case.

Define "done" before you start. Everything else is just hyperparameter search.
  `.trim(),
};
