"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Copy, Check } from "lucide-react"

export default function InteractiveCode() {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [output, setOutput] = useState("")

  const codeExamples = [
    {
      title: "React Component",
      language: "jsx",
      code: `const SkillCard = ({ skill, level }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="skill-card"
    >
      <h3>{skill}</h3>
      <div className="progress-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: \`\${level}%\` }}
          className="progress-fill"
        />
      </div>
    </motion.div>
  );
};`,
      output: "✅ Component rendered successfully!",
    },
    {
      title: "Node.js API",
      language: "javascript",
      code: `const express = require('express');
const app = express();

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('technologies')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
      output: "🚀 Server started on port 3000",
    },
    {
      title: "Database Query",
      language: "javascript",
      code: `// MongoDB aggregation pipeline
const getProjectStats = async () => {
  const stats = await Project.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        technologies: { $addToSet: '$tech' }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
  
  return stats;
};

// Usage
const projectStats = await getProjectStats();
console.log('Project Statistics:', projectStats);`,
      output: "📊 Project statistics calculated successfully",
    },
  ]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExamples[activeTab].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRun = () => {
    setOutput(codeExamples[activeTab].output)
    setTimeout(() => setOutput(""), 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900/80 border border-green-400/30 rounded-lg overflow-hidden backdrop-blur-sm"
    >
      {/* Code Editor Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          <div className="flex gap-1">
            {codeExamples.map((example, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(index)}
                className={`px-3 py-1 text-sm rounded transition-all ${
                  activeTab === index ? "bg-green-400/20 text-green-300" : "text-green-400/70 hover:text-green-300"
                }`}
              >
                {example.title}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRun}
            className="p-2 bg-green-400/20 rounded hover:bg-green-400/30 transition-colors"
          >
            <Play className="w-4 h-4 text-green-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className="p-2 bg-green-400/20 rounded hover:bg-green-400/30 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-green-400" />}
          </motion.button>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <pre className="text-green-400 text-sm overflow-x-auto">
              <code>
                {codeExamples[activeTab].code.split("\n").map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex"
                  >
                    <span className="text-green-600 mr-4 select-none w-8 text-right">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span>{line}</span>
                  </motion.div>
                ))}
              </code>
            </pre>
          </motion.div>
        </AnimatePresence>

        {/* Output Panel */}
        <AnimatePresence>
          {output && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-green-400/30 bg-gray-800/50 px-6 py-4"
            >
              <div className="flex items-center gap-2 text-green-300">
                <span className="text-xs font-bold">OUTPUT:</span>
                <span className="text-sm">{output}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
