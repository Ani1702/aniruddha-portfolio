"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TerminalInterfaceProps {
  onComplete: () => void;
  onNavigate: (section: string) => void;
}

export default function TerminalInterface({
  onComplete,
  onNavigate,
}: TerminalInterfaceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const terminalSequence = [
    "Initializing portfolio system...",
    "Loading developer profile...",
    "Connecting to GitHub repositories...",
    "Fetching project data...",
    "Compiling skills matrix...",
    "System ready!",
    "",
    "Welcome to Aniruddha Neema's Portfolio Terminal",
    "Type 'help' for available commands",
    "",
  ];

  const commands = {
    help: [
      "Available commands:",
      "  about     - View developer information",
      "  work      - Show work experience",
      "  projects  - Display project portfolio",
      "  skills    - Show technical skills",
      "  contact   - Get contact information",
      "  clear     - Clear terminal",
      "",
    ],
    about: ["Navigating to about section..."],
    work: ["Loading work experience..."],
    projects: ["Initializing project viewer..."],
    skills: ["Rendering skills network..."],
    contact: ["Opening contact interface..."],
    clear: [""],
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const typeSequence = async () => {
      for (let i = 0; i < terminalSequence.length; i++) {
        await new Promise<void>((resolve) => {
          timeoutId = setTimeout(() => {
            setLines((prev) => [...prev, terminalSequence[i]]);
            resolve();
          }, 500);
        });
      }
      onComplete();
    };

    typeSequence();

    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when lines change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (commands[cmd as keyof typeof commands]) {
      setLines((prev) => [
        ...prev,
        `$ ${command}`,
        ...commands[cmd as keyof typeof commands],
      ]);

      if (["about", "work", "projects", "skills", "contact"].includes(cmd)) {
        setTimeout(() => {
          onNavigate(cmd === "work" ? "experience" : cmd);
        }, 1000);
      }
    } else {
      setLines((prev) => [
        ...prev,
        `$ ${command}`,
        `Command not found: ${command}`,
        "Type 'help' for available commands",
        "",
      ]);
    }

    // Focus back on input after command
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(currentLine);
      setCurrentLine("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen bg-black p-4 font-mono"
    >
      <div className="max-w-4xl mx-auto h-[70vh] flex flex-col">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 border border-green-400/30 rounded-lg overflow-hidden flex flex-col h-full"
        >
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-green-400 ml-4">aniruddha@portfolio:~$</span>
          </div>

          {/* Terminal Content - Now takes up remaining space */}
          <div
            ref={terminalRef}
            className="p-4 flex-1 overflow-y-hidden"
            style={{ minHeight: "300px" }}
          >
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-green-400 mb-1"
              >
                {line}
              </motion.div>
            ))}

            <div className="flex items-center text-green-400">
              <span className="mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentLine}
                onChange={(e) => setCurrentLine(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent outline-none flex-1 text-green-400"
                autoFocus
              />
              <span
                className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}
              >
                █
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
