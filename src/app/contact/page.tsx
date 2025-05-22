import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <main className="flex flex-col items-center w-full py-12">
      <h1 className="text-4xl font-extrabold text-galaxy-500 mb-8 font-display text-[rgb(165,100,180)]">Contact with me</h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl px-4">
        <div className="flex-1 flex flex-col gap-6 items-center">
          <div className="glass rounded-lg w-full p-6 flex flex-col gap-4 items-center">
            <a href="/resume.pdf" download className="bg-galaxy-500 hover:bg-galaxy-400 text-white font-bold py-2 px-6 rounded-lg transition mb-2">Download Resume</a>
            <a href="/mediakit.pdf" download className="bg-galaxy-500 hover:bg-galaxy-400 text-white font-bold py-2 px-6 rounded-lg transition">Download MediaKit</a>
          </div>
          <div className="glass rounded-lg w-full p-6 flex flex-col gap-2 items-center">
            <h2 className="text-xl font-bold text-galaxy-400 font-display mb-2 text-white">Connect</h2>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/vaibhavbaswal/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-galaxy-400 text-2xl">in</a>
              <a href="https://github.com/vaibhavbaswal95" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-galaxy-400 text-2xl">GH</a>
              <a href="mailto:vaibhav.baswal95@gmail.com" className="text-white/80 hover:text-galaxy-400 text-2xl">@</a>
              <a href="https://www.instagram.com/vaelar7/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-galaxy-400 text-2xl">IG</a>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <ContactForm />
        </div>
      </div>
    </main>
  );
} 