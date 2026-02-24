import { getPostBySlug, allPosts } from "../../../content/blogs";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-2xl font-bold text-[rgb(165,100,180)] mt-10 mb-4 font-display">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-3 font-display">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line === "---") {
        elements.push(<hr key={i} className="border-white/10 my-8" />);
      } else if (line.trim() === "") {
        // skip blank lines
      } else if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
        elements.push(
          <p key={i} className="text-white/50 italic mt-8 text-sm">
            {line.replace(/^\*|\*$/g, "")}
          </p>
        );
      } else {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        elements.push(
          <p key={i} className="text-white/80 leading-relaxed mt-4">
            {parts.map((part, j) =>
              part.startsWith("**") ? (
                <strong key={j} className="text-white font-semibold">
                  {part.replace(/\*\*/g, "")}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
      i++;
    }
    return elements;
  };

  return (
    <main className="flex flex-col items-center w-full py-16 px-4 text-white">
      <article className="w-full max-w-2xl">
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-[rgb(165,100,180)]/20 text-[rgb(165,100,180)] px-3 py-1 rounded-full font-semibold">
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white font-display leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-white/40 text-sm">{post.date}</p>
        </div>

        <p className="text-lg text-white/60 italic border-l-2 border-[rgb(165,100,180)] pl-4 mb-10 leading-relaxed">
          {post.excerpt}
        </p>

        <div>{renderContent(post.content)}</div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <a href="/personal-portfolio/blogs" className="text-[rgb(165,100,180)] hover:underline font-semibold">
            ← Back to all posts
          </a>
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}
