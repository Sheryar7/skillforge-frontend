import { Check } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import CourseInformation from "./CourseInformation";
import CourseBuilder from "./CourseBuilder";
import Publish from "./Publish";
import { Zap } from "lucide-react"
function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  const courseSteps = [
    {
      id: 1,
      name: "Course Information",
    },
    {
      id: 2,
      name: "Course Builder",
    },
    {
      id: 3,
      name: "Publish",
    },
  ];
  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div>
        <div className="hidden sm:flex items-center justify-between mb-1">
          {courseSteps.map((item) => (
            <div key={item.id} className="flex items-center w-full gap-2">
              <div
                className={`${step === item.id ? "bg-blue-500" : "bg-gray-700"} w-8 h-8 rounded-full flex items-center justify-center text-white`}
              >
                {step > item.id ? <Check /> : item.id}
              </div>
              {item.id !== courseSteps.length && (
                <div
                  className={`${step > item.id ? "bg-blue-500" : "bg-gray-700"} h-1 flex-1`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden sm:flex gap-6 mb-8 text-gray-300 font-medium">
          {courseSteps.map((item) => (
            <div key={item.id} className={step === item.id ? "text-white" : ""}>{item.name}</div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-lg p-4 md:p-6">
          {step === 1 && <CourseInformation />}
          {step === 2 && <CourseBuilder />}
          {step === 3 && <Publish />}
        </div>
      </div>

      <aside className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">Course Upload Tips</h2>
        </div>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Set the Course Price option or make it free.</li>
          <li>• Standard size for thumbnail is 1024x576.</li>
          <li>• Video section controls course overview video.</li>
          <li>• Course Builder organizes lessons and lectures.</li>
          <li>• You can edit status in Publish section.</li>
        </ul>
      </aside>
    </div>
  );
}

export default RenderSteps;
