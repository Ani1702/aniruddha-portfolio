"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Node {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  category: string
  size: number
}

interface Connection {
  source: string
  target: string
  strength: number
}

export default function SkillNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const skills = [
    { id: "JavaScript", category: "language", size: 25 },
    { id: "TypeScript", category: "language", size: 20 },
    { id: "React", category: "framework", size: 24 },
    { id: "Node.js", category: "runtime", size: 22 },
    { id: "Express.js", category: "framework", size: 18 },
    { id: "MongoDB", category: "database", size: 20 },
    { id: "Firebase", category: "service", size: 19 },
    { id: "AWS", category: "cloud", size: 21 },
    { id: "Next.js", category: "framework", size: 23 },
    { id: "Tailwind", category: "styling", size: 17 },
    { id: "Git", category: "tool", size: 16 },
    { id: "FastAPI", category: "framework", size: 15 },
    { id: "HTML", category: "language", size: 14 },
    { id: "CSS", category: "styling", size: 15 },
    { id: "C++", category: "language", size: 13 },
  ]

  const connections: Connection[] = [
    { source: "JavaScript", target: "React", strength: 0.9 },
    { source: "JavaScript", target: "Node.js", strength: 0.8 },
    { source: "TypeScript", target: "React", strength: 0.7 },
    { source: "React", target: "Next.js", strength: 0.8 },
    { source: "Node.js", target: "Express.js", strength: 0.9 },
    { source: "MongoDB", target: "Node.js", strength: 0.7 },
    { source: "Firebase", target: "React", strength: 0.6 },
    { source: "AWS", target: "Node.js", strength: 0.5 },
    { source: "Tailwind", target: "React", strength: 0.6 },
    { source: "CSS", target: "HTML", strength: 0.8 },
    { source: "Git", target: "JavaScript", strength: 0.4 },
  ]

  const categoryColors = {
    language: "#22c55e",
    framework: "#3b82f6",
    runtime: "#f59e0b",
    database: "#ef4444",
    service: "#8b5cf6",
    cloud: "#06b6d4",
    styling: "#ec4899",
    tool: "#6b7280",
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = rect.width
    const height = rect.height

    // Initialize nodes
    const nodes: Node[] = skills.map((skill) => ({
      ...skill,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Update node positions
      nodes.forEach((node) => {
        // Apply forces
        node.vx *= 0.99
        node.vy *= 0.99

        // Boundary collision
        if (node.x < node.size || node.x > width - node.size) node.vx *= -0.8
        if (node.y < node.size || node.y > height - node.size) node.vy *= -0.8

        node.x += node.vx
        node.y += node.vy

        // Keep in bounds
        node.x = Math.max(node.size, Math.min(width - node.size, node.x))
        node.y = Math.max(node.size, Math.min(height - node.size, node.y))
      })

      // Draw connections
      connections.forEach((conn) => {
        const source = nodes.find((n) => n.id === conn.source)
        const target = nodes.find((n) => n.id === conn.target)

        if (source && target) {
          ctx.beginPath()
          ctx.moveTo(source.x, source.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = `rgba(34, 197, 94, ${conn.strength * 0.3})`
          ctx.lineWidth = conn.strength * 2
          ctx.stroke()
        }
      })

      // Draw nodes
      nodes.forEach((node) => {
        const isHovered = hoveredNode === node.id
        const radius = node.size + (isHovered ? 5 : 0)

        // Node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = categoryColors[node.category as keyof typeof categoryColors]
        ctx.fill()

        // Node border
        ctx.strokeStyle = isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = isHovered ? 3 : 1
        ctx.stroke()

        // Node label
        ctx.fillStyle = "#ffffff"
        ctx.font = `${isHovered ? 14 : 12}px monospace`
        ctx.textAlign = "center"
        ctx.fillText(node.id, node.x, node.y + radius + 20)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      let foundNode = null
      for (const node of nodes) {
        const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
        if (distance < node.size + 10) {
          foundNode = node.id
          break
        }
      }
      setHoveredNode(foundNode)
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [hoveredNode])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-96 bg-gray-900/50 border border-green-400/30 rounded-lg"
        style={{ width: "100%", height: "400px" }}
      />

      <div className="absolute top-4 left-4 bg-black/80 rounded-lg p-3">
        <h3 className="text-green-400 font-bold mb-2">Legend</h3>
        <div className="space-y-1 text-xs">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-green-300 capitalize">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
