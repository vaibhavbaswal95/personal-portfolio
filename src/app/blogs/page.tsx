import BlogCard from "../../components/BlogCard";

const blogs = [
  {
    title: "Fine-tuning Llama with LoRA: What actually works vs what tutorials skip",
    date: "2026-02-20",
    tags: ["LLMs", "LoRA", "Fine-tuning", "PyTorch"],
    excerpt: "Most LoRA tutorials show you the happy path. Here's what they don't tell you — gradient checkpointing, rank selection, learning rate schedules, and why your loss curve is lying to you.",
    slug: "finetuning-llama-lora-what-actually-works",
  },
  {
    title: "RAG is not magic — here's what breaks in production and how to fix it",
    date: "2026-02-15",
    tags: ["RAG", "LLMs", "Production", "Vector DBs"],
    excerpt: "Retrieval-Augmented Generation looks clean in demos. In production it falls apart — chunk boundaries, embedding drift, retrieval precision, reranking. Let's fix each one.",
    slug: "rag-what-breaks-in-production",
  },
  {
    title: "Building your first MCP server: the new way to connect LLMs to tools",
    date: "2026-02-10",
    tags: ["MCP", "Agents", "LLMs", "Python"],
    excerpt: "Model Context Protocol is quietly becoming the standard for LLM tool integration. Here's how to build an MCP server from scratch, and why it matters for the agentic AI ecosystem.",
    slug: "building-your-first-mcp-server",
  },
  {
    title: "Structured outputs with Pydantic + Instructor: stop parsing LLM text manually",
    date: "2026-02-05",
    tags: ["LLMs", "Pydantic", "Instructor", "Production"],
    excerpt: "If you're still regex-ing LLM responses or hoping the JSON is valid — there's a better way. Instructor + Pydantic gives you typed, validated, retry-able structured outputs every time.",
    slug: "structured-outputs-pydantic-instructor",
  },
  {
    title: "Local LLMs in 2025: Ollama vs vLLM vs llama.cpp — a real comparison",
    date: "2026-01-28",
    tags: ["LLMs", "Ollama", "vLLM", "Inference"],
    excerpt: "Three ways to run LLMs locally, three very different trade-offs. Benchmarks on throughput, latency, VRAM usage, and ease of setup — so you can pick the right tool for your use case.",
    slug: "local-llms-ollama-vllm-llamacpp-comparison",
  },
  {
    title: "Image matting without a green screen: how GAN-based matting works",
    date: "2026-01-20",
    tags: ["Computer Vision", "GANs", "Image Matting", "PyTorch"],
    excerpt: "Removing backgrounds from arbitrary images is a hard problem — hair, glass, fur, smoke. Here's how UNet + GAN training makes it tractable without any special hardware setup.",
    slug: "image-matting-without-green-screen",
  },
  {
    title: "From segmentation to object replacement: a practical CV pipeline",
    date: "2026-01-12",
    tags: ["Computer Vision", "Segmentation", "PyTorch"],
    excerpt: "Detecting an object is step one. Replacing it seamlessly — with correct lighting, perspective, and blending — is the hard part. Here's an end-to-end pipeline that actually works.",
    slug: "segmentation-to-object-replacement-pipeline",
  },
  {
    title: "CLIP explained: how images and text learned to speak the same language",
    date: "2026-01-05",
    tags: ["CLIP", "Vision-Language", "Multimodal", "OpenAI"],
    excerpt: "CLIP is one of the most elegant ideas in modern AI — train on image-text pairs, get zero-shot classification for free. Here's how the contrastive learning objective actually works.",
    slug: "clip-explained-images-text-same-language",
  },
  {
    title: "8 years in ML: what I wish I knew at year 1",
    date: "2025-12-28",
    tags: ["Career", "ML", "Lessons", "Industry"],
    excerpt: "From a fresh IIT graduate to senior ML engineer — the skills that actually mattered, the ones I wasted time on, and the mindset shift that changed everything about how I approach problems.",
    slug: "8-years-in-ml-what-i-wish-i-knew",
  },
  {
    title: "From Computer Vision to LLMs — why the transition was easier than I expected",
    date: "2025-12-20",
    tags: ["Career", "Computer Vision", "LLMs", "Journey"],
    excerpt: "I spent years in CV — segmentation, matting, GANs. Then LLMs happened. Here's what transferred directly, what required unlearning, and why deep CV experience is actually a superpower in the LLM era.",
    slug: "computer-vision-to-llms-transition",
  },
];

export default function BlogsPage() {
  return (
    <main className="flex flex-col items-center w-full py-12 text-white">
      <h1 className="text-4xl font-extrabold text-galaxy-500 mb-10 font-display text-center text-[rgb(165,100,180)]">Blogs</h1>
      <div className="flex flex-col gap-8 w-full max-w-3xl px-4">
        {blogs.map((blog, idx) => (
          <BlogCard key={idx} {...blog} />
        ))}
      </div>
    </main>
  );
}
