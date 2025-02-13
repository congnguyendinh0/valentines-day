"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

const questions = [
  {
    question: "Meow, du bringst mich zum Meowen - hast du Lust, am Valentinstag meine +1 zu sein?",
    options: ["Ja", "Nein"],
  },
  // Add more questions if desired
]

export default function ValentineQuiz() {
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
      setShowResult(false)
      const newAnswers = answers.slice(0, answers.length - 1)
      setAnswers(newAnswers)
      setCurrentQuestion(questions.length - 1)
    } else if (currentQuestion > 0) {
      const newAnswers = answers.slice(0, answers.length - 1)
      setAnswers(newAnswers)
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
      >
        <AnimatePresence mode="wait">
          {showResult ? (
            <ResultView key="result" accepted={answers[0] === "Ja"} onBack={handleBack} />
          ) : (
            <QuestionView
              key={`question-${currentQuestion}`}
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
              onBack={currentQuestion > 0 ? handleBack : undefined}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function QuestionView({
  question,
  onAnswer,
  onBack,
}: { question: (typeof questions)[0]; onAnswer: (answer: string) => void; onBack?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{question.question}</h2>
      <div className="space-y-4">
        {question.options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-colors duration-300 hover:bg-red-600"
            onClick={() => onAnswer(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>
      {onBack && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 text-gray-600 flex items-center justify-center w-full"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2" size={18} />
          Zurück
        </motion.button>
      )}
    </motion.div>
  )
}

function ResultView({ accepted, onBack }: { accepted: boolean; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {accepted ? "Wunderbar! Ich liebe dich!" : "Oh nein! Ist mir egal. Du bist mein Date :D"}
      </h2>
      <div className="relative w-64 h-64 mx-auto mb-6">
        <Image
          src={
            accepted
              ? "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnFtdWVmNWM3d2FxbmJldnJieWhkbmRzdjdrdGdnZTFlZ3JmcW5oaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RJzv5gG13bFsER317k/giphy.gif"
              : "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2FxY2F3aHVpcmdocnpmZnh3cXpycnFweXRzM3l6N2xrZzRjNnJzdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/129OnZ9Qn2i0Ew/giphy.gif"
          }
          alt={accepted ? "Herzen" : "Trauriges Herz"}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-colors duration-300 hover:bg-red-600 flex items-center justify-center mx-auto"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2" size={18} />
        Zurück
      </motion.button>
    </motion.div>
  )
}

