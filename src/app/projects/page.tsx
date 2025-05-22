import ProjectCard from "../../components/ProjectCard";

const projects = [
  {
    name: "EventEase",
    description: "Event management app for large scale events.",
    tech: ["React", "Node.js", "MongoDB"],
    image: "/images/projects/eventease.png",
    github: "https://github.com/aryan/eventease",
    demo: "",
  },
  {
    name: "Voice Typing Assistant",
    description: "AI-powered voice-to-text tool for typing on the go.",
    tech: ["Python", "Next.js"],
    image: "/images/projects/voice-typing.png",
    github: "https://github.com/aryan/eventease",
    demo: "",
  },
  {
    name: "Personal Portfolio",
    description: "This website! Modern Style, Next.js, HeroUI, Tailwind.",
    tech: ["Next.js", "HeroUI", "Tailwind CSS"],
    image: "/images/projects/portfolio.png",
    github: "https://github.com/aryan/eventease",
    demo: "",
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