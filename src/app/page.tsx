import HeroSection from "../components/HeroSection";
import EducationTimeline from "../components/EducationTimeline";
import ToolsGrid from "../components/ToolsGrid";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      <HeroSection />
      <div className="w-full max-w-6xl mx-auto">
        <EducationTimeline />
      </div>
      <div className="w-full max-w-6xl mx-auto pt-10">
        <ToolsGrid />
      </div>
    </main>
  );
}
