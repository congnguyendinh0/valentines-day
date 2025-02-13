import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  {
    src:"https://i.ibb.co/v4ggPdSx/GAU08042.jpg",alt: "Couple photo 1"
  },
  {
    src: "https://i.ibb.co/ZzL0dk4c/GAU08113.jpg", alt: "Couple photo 2"},
  { src: "https://i.ibb.co/xtsZ5WJC/GAU07782.jpg", alt: "Couple photo 3" },
  { src: "https://i.ibb.co/DPBm76xW/GAU07881.jpg", alt: "Couple photo 4" },
  { src: "https://i.ibb.co/ZzL0dk4c/GAU08113.jpg", alt: "Couple photo 5" },
  { src: "https://i.ibb.co/v4ggPdSx/GAU08042.jpg", alt: "Couple photo 6" },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Unsere Fotogalerie</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer overflow-hidden rounded-xl shadow-md"
            onClick={() => setSelectedImage(image.src)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={300}
              height={300}
              className="object-cover w-full h-48 transition-transform duration-300 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="relative bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Selected image"
                width={800}
                height={600}
                className="max-w-full max-h-[90vh] object-contain"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

