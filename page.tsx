"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import Quiz from "./quiz"
import Timeline from "./timeline"
import Gallery from "./gallery"
import Navigation from "./navigation"
import MusicPlayer from "./music-player"
import SurpriseButton from "./surprise-button"

export default function ValentinesPage() {
  const [currentPage, setCurrentPage] = useState("home")

  const renderContent = () => {
    switch (currentPage) {
      case "quiz":
        return <Quiz />
      case "timeline":
        return <Timeline />
      case "gallery":
        return <Gallery />
      default:
        return (
          <div className="flex flex-col items-center justify-center space-y-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
                Fröhlichen Valentinstag, mein Schatz!
              </h1>
              <p className="text-xl md:text-2xl text-red-500 leading-relaxed">
                Meine Liebe zu dir erblüht mit jedem Tag aufs Neue –<br />
                wie die schönste Rose in ihrem vollen Glanz
              </p>
            </motion.div>
            <div className="flex flex-col gap-6 items-center w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg w-full max-w-xs transition-all duration-300 ease-in-out transform hover:shadow-xl"
                onClick={() => setCurrentPage("quiz")}
              >
                Beginne das Liebesquiz
              </motion.button>
              <SurpriseButton />
            </div>
            <MusicPlayer />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex flex-col items-center justify-start p-4 md:p-8">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-grow flex flex-col items-center justify-center w-full">{renderContent()}</div>
      <RoseAnimation />
    </div>
  )
}

function RoseAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            top: "100%",
            left: `${Math.random() * 100}%`,
            rotate: 0,
          }}
          animate={{
            top: "-10%",
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Heart className="text-red-400 opacity-50" size={Math.random() * 24 + 16} />
        </motion.div>
      ))}
    </div>
  )
}

