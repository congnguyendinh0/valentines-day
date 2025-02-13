"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

interface NavigationProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const navItems = [
    { id: "home", label: "Startseite" },
    { id: "timeline", label: "Zeitstrahl" },
    { id: "gallery", label: "Fotogalerie" },
    { id: "quiz", label: "Liebesquiz" },
  ]

  const handleNavClick = (id: string) => {
    setCurrentPage(id)
    setIsOpen(false)
  }

  return (
    <nav className="w-full mb-8 bg-white bg-opacity-80 backdrop-blur-md rounded-full shadow-md p-2">
      {isMobile ? (
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full bg-red-500 text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {navItems.map((item) => (
                  <motion.li key={item.id}>
                    <button
                      className={`w-full text-left px-4 py-3 ${
                        currentPage === item.id
                          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                          : "text-gray-600 hover:bg-red-100"
                      }`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <ul className="flex justify-center space-x-2">
          {navItems.map((item) => (
            <motion.li key={item.id}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
                    : "text-gray-600 hover:text-red-500"
                }`}
                onClick={() => setCurrentPage(item.id)}
              >
                {item.label}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      )}
    </nav>
  )
}

