import { motion } from "framer-motion"

const timelineEvents = [
  { date: "Juli 2023", event: "Beginn unserer Beziehung" },
  { date: "Februar 2024", event: "Unsere Vietnam-Reise" },
  { date: "Dezember 2024", event: "Gemeinsame Wohnung" },
]

export default function Timeline() {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Unsere Beziehung</h2>
      <div className="space-y-8">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex items-center"
          >
            <div className="w-32 text-right mr-4 text-red-500 font-semibold">{event.date}</div>
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="flex-grow ml-4 p-4 bg-white rounded-lg shadow-md">
              <p className="text-lg">{event.event}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

