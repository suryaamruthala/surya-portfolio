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
  Download
} from "lucide-react";
import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-gray-50 text-slate-900"}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} isDark={isDark} />
      <Hero isDark={isDark} />
      <About isDark={isDark} />
      <Skills isDark={isDark} />
      <Projects isDark={isDark} />
      <Contact isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}

/* ================= NAVBAR ================= */

function Navbar({ toggleTheme, isDark }) {
  return (
    <nav className={`fixed w-full backdrop-blur-md z-50 border-b transition-colors duration-300 ${isDark ? "bg-black/80 border-white/5" : "bg-white/80 border-black/5"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-2xl bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">Surya</h1>

        <div className="flex items-center gap-8">
          <div className="space-x-8 hidden md:block text-sm font-medium tracking-wide">
            <a href="#about" className={`transition-colors ${isDark ? "hover:text-green-400" : "hover:text-green-600"}`}>About</a>
            <a href="#skills" className={`transition-colors ${isDark ? "hover:text-green-400" : "hover:text-green-600"}`}>Skills</a>
            <a href="#projects" className={`transition-colors ${isDark ? "hover:text-green-400" : "hover:text-green-600"}`}>Projects</a>
            <a href="#contact" className={`transition-colors ${isDark ? "hover:text-green-400" : "hover:text-green-600"}`}>Contact</a>
          </div>

          <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${isDark ? "bg-white/10 hover:bg-white/20 text-yellow-400" : "bg-black/5 hover:bg-black/10 text-slate-700"}`}>
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
      {/* Background decorations */}
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl -z-10 transition-colors duration-700 ${isDark ? "bg-green-500/10" : "bg-green-500/20"}`} />
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl -z-10 transition-colors duration-700 ${isDark ? "bg-emerald-500/10" : "bg-emerald-500/20"}`} />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`font-mono mb-4 text-sm md:text-base tracking-widest ${isDark ? "text-green-400" : "text-green-600"}`}
      >
        Hello, world! I am
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br bg-clip-text text-transparent ${isDark ? "from-white to-gray-400" : "from-slate-900 to-slate-500"}`}
      >
        A. Surya
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className={`mt-6 text-xl md:text-3xl font-light ${isDark ? "text-gray-400" : "text-slate-600"}`}
      >
        Building intelligent, scalable, and secure systems.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className={`mt-6 text-base max-w-2xl leading-relaxed ${isDark ? "text-gray-500" : "text-slate-500"}`}
      >
        AI & ML Enthusiast | Full Stack Developer
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="flex gap-8 mt-12"
      >
        <a href="https://github.com/suryaamruthala" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 ${isDark ? "bg-white/5 hover:bg-green-500 hover:text-black" : "bg-black/5 hover:bg-green-500 hover:text-white"}`}>
          <Github className="w-6 h-6" />
        </a>
        <a href="https://www.linkedin.com/in/surya-a-650a7422b" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 ${isDark ? "bg-white/5 hover:bg-green-500 hover:text-black" : "bg-black/5 hover:bg-green-500 hover:text-white"}`}>
          <Linkedin className="w-6 h-6" />
        </a>
        <a href="mailto:8522824487" className={`p-3 rounded-full transition-all duration-300 ${isDark ? "bg-white/5 hover:bg-green-500 hover:text-black" : "bg-black/5 hover:bg-green-500 hover:text-white"}`}>
          <Mail className="w-6 h-6" />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="mt-8"
      >
        <a
          href="/resume.pdf"
          download
          className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-all duration-300 border ${isDark ? "border-green-500 text-green-400 hover:bg-green-500 hover:text-black" : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"}`}
        >
          <Download className="w-5 h-5" />
          Download Resume
        </a>
      </motion.div>
    </section>
  );
}

/* ================= ABOUT ================= */

function About({ isDark }) {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>About Me</h2>
          <div className={`h-[1px] flex-1 ml-4 ${isDark ? "bg-gray-800" : "bg-slate-200"}`} />
        </div>

        <div className={`leading-relaxed space-y-6 text-lg ${isDark ? "text-gray-400" : "text-slate-600"}`}>
          <p>
            I am a B.Tech student in Artificial Intelligence and Machine Learning
            at S.V. College of Engineering (2024–2027). I specialize in building
            intelligent systems, full-stack applications, and AI-driven platforms.
          </p>
          <p>
            My current focus involves working on advanced AI projects and scalable software solutions. I am deeply interested in the intersection of artificial intelligence and efficient software engineering.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

/* ================= SKILLS ================= */

function Skills({ isDark }) {
  const skills = [
    { name: "Full Stack Development", icon: <Code className="w-8 h-8" />, desc: "React, Node.js, PHP, Vite" },
    { name: "Programming Languages", icon: <Cpu className="w-8 h-8" />, desc: "C, Java, Python" },
    { name: "Database Engineering", icon: <Database className="w-8 h-8" />, desc: "MySQL, PostgreSQL, MongoDB" }
  ];

  return (
    <section id="skills" className={`py-24 px-6 border-y transition-colors duration-300 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-slate-200"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16 justify-center">
          <div className={`h-[1px] flex-1 hidden md:block mr-4 ${isDark ? "bg-gray-800" : "bg-slate-200"}`} />
          <h2 className="text-3xl md:text-4xl font-bold">Technical Focus</h2>
          <div className={`h-[1px] flex-1 hidden md:block ml-4 ${isDark ? "bg-gray-800" : "bg-slate-200"}`} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              key={i}
              className={`p-8 rounded-2xl group transition-colors border ${isDark ? "glass-panel hover:border-green-500/50" : "bg-slate-50 border-slate-200 hover:border-green-500 shadow-sm"}`}
            >
              <div className={`mb-6 w-16 h-16 rounded-xl flex items-center justify-center transition-all ${isDark ? "text-green-400 bg-green-500/10 group-hover:bg-green-500 group-hover:text-black" : "text-green-600 bg-green-500/20 group-hover:bg-green-500 group-hover:text-white"}`}>
                {skill.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>{skill.name}</h3>
              <p className={`text-sm ${isDark ? "text-gray-500" : "text-slate-500"}`}>{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= PROJECTS ================= */

function Projects({ isDark }) {
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
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
        <div className={`h-[1px] flex-1 ml-4 ${isDark ? "bg-gray-800" : "bg-slate-200"}`} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            key={i}
            className={`group flex flex-col h-full border rounded-2xl overflow-hidden transition-colors ${isDark ? "glow-card bg-zinc-950 border-zinc-800 hover:border-zinc-700" : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg"}`}
          >
            <div className="p-8 flex-1 flex flex-col">
              <h3 className={`text-2xl font-bold mb-4 transition-colors ${isDark ? "group-hover:text-green-400 text-white" : "group-hover:text-green-600 text-slate-900"}`}>
                {project.title}
              </h3>
              <p className={`leading-relaxed mb-8 flex-1 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className={`text-xs font-mono px-3 py-1 rounded-full ${isDark ? "text-green-400 bg-green-400/10" : "text-green-700 bg-green-100"}`}>
                    {tag}
                  </span>
                ))}
              </div>

              <a href={project.link} className={`inline-flex items-center text-sm font-semibold transition-colors ${isDark ? "hover:text-green-400 text-white" : "hover:text-green-600 text-slate-900"}`}>
                View Details <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */

function Contact({ isDark }) {
  return (
    <section id="contact" className={`py-32 px-6 border-t text-center relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-slate-200"}`}>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 rounded-full blur-3xl -z-10 transition-colors duration-700 ${isDark ? "bg-green-500/5" : "bg-green-500/10"}`} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>Let's Work Together</h2>
        <p className={`mb-10 max-w-xl mx-auto text-lg ${isDark ? "text-gray-400" : "text-slate-600"}`}>
          I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <a
          href="mailto:suryaamruthala@gmail.com"
          className={`inline-block font-bold px-10 py-4 rounded-xl transition-transform hover:scale-105 ${isDark ? "bg-green-500 hover:bg-green-400 text-black" : "bg-green-600 hover:bg-green-500 text-white"}`}
        >
          Say Hello
        </a>
      </motion.div>
    </section>
  );
}

/* ================= FOOTER ================= */

function Footer({ isDark }) {
  return (
    <footer className={`py-8 text-center border-t transition-colors duration-300 ${isDark ? "bg-black border-zinc-900" : "bg-slate-50 border-slate-200"}`}>
      <div className="flex justify-center gap-6 mb-4">
        <a href="https://github.com/suryaamruthala" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? "text-gray-500 hover:text-white" : "text-slate-400 hover:text-slate-900"}`}>
          <Github className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/surya-a-650a7422b" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? "text-gray-500 hover:text-white" : "text-slate-400 hover:text-slate-900"}`}>
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
      <p className={`text-sm font-mono ${isDark ? "text-gray-600" : "text-slate-500"}`}>
        Designed & Built by A. Surya © {new Date().getFullYear()}
      </p>
    </footer>
  );
}