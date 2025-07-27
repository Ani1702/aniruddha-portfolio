"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text)

  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    let timeoutId: NodeJS.Timeout

    const glitch = () => {
      const glitched = text
        .split("")
        .map((char, index) => {
          if (Math.random() < 0.1) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          }
          return char
        })
        .join("")

      setGlitchText(glitched)

      timeoutId = setTimeout(() => {
        setGlitchText(text)
      }, 100)
    }

    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        glitch()
      }
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeoutId)
    }
  }, [text])

  return (
    <motion.span className={`relative ${className}`} whileHover={{ scale: 1.05 }}>
      <span className="relative z-10">{glitchText}</span>
      <motion.span
        className="absolute inset-0 text-red-500 opacity-70"
        animate={{
          x: [0, -2, 2, 0],
          y: [0, 1, -1, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-blue-500 opacity-70"
        animate={{
          x: [0, 2, -2, 0],
          y: [0, -1, 1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  )
}
