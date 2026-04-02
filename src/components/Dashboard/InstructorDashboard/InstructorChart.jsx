"use client"

import React,{ useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)
function InstructorChart({ courses }) {
  const [currChart, setCurChart] = useState("students")

  // deterministic color palette to avoid unstable render values
  const palette = [
    "#3b82f6",
    "#8b5cf6",
    "#14b8a6",
    "#f97316",
    "#ec4899",
    "#22c55e",
    "#facc15",
    "#4ade80",
    "#60a5fa",
    "#a78bfa",
  ]

  const studentColors = courses.map((_, idx) => palette[idx % palette.length])
  const incomeColors = courses.map((_, idx) => palette[(idx + 3) % palette.length])

  //create chart data for student
  const chartDataForStudents = {
    labels: courses.map((course) => course.courseName || course.courseTitle || "Untitled Course"),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled || 0),
        backgroundColor: studentColors,
        borderColor: studentColors, // Use the same colors for border
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  }

  //create chart data for income
  const chartDataForIncome = {
    labels: courses.map((course) => course.courseName || course.courseTitle || "Untitled Course"),
    datasets: [
      {
        data: courses.map((course) => course.totalAmount || 0),
        backgroundColor: incomeColors,
        borderColor: incomeColors, // Use the same colors for border
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-xl font-semibold text-white mb-3">Visualize</p>
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currChart === "students"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
            }`}
            onClick={() => setCurChart("students")}
          >
            Student
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currChart === "income"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
            }`}
            onClick={() => setCurChart("income")}
          >
            Income
          </button>
        </div>
        <div className="w-full h-64 md:h-80">
          <Pie data={currChart === "students" ? chartDataForStudents : chartDataForIncome} options={options} />
        </div>
      </div>
    </div>
  )
}

export default InstructorChart
