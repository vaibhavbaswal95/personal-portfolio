import ProjectCard from "../../components/ProjectCard";

const projects = [
  {
    name: "arxivrush",
    description: "Research discovery tool for arXiv — track, filter, and synthesize the latest AI/ML papers automatically.",
    tech: ["Python", "AI", "arXiv API"],
    image: "/images/projects/arxivrush.png",
    github: "https://github.com/vaibhavbaswal95/arxivrush",
    demo: "",
  },
  {
    name: "kite-mcp-server",
    description: "MCP server exposing the Kite (Zerodha) trading API to LLM agents. Talk to your broker in plain English.",
    tech: ["MCP", "Python", "LLMs"],
    image: "/images/projects/kite-mcp.png",
    github: "https://github.com/vaibhavbaswal95/kite-mcp-server",
    demo: "",
  },
  {
    name: "llm-finetuning-cookbook",
    description: "Practical recipes for fine-tuning LLMs — LoRA, QLoRA, instruction tuning, and evaluation. Runs on a free Colab T4.",
    tech: ["PyTorch", "LoRA", "HuggingFace", "PEFT"],
    image: "/images/projects/llm-finetuning.png",
    github: "https://github.com/vaibhavbaswal95/llm-finetuning-cookbook",
    demo: "",
  },
  {
    name: "rag-from-scratch",
    description: "RAG pipeline built bottom-up: chunking → embeddings → retrieval → generation. No magic, just working code.",
    tech: ["LangChain", "ChromaDB", "OpenAI", "Python"],
    image: "/images/projects/rag.png",
    github: "https://github.com/vaibhavbaswal95/rag-from-scratch",
    demo: "",
  },
  {
    name: "ai-agent-toolkit",
    description: "Production-ready multi-agent systems with LangGraph — memory, tool use, streaming, and orchestration.",
    tech: ["LangGraph", "LangChain", "Python"],
    image: "/images/projects/agents.png",
    github: "https://github.com/vaibhavbaswal95/ai-agent-toolkit",
    demo: "",
  },
  {
    name: "unet-gan-matting",
    description: "Image matting without a green screen — background removal using UNet architecture combined with GAN training.",
    tech: ["PyTorch", "GANs", "Computer Vision"],
    image: "/images/projects/matting.png",
    github: "https://github.com/vaibhavbaswal95/unet-gan-matting",
    demo: "",
  },
  {
    name: "object_replacement",
    description: "Swap any object in an image using segmentation masks — end-to-end CV pipeline for in-place object replacement.",
    tech: ["PyTorch", "Segmentation", "OpenCV"],
    image: "/images/projects/object-replacement.png",
    github: "https://github.com/vaibhavbaswal95/object_replacement",
    demo: "",
  },
  {
    name: "stable-diffusion-workflows",
    description: "Production-ready SD pipelines — text2img, img2img, ControlNet, and LoRA training with SDXL.",
    tech: ["Diffusers", "PyTorch", "ControlNet"],
    image: "/images/projects/stable-diffusion.png",
    github: "https://github.com/vaibhavbaswal95/stable-diffusion-workflows",
    demo: "",
  },
  {
    name: "vision-language-demos",
    description: "Vision-language model demos — zero-shot classification with CLIP, visual Q&A with LLaVA, document understanding with GPT-4V.",
    tech: ["CLIP", "LLaVA", "GPT-4V", "PyTorch"],
    image: "/images/projects/vlm.png",
    github: "https://github.com/vaibhavbaswal95/vision-language-demos",
    demo: "",
  },
  {
    name: "time-series-transformers",
    description: "Modern time series forecasting with PatchTST, Temporal Fusion Transformer, and Amazon Chronos.",
    tech: ["PyTorch", "PatchTST", "TFT", "Chronos"],
    image: "/images/projects/timeseries.png",
    github: "https://github.com/vaibhavbaswal95/time-series-transformers",
    demo: "",
  },
  {
    name: "structured-outputs-demo",
    description: "Extract typed, reliable structured data from LLMs using Pydantic + Instructor. No more brittle string parsing.",
    tech: ["Pydantic", "Instructor", "OpenAI"],
    image: "/images/projects/structured-outputs.png",
    github: "https://github.com/vaibhavbaswal95/structured-outputs-demo",
    demo: "",
  },
  {
    name: "embeddings-101",
    description: "Embeddings from first principles — semantic search, clustering, anomaly detection, and RAG foundations with visualizations.",
    tech: ["sentence-transformers", "ChromaDB", "UMAP"],
    image: "/images/projects/embeddings.png",
    github: "https://github.com/vaibhavbaswal95/embeddings-101",
    demo: "",
  },
  {
    name: "personal-portfolio",
    description: "This website — built with Next.js, Tailwind CSS, TypeScript, and Framer Motion. Dark mode, 3D background, animations.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/images/projects/portfolio.png",
    github: "https://github.com/vaibhavbaswal95/personal-portfolio",
    demo: "https://vaibhavbaswal95.github.io/personal-portfolio/",
  },
];

export default function ProjectsPage() {
  return (
    <main className="flex flex-col items-center w-full py-12">
      <h1 className="text-4xl font-extrabold text-galaxy-500 mb-10 font-display text-[rgb(165,100,180)] +py-10">Projects</h1>
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full max-w-6xl px-4">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </main>
  );
}
