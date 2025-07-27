"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Code,
  Database,
  Cpu,
  Network,
  GitBranch,
  Zap,
} from "lucide-react";
import TerminalInterface from "@/components/terminal-interface";
import CodeReveal from "@/components/code-reveal";
import SkillNetwork from "@/components/skill-network";
import ProjectVisualization from "@/components/project-visualization";
import MatrixBackground from "@/components/matrix-background";
import GlitchText from "@/components/glitch-text";
import InteractiveCode from "@/components/interactive-code";
import ParticleSystem from "@/components/particle-system";

export default function AnimatedPortfolio() {
  const [currentSection, setCurrentSection] = useState("terminal");
  const [isLoaded, setIsLoaded] = useState(false);
  const [terminalComplete, setTerminalComplete] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = [
    { id: "terminal", label: "~/init", icon: Terminal },
    { id: "about", label: "~/about", icon: Code },
    { id: "experience", label: "~/work", icon: Cpu },
    { id: "projects", label: "~/projects", icon: Database },
    { id: "skills", label: "~/skills", icon: Network },
    { id: "contact", label: "~/contact", icon: GitBranch },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden relative">
      <MatrixBackground />
      <ParticleSystem />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-green-400/30"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Zap className="w-6 h-6 text-green-400" />
              <GlitchText text="ANIRUDDHA.DEV" className="text-xl font-bold" />
            </motion.div>

            <div className="flex items-center gap-1">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSection(section.id)}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                      currentSection === section.id
                        ? "bg-green-400/20 text-green-300"
                        : "text-green-400/70 hover:text-green-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{section.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {currentSection === "terminal" && (
            <TerminalInterface
              key="terminal"
              onComplete={() => setTerminalComplete(true)}
              onNavigate={setCurrentSection}
            />
          )}

          {currentSection === "about" && (
            <motion.section
              key="about"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="min-h-screen flex items-center justify-center px-4"
            >
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <CodeReveal
                    code={`class Developer {
  constructor() {
    this.name = "Aniruddha Neema";
    this.role = "Full Stack Developer";
    this.location = "Vellore, Tamil Nadu";
    this.education = "VIT - IT (CGPA: 9.39)";
    this.passion = ["Web Development", "Problem Solving"];
  }

  getCurrentWork() {
    return {
      company: "Saurja",
      position: "Full Stack Web Developer",
      achievements: [
        "Led complete website revamp",
        "Developed route optimization for UrjaDesk",
        "Built CMS with Retool",
        "Contributed to Jan Solar Kendra"
      ]
    };
  }

  getPhilosophy() {
    return "Building fast, accessible digital products";
  }
}`}
                  />
                </div>
                <div className="space-y-6">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold"
                  >
                    <GlitchText text="About Me" />
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4 text-green-300"
                  >
                    <p>
                      I'm a passionate Full Stack Web Developer currently
                      working at Saurja, where I lead digital transformations
                      and build scalable solutions.
                    </p>
                    <p>
                      With a strong academic background (CGPA: 9.39) from VIT
                      and hands-on experience in modern web technologies, I
                      specialize in creating high-performance applications that
                      serve thousands of users.
                    </p>
                    <p>
                      My work spans from complete website revamps to complex
                      route optimization systems, always focusing on user
                      experience and technical excellence.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === "experience" && (
            <motion.section
              key="experience"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.6 }}
              className="min-h-screen py-20 px-4"
            >
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-bold text-center mb-16"
                >
                  <GlitchText text="Work Experience" />
                </motion.h2>

                <div className="relative">
                  {/* Timeline line */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute left-8 top-0 w-0.5 bg-green-400"
                  />

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="relative pl-20 pb-12"
                  >
                    <div className="absolute left-6 top-0 w-4 h-4 bg-green-400 rounded-full border-4 border-black" />
                    <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-6 backdrop-blur-sm">
                      <h3 className="text-2xl font-bold text-green-300 mb-2">
                        Full Stack Web Developer
                      </h3>
                      <p className="text-green-400 mb-2">
                        Saurja • Dec 2024 – Present • Remote
                      </p>
                      <ul className="space-y-2 text-green-200">
                        <li>
                          • Led the complete website revamp for Saurja,
                          enhancing digital presence
                        </li>
                        <li>
                          • Developed route optimization for UrjaDesk,
                          streamlining vendor operations
                        </li>
                        <li>
                          • Leveraged Retool to build a basic CMS for the Saurja
                          App
                        </li>
                        <li>
                          • Contributed to Jan Solar Kendra initiative with
                          Lucknow Municipal Corporation
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="relative pl-20"
                  >
                    <div className="absolute left-6 top-0 w-4 h-4 bg-green-400 rounded-full border-4 border-black" />
                    <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-6 backdrop-blur-sm">
                      <h3 className="text-2xl font-bold text-green-300 mb-2">
                        Senior Core Committee Member
                      </h3>
                      <p className="text-green-400 mb-2">
                        IEEE-Computer Society (VIT) • May 2024 – Present
                      </p>
                      <p className="text-green-200">
                        Leading technical initiatives and organizing events for
                        the computer society.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === "projects" && (
            <motion.section
              key="projects"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.8 }}
              className="min-h-screen py-20 px-4"
            >
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-bold text-center mb-16"
                >
                  <GlitchText text="Projects" />
                </motion.h2>
                <ProjectVisualization />
              </div>
            </motion.section>
          )}

          {currentSection === "skills" && (
            <motion.section
              key="skills"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              className="min-h-screen py-20 px-4"
            >
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-bold text-center mb-16"
                >
                  <GlitchText text="Skills Network" />
                </motion.h2>
                <SkillNetwork />
                <div className="mt-16">
                  <InteractiveCode />
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === "contact" && (
            <motion.section
              key="contact"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.6 }}
              className="min-h-screen flex items-center justify-center px-4"
            >
              <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-bold mb-8"
                >
                  <GlitchText text="Initialize Connection" />
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-900/50 border border-green-400/30 rounded-lg p-8 backdrop-blur-sm"
                >
                  <CodeReveal
                    code={`const contact = {
  email: "aniruddhaneema@gmail.com",
  phone: "+91 8770762787",
  linkedin: "linkedin.com/in/aniruddhaneema",
  github: "github.com/Ani1702",
  location: "Vellore, Tamil Nadu, India"
};

// Ready to collaborate on your next project
contact.sendMessage("Let's build something amazing!");`}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 flex justify-center gap-4"
                >
                  <motion.a
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href="mailto:aniruddhaneema@gmail.com"
                    className="px-6 py-3 bg-green-400/20 border border-green-400 rounded-lg hover:bg-green-400/30 transition-all"
                  >
                    Email Me
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://linkedin.com/in/aniruddhaneema"
                    className="px-6 py-3 bg-green-400/20 border border-green-400 rounded-lg hover:bg-green-400/30 transition-all"
                  >
                    LinkedIn
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://github.com/Ani1702"
                    className="px-6 py-3 bg-green-400/20 border border-green-400 rounded-lg hover:bg-green-400/30 transition-all"
                  >
                    GitHub
                  </motion.a>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
