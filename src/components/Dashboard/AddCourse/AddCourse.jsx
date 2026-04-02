import RenderSteps from "./RenderSteps"
import React from "react"

function AddCourse() {
  return (
    <div className="min-h-screen my-8 mx-2 sm:mx-8 text-gray-100">
      <div className="max-w-[1216px] mx-auto flex flex-col">
        <h1 className="text-3xl font-bold mb-8 mx-2 sm:mx-0">Add Course</h1>

        {/* Progress Steps */}
        <div className="w-full">
          <RenderSteps />
        </div>
      </div>
    </div>
  )
}

export default AddCourse
