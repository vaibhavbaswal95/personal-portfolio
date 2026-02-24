export const post = {
  title: "From Computer Vision to LLMs — why the transition was easier than I expected",
  date: "2025-12-20",
  tags: ["Career", "Computer Vision", "LLMs", "Journey"],
  slug: "computer-vision-to-llms-transition",
  excerpt: "I spent years in CV — segmentation, matting, GANs. Then LLMs happened. Here's what transferred directly, what required unlearning, and why deep CV experience is actually a superpower in the LLM era.",
  content: `
When GPT-3 dropped in 2020, I was deep in a UNet training loop trying to get background matting to work without a green screen. I glanced at the announcement, thought "interesting" — and went back to debugging why my discriminator was collapsing.

That was a mistake in terms of timing. But it wasn't a mistake in terms of foundation.

I spent roughly four years doing serious computer vision work: instance segmentation, image matting, GAN-based synthesis, object replacement pipelines. The kind of work where you debug at the pixel level, where a 0.5 dB improvement in PSNR is worth celebrating, where you think in tensors, receptive fields, and loss landscapes.

Then LLMs became impossible to ignore — and I made the switch. Here's what actually happened.

---

## What transferred immediately

### Thinking in tensors and gradients

This sounds obvious, but it's not. A lot of people who come to LLMs from a software background hit a wall when they need to reason about what's actually happening inside the model. For someone who has manually designed custom loss functions for GANs, who has debugged vanishing gradients in 50-layer networks, who knows what an activation distribution *should* look like — the internals of a transformer aren't mysterious. They're familiar.

Attention is just a learnable similarity function. Positional encodings are just a way to inject sequence structure. The residual stream is just a highway for information. None of this requires a leap of faith if you've lived inside deep networks before.

### Transfer learning intuitions

Working in CV in the 2018–2022 era meant living and breathing transfer learning. You didn't train from scratch — you took a ResNet, a VGG, a U-Net pretrained on ImageNet, and adapted it. You learned, concretely, what fine-tuning actually does to a model — which layers move, which stay frozen, what the learning rate schedule needs to look like.

When LoRA came along, it clicked immediately. Of course you don't need to update all 7 billion parameters. You just need to update the right parts, the same way fine-tuning a ResNet backbone means mostly training the last few blocks. The math is different, but the intuition is identical.

### Loss function design

GAN training is, famously, unstable. Getting a generator and discriminator to converge together without mode collapse is a genuine engineering challenge — and solving it teaches you something deep about how loss signals shape model behavior.

When I started working with RLHF and reward model training, I was immediately at home. The ideas are different in detail but the *problems* are the same: reward hacking is mode collapse, the reward model is the discriminator, and getting the policy to not over-optimize against it is the same balance you're always trying to strike in adversarial training.

---

## What required unlearning

### Precision vs. scale

In CV, you optimize for precision at inference time. You quantize carefully, you profile, you squeeze every millisecond. A model that's 2ms slower is a real problem.

In LLMs, the scale of the problem is so different that your instincts mislead you. A 7B parameter model is not comparable to a ResNet-50. The memory math is different, the compute math is different, the serving infrastructure is completely different. I spent the first few months mentally rescaling everything — and often getting it wrong.

### Evaluation

In CV, evaluation is usually concrete. SSIM, PSNR, mIoU, AP — numbers that correspond to something you can visually verify. You can *look* at the output and know if it's good.

LLM evaluation is genuinely hard. Perplexity tells you something but not everything. ROUGE scores can be gamed. Human evaluation is expensive and slow. LLM-as-judge is useful but circular. I still don't think we have solved this — and coming from a field with rigorous benchmarks, the looseness was uncomfortable at first.

### The prompt as interface

In CV, the interface to your model is fixed: an image goes in, a segmentation mask comes out. The API is typed, the inputs are structured.

LLMs are different. The prompt is a first-class artifact. How you phrase a question changes the answer in ways that aren't always predictable. This felt unscientific to me at first. It took a while to reframe it: the prompt isn't a hack, it's just a new kind of input that the model is sensitive to — the same way a CNN is sensitive to data augmentation and normalization.

---

## Why CV is a superpower in the LLM era

Here's the thing nobody told me: as LLMs mature, the problems that matter most are starting to look exactly like the problems I already solved.

**Vision-language models** — CLIP, LLaVA, GPT-4V, Gemini — are the future of multimodal AI. They need people who understand both halves: the vision encoder and the language model. Most LLM engineers don't have deep CV backgrounds. Most CV engineers haven't crossed over yet. That gap is valuable.

**Attention mechanisms** — originally designed for sequences — are now being applied to images (Vision Transformers), video, point clouds, and sensor fusion. Understanding how attention behaves in spatial settings requires CV intuition.

**Diffusion models** are the dominant paradigm for image generation now. They're deep learning, they're probabilistic, and they require the same kind of careful loss design and training intuition that GAN work demands.

The field is converging. The model is increasingly the same — a transformer — but the data modality changes. And knowing how to work with visual data, at a deep level, matters more than it ever has.

---

## What I'd tell someone making the same transition

Don't start with the API. Start with the architecture. Read "Attention is All You Need." Implement a small transformer from scratch. Once you've written the self-attention mechanism by hand, the whole field snaps into focus.

Then: pick one concrete problem and go deep. Fine-tune a small model on something you care about. Build a RAG pipeline end-to-end. Write a real agent with tool use. The concepts only become yours when you've debugged them.

And don't throw away your CV instincts. The visualization skills, the debugging intuitions, the comfort with training dynamics — they're all relevant. The field just calls them something different now.

---

*I went from debugging GAN training loops to building LLM-powered agents. The tools changed. The thinking didn't, nearly as much as I expected.*
  `.trim(),
};
