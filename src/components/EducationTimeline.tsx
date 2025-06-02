"use client";
import React, { useState, useEffect } from "react";

const education = [
  { year: "2024 - now", title: "Sr. Data Scientist", org: "Cars24", icon: "🧑‍💻" },
  { year: "2022-2023", title: "Lead Machine Learning Engineer", org: "Fashinza", icon: "🧑‍💻" },
  { year: "2021-2022", title: "Machine Learning Engineer - II", org: "Cars24", icon: "🧑‍💻" },
  { year: "2020-2021", title: "Founding ML Engineer", org: "Computer Vision Research", icon: "🧑‍💻" },
  { year: "2018-2020", title: "Data Science Consultant", org: "EXL", icon: "🏢" },
  { year: "2017-2018", title: "Data Science Consultant", org: "Capgemini", icon: "🏢" },
  { year: "2013-2017", title: "B.Tech, Civil Engineering", org: "IIT Kanpur", icon: "🎓" }
];

export default function EducationTimeline() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="w-full flex flex-col items-center py-16 px-4 min-h-screen">
      <div className="glass max-w-3xl w-full px-8 py-12 rounded-2xl">
        <h2 className="text-4xl font-bold mb-10 text-center text-[rgb(165,100,180)] font-display">
          Experiences
        </h2>

        <div className="relative ml-10">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 from-galaxy-500 to-galaxy-900"></div>

          <div className="space-y-7 ">
            {education.map((item, idx) => (
              <div key={idx} className="font-medium mt-1 relative pl-14 group">
                {/* Timeline dot */}

                <div className=" p-0.5 rounded-lg hover:border-white/20 transition-all duration-100 hover:bg-white/10 hover:shadow-lg">

                  <div className="absolute -left-5 top-11 text-white/70 text-sm hover:scale-105 transition-all duration-100">
                    {item.year}
                  </div>

                  <div className="absolute left-20 top-12 w-2.5 h-2.5 rounded-full bg-purple-500 transform -translate-x-1/2 hover:scale-105 transition-all duration-100"></div>

                  <h3 className="px-15 text-xl font-semibold text-white font-display group-hover:text-galaxy-400 transition hover:scale-105 transition-all duration-100">
                    {item.title}
                  </h3>

                  <p className="px-15 text-white/70 font-medium mt-1 hover:scale-105 transition-all duration-100">
                    {item.org}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 