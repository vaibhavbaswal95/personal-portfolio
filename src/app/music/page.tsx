export default function MusicPage() {
  return (
    <main className="flex flex-col items-center w-full py-12">
      <h1 className="text-4xl font-extrabold text-galaxy-500 mb-8 font-display text-[rgb(165,100,180)] +py-10">Music</h1>
      <div className="glass max-w-2xl w-full px-6 py-8 mb-8 text-center rounded-2xl">
        <h2 className="text-2xl font-bold text-white font-display mb-2">I produce electronic music as VÆLAR</h2>
        <p className="text-white/80">Check out my mixtapes, productions, and YouTube videos below!</p>
      </div>
      <div className="glass max-w-2xl w-full px-6 py-8 mb-8 rounded-2xl">
        <h3 className="text-xl font-bold text-galaxy-400 mb-2 font-display text-white text-center">Mixtape / Playlist</h3>
        <div className="w-full h-full flex justify-center">
          <div className="w-full h-full rounded-lg flex items-center justify-center text-white/60">
          <div className="w-full h-full">  
          <iframe
            width="100%"
            src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fvaelarmusic%2F"
            style={{ border: "none" }}
            allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share"></iframe>

          <iframe width="100%"
           height="130" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1357180459&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

          </div>
          </div>
        </div>
        <div className="h-full w-full"> </div>
      </div>
      <div className="glass max-w-3xl w-full px-6 py-8 mb-8 rounded-2xl">
        <h3 className="text-xl font-bold text-galaxy-400 mb-2 font-display text-center text-white">Production Tracks</h3>
        <div className="w-full flex flex-wrap gap-4 justify-center">
          {/* Carousel or grid of audio/video clips */}
          <div className="w-full h-full bg-white/10 rounded-lg items-center justify-center text-white/60">
          <iframe width="100%" height="400" src="https://player-widget.mixcloud.com/widget/iframe/?light=1&feed=%2Fvaelarmusic%2Fmelodic-techno-id-un-mastered%2F"  allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share"></iframe>
          </div>
          <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center text-white/60">
          <iframe width="100%" height="400" src="https://player-widget.mixcloud.com/widget/iframe/?light=1&feed=%2Fvaelarmusic%2Fafrohouse-id-un-mastered%2F" allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share"></iframe>
          </div>
        </div>
      </div>
      <div className="glass max-w-2xl w-full px-6 py-8 rounded-2xl">
        <h3 className="text-xl font-bold text-galaxy-400 mb-2 font-display text-center text-white">YouTube Links</h3>
        <div className="w-full flex flex-wrap gap-4 justify-center">
          {/* Embed YouTube videos here */}
          <div className="h-full bg-white/10 rounded-lg flex items-center justify-center text-white/60">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/H7kl9EGkzbg?si=f1ToXff1Euby7aX0" 
              title="YouTube video player"  
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="h-full bg-white/10 rounded-lg flex items-center justify-center text-white/60">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/Firn3bSlPeY?si=i-1zVVOtHxKqenEY" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
} 