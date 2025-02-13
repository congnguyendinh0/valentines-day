"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift } from "lucide-react"
import confetti from "canvas-confetti"

export default function SurpriseButton() {
  const [clicked, setClicked] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const triggerConfetti = () => {
    setClicked(true)
    setShowPopup(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    setTimeout(() => {
      setClicked(false)
      setTimeout(() => setShowPopup(false), 2000)
    }, 2000)
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center justify-center gap-2 ${
          clicked ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gradient-to-r from-pink-500 to-red-500"
        } text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out w-full max-w-xs`}
        onClick={triggerConfetti}
      >
        <Gift size={20} />
        Überraschung!
      </motion.button>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-white p-6 rounded-xl shadow-2xl z-50 text-xl font-bold text-pink-500"
          >
            Heute wird dein Hunger gestillt meow 😽
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

