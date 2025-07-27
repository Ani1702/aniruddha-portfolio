"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CodeRevealProps {
  code: string
  delay?: number
}

export default function CodeReveal({ code, delay = 0 }: CodeRevealProps) {
  const [displayedCode, setDisplayedCode] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < code.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedCode((prev) => prev + code[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        },
        20 + Math.random() * 30,
      )

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, code])

  const lines = displayedCode.split("\n")

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-gray-900/80 border border-green-400/30 rounded-lg p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-green-400 text-sm">developer.js</span>
      </div>

      <pre className="text-green-400 text-sm overflow-x-auto">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex"
          >
            <span className="text-green-600 mr-4 select-none">{(index + 1).toString().padStart(2, "0")}</span>
            <span>{line}</span>
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          className="text-green-400"
        >
          █
        </motion.span>
      </pre>
    </motion.div>
  )
}
