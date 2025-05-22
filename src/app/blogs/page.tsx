import BlogCard from "../../components/BlogCard";

const blogs = [
  {
    title: "Why Next.js is loved the most.",
    date: "2025-05-01",
    tags: ["Next.js", "Next-gen", "Web Development"],
    excerpt: "Exploring why Next.js is the go-to framework for Next-gen developers...",
    slug: "why-nextjs-is-loved-the-most",
  },
  {
    title: "Top 5 Music Production Tools in 2025",
    date: "2025-05-01",
    tags: ["Music", "Production", "Tools"],
    excerpt: "A rundown of the best music production tools for modern creators...",
    slug: "top-5-music-production-tools-2025",
  },
  {
    title: "How to Build a Personal Brand as a Developer",
    date: "2025-05-01",
    tags: ["Branding", "Career", "Developer"],
    excerpt: "Tips and strategies for building your personal brand in the age of AI...",
    slug: "build-personal-brand-developer",
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