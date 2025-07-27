"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ExternalLink, Users, Activity, Calendar } from "lucide-react"

export default function ProjectVisualization() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: "IEEE-CS Enrollments Website",
      description: "Highly optimized enrollment system for IEEE-CS",
      technologies: ["React", "Tailwind", "Firebase", "AWS", "FastAPI"],
      metrics: {
        users: "2,000+",
        events: "150,000+",
        performance: "98%",
        date: "Feb 2025",
      },
      features: ["Domain selection system", "Dynamic quiz timer", "Task submission portal", "Student status dashboard"],
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "Hackbattle-2024 Website",
      description: "Hackathon platform with exceptional engagement",
      technologies: ["Next.js", "Tailwind", "Firebase"],
      metrics: {
        users: "940",
        events: "19,000+",
        performance: "95%",
        date: "Sep 2024",
      },
      features: ["Event registration", "Real-time updates", "Team management", "Analytics dashboard"],
      color: "#22c55e",
    },
    {
      id: 3,
      title: "Weather Widget",
      description: "Real-time weather application with sleek UI",
      technologies: ["React", "Material UI", "JavaScript"],
      metrics: {
        users: "500+",
        events: "5,000+",
        performance: "99%",
        date: "May 2024",
      },
      features: ["Real-time weather data", "City search functionality", "Detailed weather info", "Responsive design"],
      color: "#f59e0b",
    },
    {
      id: 4,
      title: "Cognifi",
      description: "Quiz creation and participation platform",
      technologies: ["Bootstrap", "Node.js", "Express.js", "MongoDB"],
      metrics: {
        users: "300+",
        events: "2,500+",
        performance: "96%",
        date: "Feb 2024",
      },
      features: ["Quiz creation tools", "User authentication", "Score tracking", "Multiple question formats"],
      color: "#8b5cf6",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.02, rotateY: 5 }}
          onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
          className="relative cursor-pointer"
        >
          <div
            className="bg-gray-900/80 border-2 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
            style={{ borderColor: project.color + "40" }}
          >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-green-300 mb-2">{project.title}</h3>
                <p className="text-green-400/80 text-sm">{project.description}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-green-400 opacity-60 hover:opacity-100 transition-opacity" />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: project.color }} />
                <span className="text-sm text-green-300">{project.metrics.users} users</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" style={{ color: project.color }} />
                <span className="text-sm text-green-300">{project.metrics.events} events</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color }} />
                <span className="text-sm text-green-300">{project.metrics.performance} uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: project.color }} />
                <span className="text-sm text-green-300">{project.metrics.date}</span>
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.1 }}
                  className="px-2 py-1 bg-gray-800 border border-green-400/30 rounded text-xs text-green-400"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: project.metrics.performance }}
                transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                className="h-2 rounded-full"
                style={{ backgroundColor: project.color }}
              />
            </div>

            {/* Expandable Features */}
            <motion.div
              initial={false}
              animate={{ height: selectedProject === project.id ? "auto" : 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-green-400/20">
                <h4 className="text-sm font-bold text-green-300 mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {project.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: selectedProject === project.id ? 1 : 0, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-xs text-green-400/80 flex items-center gap-2"
                    >
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: project.color }} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
            whileHover={{ opacity: 0.1 }}
            style={{ backgroundColor: project.color, filter: "blur(20px)" }}
          />
        </motion.div>
      ))}
    </div>
  )
}
