"use client";
import React, { useState, useEffect } from "react";

export default function HeroSection() {
  const [hovered, setHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] w-full">
      
      <div className="max-w-5xl w-full text-center py-20 px-8 mb-12 shadow-2xl z-10 bg-black/30 rounded-2xl border border-white/10 mt-12">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-neon font-display mb-2">
          hey, I'm{" "}
          <span
            className="relative inline-block w-[8ch] h-[1em] overflow-hidden align-middle cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ transition: "color 0.3s" }}
          >
            <span
              className={`absolute left-0 top-0 w-full transition-transform duration-400 ${
                hovered ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
              } text-[rgb(165,100,180)]`}
            >
              VAIBHAV
            </span>
            <span
              className={`absolute left-0 top-0 w-full transition-transform duration-400 ${
                hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              } text-[rgb(165,100,180)] font-bold`}
            >
              VÆLAR
            </span>
          </span>{" "}
          <span className="align-middle">
            {isMounted ? (
              <img 
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f47e/512.gif" 
                alt="Space Invader" 
                className="inline-block w-20 h-20 align-middle"
              />
            ) : (
              <span className="inline-block w-20 h-20 align-middle">👾</span>
            )}
          </span>
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto">
          Data Scientist, AI/ML Engineer, DJ & Music Producer
        </p>
        <div className="flex flex-wrap justify-center gap-5 mt-12">
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/vaibhavbaswal/" 
            className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#0077B5]/70 hover:scale-110 transition-all duration-300"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 00.1.4V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </a>
          
          {/* GitHub */}
          <a 
            href="https://github.com/vaibhavbaswal95" 
            className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all duration-300"
            aria-label="GitHub"
            title="GitHub"

          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/vaelar7/" 
            className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]/70 hover:scale-110 transition-all duration-300"
            aria-label="Instagram"
            title="Instagram"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.218-1.79.465-2.428.254-.66.598-1.216 1.153-1.772.5-.509 1.105-.902 1.772-1.153.637-.247 1.363-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.977.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.88-.344 1.857-.047 1.053-.059 1.37-.059 4.04 0 2.67.01 2.987.059 4.04.045.977.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.88.3 1.857.344 1.053.047 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.977-.045 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.88.344-1.857.047-1.053.059-1.37.059-4.04 0-2.67-.01-2.987-.059-4.04-.045-.977-.207-1.504-.344-1.857-.182-.467-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.88-.3-1.857-.344-1.053-.047-1.37-.059-4.04-.059zm0 3.064A5.139 5.139 0 0117.134 12 5.139 5.139 0 0112 17.134 5.139 5.139 0 016.866 12 5.139 5.139 0 0112 6.866zm0 8.468A3.334 3.334 0 018.666 12 3.334 3.334 0 0112 8.666 3.334 3.334 0 0115.334 12 3.334 3.334 0 0112 15.334zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/>
            </svg>
          </a>
          
          {/* X (Twitter) */}
          <a 
            href="https://x.com/vaibhavbaswal95" 
            className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all duration-300"
            aria-label="X (Twitter)"
            title="X (Twitter)"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/>
            </svg>
          </a>
          
          {/* YouTube */}
          <a 
            href="https://www.youtube.com/@lowbudgetnasties/videos" 
            className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#FF0000]/70 hover:scale-110 transition-all duration-300"
            aria-label="YouTube"
            title="YouTube"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          
          {/* Mixcloud */}
          <a 
            href="https://www.mixcloud.com/vaelarmusic/" 
            className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#5000ff]/70 hover:scale-110 transition-all duration-300"
            aria-label="Mixcloud"
            title="Mixcloud"
          >
            <img src="images/mixcloud.svg" className="w-6 h-6"></img>
            {/* <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.839 15.172v-6.343c0-.819-.666-1.484-1.484-1.484h-.01c-.819 0-1.484.666-1.484 1.484v6.343c0 .819.666 1.484 1.484 1.484h.01c.819 0 1.484-.666 1.484-1.484zm-3.97-6.343c0-.819-.666-1.484-1.484-1.484h-.01c-.819 0-1.484.666-1.484 1.484v6.343c0 .819.666 1.484 1.484 1.484h.01c.819 0 1.484-.666 1.484-1.484v-6.343zm-3.97 0c0-.819-.666-1.484-1.484-1.484h-.01c-.819 0-1.484.666-1.484 1.484v6.343c0 .819.666 1.484 1.484 1.484h.01c.819 0 1.484-.666 1.484-1.484v-6.343zm-3.97 0c0-.819-.666-1.484-1.484-1.484h-.01c-.819 0-1.484.666-1.484 1.484v6.343c0 .819.666 1.484 1.484 1.484h.01c.819 0 1.484-.666 1.484-1.484v-6.343zm-3.97 0c0-.819-.666-1.484-1.484-1.484h-.01c-.819 0-1.484.666-1.484 1.484v6.343c0 .819.666 1.484 1.484 1.484h.01c.819 0 1.484-.666 1.484-1.484v-6.343z"/>
            </svg> */}
          </a>
          
          {/* Soundcloud */}
          <a 
            href="https://soundcloud.com/vaelarmusicofficial" 
            className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#ff7700]/70 hover:scale-110 transition-all duration-300"
            aria-label="Soundcloud"
            title="Soundcloud"
          >
            <img src="images/soundcloud.svg" className="w-6 h-6"></img>
            {/* <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.055-.045-.1-.09-.1-.1m-.899.828c-.05 0-.091.037-.1.087l-.17 1.34.17 1.337c.009.05.05.086.1.086.047 0 .089-.037.099-.086l.193-1.337-.193-1.34c-.01-.05-.052-.087-.1-.087m1.81-1.578c-.061 0-.112.047-.12.111l-.21 2.563.209 2.469c.008.06.059.111.12.111.06 0 .11-.046.119-.111l.237-2.469-.237-2.563c-.009-.062-.058-.111-.12-.111m1.81-1.578c-.061 0-.112.047-.12.111l-.21 2.563.209 2.469c.008.06.059.111.12.111.06 0 .11-.046.119-.111l.237-2.469-.237-2.563c-.009-.062-.058-.111-.12-.111m.91-.515c-.072 0-.133.058-.14.13l-.189 3.049.188 2.968c.008.072.068.13.14.13.07 0 .13-.058.14-.13l.213-2.968-.213-3.049c-.01-.072-.07-.13-.14-.13m.91-.497c-.082 0-.152.069-.16.148l-.169 3.398.17 3.291c.007.08.077.148.159.148.077 0 .144-.068.15-.148l.19-3.291-.19-3.398c-.008-.08-.073-.148-.15-.148m.996-.041c-.09 0-.168.079-.177.167l-.148 3.42.148 3.304c.008.087.086.166.177.166.086 0 .162-.079.17-.166l.167-3.304-.169-3.42c-.008-.088-.082-.167-.168-.167m1.044-.062c-.102 0-.19.088-.2.188l-.127 3.461.127 3.318c.01.1.098.188.2.188.096 0 .181-.087.19-.188l.143-3.318-.143-3.461c-.008-.1-.094-.188-.19-.188m1.125-.009c-.114 0-.211.098-.221.213l-.108 3.445.108 3.345c.01.115.107.213.221.213.106 0 .2-.098.209-.213l.119-3.345-.119-3.445c-.01-.115-.103-.213-.209-.213m1.071.12c-.12 0-.223.104-.231.224l-.087 3.314.087 3.34c.008.119.111.224.231.224.119 0 .221-.104.232-.224l.097-3.34-.097-3.314c-.01-.119-.113-.224-.232-.224m1.104-.089c-.13 0-.243.114-.252.244l-.067 3.383.067 3.355c.009.13.122.244.252.244.126 0 .235-.114.244-.244l.074-3.355-.074-3.383c-.01-.13-.118-.244-.244-.244m2.26-.312c-.15 0-.28.136-.29.287L11 11.702l.066 3.392c.01.15.14.287.29.287.148 0 .277-.136.288-.287l.073-3.392-.073-3.715c-.01-.15-.14-.287-.288-.287m1.067-.041c-.16 0-.297.146-.307.306l-.056 3.437.056 3.399c.01.16.147.306.307.306.158 0 .294-.146.303-.306l.063-3.399-.063-3.437c-.01-.16-.145-.306-.303-.306m1.026-.033c-.17 0-.317.156-.325.329l-.046 3.447.046 3.407c.008.172.155.328.325.328.167 0 .313-.156.323-.328l.05-3.407-.05-3.447c-.01-.173-.156-.329-.323-.329m1.096-.01c-.178 0-.332.168-.342.348l-.036 3.438.036 3.399c.01.18.164.348.342.348.18 0 .335-.168.344-.348l.04-3.399-.04-3.438c-.009-.18-.164-.348-.344-.348m1.08 7.177c.01.183.174.355.355.355.18 0 .338-.172.346-.355V9.744c0-.183-.166-.355-.346-.355-.181 0-.345.172-.356.355v7.177m.715-7.177c0-.194.18-.353.354-.353.197 0 .36.159.36.353v7.177c0 .194-.163.353-.36.353-.174 0-.354-.159-.354-.353V9.744m.792 0c0-.207.193-.354.364-.354.204 0 .371.147.371.354v7.177c0 .207-.167.354-.371.354-.171 0-.364-.147-.364-.354V9.744m.793 0c0-.216.195-.375.388-.375.207 0 .377.159.377.375v7.177c0 .216-.17.375-.377.375-.193 0-.388-.159-.388-.375V9.744m.826 0c0-.228.21-.396.402-.396.22 0 .396.168.396.396v7.177c0 .228-.176.396-.396.396-.192 0-.402-.168-.402-.396V9.744m1.725-2.57v9.746c0 .322-.27.585-.585.585H7.585c-.322 0-.584-.263-.584-.585V7.174c0-.323.262-.586.584-.586h.542c.013-.005.155-.072.155-.072.371-.179.786-.29 1.197-.29.413 0 .828.111 1.199.29l.156.072h7.721c.322 0 .584.263.584.586z"/>
            </svg> */}
          </a>
        </div>
      </div>
      <div className="py-20 animate-bounce mt-6 text-white/70 z-10 text-lg">↓ Scroll Down</div>
    </section>
  );
} 