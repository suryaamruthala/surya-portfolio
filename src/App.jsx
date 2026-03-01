import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Database,
  Cpu,
  ExternalLink,
  Sun,
  Moon,
  Download,
} from "lucide-react";
import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    setTheme(savedTheme);

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      setScroll((scrollPosition / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-slate-900"
      }`}
    >
      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-1 bg-green-500 z-50 transition-all duration-150"
        style={{ width: `${scroll}%` }}
      />

      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      <Hero isDark={isDark} />
      <About isDark={isDark} />
      <Skills isDark={isDark} />
      <Projects isDark={isDark} />
      <Contact isDark={isDark} />
      <Footer isDark={isDark} />
    </motion.div>
  );
}

/* ================= NAVBAR ================= */

function Navbar({ toggleTheme, isDark }) {
  return (
    <nav
      className={`fixed w-full z-50 backdrop-blur-xl border-b ${
        isDark
          ? "bg-black/60 border-white/10"
          : "bg-white/70 border-black/10"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-2xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Surya
        </h1>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {["about", "skills", "projects", "contact"].map((item) => (
              <a key={item} href={`#${item}`} className="relative group">
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDark
                ? "bg-white/10 hover:bg-white/20 text-yellow-400"
                : "bg-black/5 hover:bg-black/10"
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ================= HERO ================= */

function Hero({ isDark }) {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-green-500/10 blur-3xl rounded-full top-1/3 left-1/3 animate-pulse -z-10" />

      <p className="font-mono mb-4 text-green-500 tracking-widest">
        Hello, world! I am
      </p>

      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-[length:200%_200%] animate-gradient bg-clip-text text-transparent">
        A. Surya
      </h1>

      <h2 className="mt-6 text-xl md:text-3xl font-light text-gray-400">
        Building intelligent, scalable, and secure systems.
      </h2>

      <p className="mt-6 text-base max-w-2xl text-gray-500">
        AI & ML Enthusiast | Full Stack Developer
      </p>

      <div className="flex gap-8 mt-12">
        <a
          href="https://github.com/suryaamruthala"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-white/5 hover:bg-green-500 hover:text-black transition"
        >
          <Github />
        </a>
        <a
          href="https://www.linkedin.com/in/surya-a-650a7422b"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-white/5 hover:bg-green-500 hover:text-black transition"
        >
          <Linkedin />
        </a>
      </div>
    </section>
  );
}

/* ================= ABOUT ================= */

function About({ isDark }) {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-8">About Me</h2>
      <p className="text-lg text-gray-400 leading-relaxed">
        I am a B.Tech student in Artificial Intelligence and Machine Learning
        at S.V. College of Engineering (2024–2027). I build AI-powered systems
        and scalable full-stack applications.
      </p>
    </section>
  );
}

/* ================= SKILLS ================= */

function Skills() {
  const skills = [
    { name: "Full Stack", icon: <Code />, desc: "React, Node.js, PHP" },
    { name: "Programming", icon: <Cpu />, desc: "C, Java, Python" },
    { name: "Databases", icon: <Database />, desc: "MySQL, MongoDB" },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-zinc-950">
      <h2 className="text-4xl font-bold text-center mb-16">
        Technical Focus
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {skills.map((skill, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl border border-zinc-800 hover:border-green-500 transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
          >
            <div className="mb-4 text-green-400">{skill.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
            <p className="text-gray-400">{skill.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= PROJECTS ================= */

function Projects() {
  const projects = [
    {
      title: "Wedding Photo Studio Management",
      desc: "Express + React based studio management system to handle appointments, client records, and photo galleries.",
      tags: ["React", "Node.js", "Express", "Vite"],
      link: "#",
    },
    {
      title: "E-commerce Marketplace",
      desc: "Scalable online marketplace with integrated partner logistics for efficient tracking, order management, and delivery coordination.",
      tags: ["React", "Node.js", "MongoDB", "Vite"],
      link: "#",
    },
    {
      title: "Digital Library System",
      desc: "A comprehensive digital library management system designed to track inventory, manage borrowing, and streamline administrative tasks for academic institutions.",
      tags: ["Python", "Database", "Management"],
      link: "#",
    },
    {
      title: "Hospital Management System",
      desc: "Full-stack PHP & MySQL system to manage patient records, appointments, billing, and hospital administration workflows.",
      tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
      link: "#",
    },
  ];

  return (
    <section id="projects" className="py-32 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-16">Featured Projects</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl border border-zinc-800 hover:border-green-500 transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
          >
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <p className="text-gray-400 mb-6">{project.desc}</p>
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-green-400/10 text-green-400 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */

function Contact() {
  return (
    <section id="contact" className="py-32 text-center bg-zinc-950">
      <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
      <a
        href="mailto:suryaamruthala@gmail.com"
        className="inline-block px-10 py-4 bg-green-500 text-black rounded-xl hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition"
      >
        Say Hello
      </a>
    </section>
  );
}

/* ================= FOOTER ================= */

function Footer() {
  return (
    <footer className="py-8 text-center bg-black border-t border-zinc-900">
      <p className="text-sm text-gray-600">
        Designed & Built by A. Surya © {new Date().getFullYear()}
      </p>
    </footer>
  );
}