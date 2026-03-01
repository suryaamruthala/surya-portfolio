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
import profile from "./assets/profile/surya.jpeg";
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
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-black text-white" : "bg-gray-50 text-slate-900"}`}>
      
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
    </div>
  );
}

/* ================= NAVBAR ================= */

function Navbar({ toggleTheme, isDark }) {
  return (
    <nav className={`fixed w-full backdrop-blur-xl z-50 border-b ${isDark ? "bg-black/60 border-white/10" : "bg-white/70 border-transparent shadow-sm"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-2xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Surya Amruthala
        </h1>
        <div className="flex items-center gap-8">
          <div className="space-x-8 hidden md:block text-sm font-medium tracking-wide">
            <a href="#about" className={`transition-colors ${isDark ? "hover:text-green-400" : "hover:text-green-600"}`}>About</a>
            <a href="#skills" className={`transition-colors ${isDark ? "hover:text-green-400" : "hover:text-green-600"}`}>Skills</a>
            <a href="#projects" className={`transition-colors ${isDark ? "hover:text-green-400" : "hover:text-green-600"}`}>Projects</a>
            <a href="#contact" className={`transition-colors ${isDark ? "hover:text-green-400" : "hover:text-green-600"}`}>Contact</a>
          </div>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${isDark ? "bg-white/10 hover:bg-white/20 text-yellow-400" : "bg-black/5 hover:bg-black/10"}`}
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
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      
      <div className="absolute w-96 h-96 bg-green-500/10 blur-3xl rounded-full top-1/4 left-1/4 animate-pulse -z-10" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* TEXT */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          
          <p className="font-mono text-green-400 mb-4">
            Hello, world! I am
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-gradient-text tracking-wide whitespace-nowrap overflow-visible">
            Surya Amruthala
          </h1>

          <h2 className="text-xl md:text-2xl text-gray-400 mb-6">
            AI & ML Enthusiast | Full Stack Developer
          </h2>

          <div className="flex gap-6 mt-6">
            <a href="https://github.com/suryaamruthala" target="_blank" rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-green-500 hover:text-black transition">
              <Github />
            </a>
            <a href="https://www.linkedin.com/in/surya-a-650a7422b" target="_blank" rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-green-500 hover:text-black transition">
              <Linkedin />
            </a>
            <a href="mailto:suryaamruthala@gmail.com"
              className="p-3 rounded-full bg-white/5 hover:bg-green-500 hover:text-black transition">
              <Mail />
            </a>
          </div>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 border border-green-500 text-green-400 rounded-full hover:bg-green-500 hover:text-black transition"
          >
            <Download size={18} />
            Download Resume
          </a>
        </motion.div>

       {/* IMAGE */}
<motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="flex justify-center"
>
  <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">

    {/* Pulsing Thick Green Ring */}
<div className="absolute w-full h-full rounded-full animate-ringThickness" />

    {/* Static Profile Image */}
    <div className="w-[92%] h-[92%] rounded-full overflow-hidden bg-black">
      <img
        src={profile}
        alt="Surya"
        className="w-full h-full object-cover rounded-full"
      />
    </div>

  </div>
</motion.div>
      </div>
    </section>
  );
}

/* ================= ABOUT ================= */

function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-8">About Me</h2>
      <p className="text-lg text-gray-400 leading-relaxed">
        B.Tech AI & ML student passionate about building scalable intelligent systems
        and high-performance full-stack applications.
      </p>
    </section>
  );
}

/* ================= SKILLS ================= */

function Skills({ isDark }) {
  const skills = [
    { name: "Full Stack Development", icon: <Code />, desc: "React, Node.js, PHP" },
    { name: "Programming", icon: <Cpu />, desc: "C, Java, Python" },
    { name: "Databases", icon: <Database />, desc: "MySQL,mongoDB,postgresql" },
  ];
  return (
    <section id="skills" className={`py-24 px-6 ${isDark ? "bg-zinc-950 text-white" : "bg-gray-50 text-slate-900"}`}>
      <h2 className="text-4xl font-bold text-center mb-16">Technical Focus</h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {skills.map((skill, i) => (
          <motion.div key={i} whileHover={{ y: -6 }}
            className={`p-8 rounded-2xl transition-all ${isDark ? "border border-zinc-800 hover:border-green-500 hover:border-2" : "bg-white shadow hover:shadow-lg"}`}>
            <div className="mb-4 text-green-400">{skill.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>{skill.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ================= PROJECTS ================= */

function Projects({ isDark, loading }) {
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
      <h2 className="text-4xl font-bold text-center mb-16">Featured Projects</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }}
            className={`p-8 rounded-2xl transition-all ${isDark ? "border border-zinc-800 hover:border-green-500 hover:border-2" : "bg-white shadow hover:shadow-lg"}`}>
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <p className={`${isDark ? "text-gray-400" : "text-gray-700"} mb-6`}>{project.desc}</p>
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 bg-green-400/10 text-green-400 rounded-full">
                  {tag}
                </span>
              ))}
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
    <section
      id="contact"
      className={`py-32 text-center ${
        isDark ? "bg-zinc-950 text-white" : "bg-gray-50 text-slate-900"
      }`}
    >
      <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>

      <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=suryaamruthala@gmail.com&su=i%20want%20to%20work%20with%20you&body=Hi%20Surya%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect.%0A%0ARegards%2C%20"
  target="_blank"
  rel="noopener noreferrer"
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