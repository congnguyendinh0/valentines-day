"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const questions = [
  {
    question:
      "„Meow, du bringst mich zum Meowen – hast du Lust, am Valentinstag meine +1 zu sein?“",
    options: ["Ja", "Nein"],
  },
  // Add more questions if desired
]

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleBack = () => {
    if (showResult) {
      // If we're showing the result, go back to the last question.
      setShowResult(false)
      const newAnswers = answers.slice(0, answers.length - 1)
      setAnswers(newAnswers)
      setCurrentQuestion(questions.length - 1)
    } else if (currentQuestion > 0) {
      // Otherwise, if we're in the middle of the quiz, go back one question.
      const newAnswers = answers.slice(0, answers.length - 1)
      setAnswers(newAnswers)
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (showResult) {
    const accepted = answers[0] === "Ja"
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-4">
          {accepted
            ? "Wunderbar! Ich liebe dich!"
            : "Oh nein! Ist mir egal. Du bist mein Date :D"}
        </h2>
        <Image
          src={
            accepted
              ? "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnFtdWVmNWM3d2FxbmJldnJieWhkbmRzdjdrdGdnZTFlZ3JmcW5oaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RJzv5gG13bFsER317k/giphy.gif"
              : "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2FxY2F3aHVpcmdocnpmZnh3cXpycnFweXRzM3l6N2xrZzRjNnJzdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/129OnZ9Qn2i0Ew/giphy.gif"
          }
          alt={accepted ? "Herzen" : "Trauriges Herz"}
          width={300}
          height={300}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleBack}
        >
          Zurück
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-2xl font-bold mb-4">
        {questions[currentQuestion].question}
      </h2>
      <div className="space-x-4">
        {questions[currentQuestion].options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>
      {/* Only show the back button if it's not the first question */}
      {currentQuestion > 0 && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleBack}
        >
          Zurück
        </motion.button>
      )}
    </motion.div>
  )
}
