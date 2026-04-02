import React, { useEffect, useState } from 'react'
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { getEnrolledCourses } from '../../services/profile';
import { useNavigate } from 'react-router-dom';
import { formatDuration } from '../../utils/formatDuration';
import { courseProgress, unenrollCourse } from '../../services/course';
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/ConfirmationModal";

function Enrolled() {
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseDuration, setCourseDuration] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Get enrolled courses
  const fetchCourses = async () => {
    try {
      const result = await getEnrolledCourses();
      setEnrolledCourses(result.courses || []);
      console.log("Enrolled Courses:", result.courses);

      if (!result.success) {
        toast.error(result.message || "No enrolled courses found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load courses");
    }
  };

  // Get progress
  const fetchProgress = async (courses) => {
    if (courses.length > 0) {
      const ids = courses.map(c => c._id);
      const result = await courseProgress(ids);
      setProgress(result || []);
    }
  };

  // Unenroll function
  const handleUnenroll = async (courseId) => {
    const toastId = toast.loading("Unenrolling...");

    try {
      await unenrollCourse(courseId);

      setEnrolledCourses(prev =>
        prev.filter(course => course._id !== courseId)
      );

      toast.success("Unenrolled successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to unenroll");
    }

    toast.dismiss(toastId);
    setConfirmationModal(null);
  };

  // Initial load
  useEffect(() => {
    const init = async () => {
      await fetchCourses();
      setLoading(false);
    };
    init();
  }, []);

  // Calculate duration + progress
  useEffect(() => {
    if (enrolledCourses.length > 0) {

      const durations = enrolledCourses.map((course) => {
        let total = 0;


        course?.courseContent?.forEach(section => {
          section?.subSection?.forEach?.(sub => {
            total += Number(sub.timeDuration || 0);
          });
        });

        return {
          id: course._id,
          duration: formatDuration(total)
        };
      });

      setCourseDuration(durations);
      fetchProgress(enrolledCourses);
    }
  }, [enrolledCourses]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="max-w-[43rem] mx-auto space-y-8">

        <h1 className="text-2xl font-bold">Enrolled Courses</h1>

        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : enrolledCourses.length === 0 ? (
          <div className="text-center text-gray-400">
            You are not enrolled in any courses yet.
          </div>
        ) : (
          <div className="space-y-4">

            {enrolledCourses.map(course => {
              const prog = Array.isArray(progress)
                ? progress.find(p => p?.id === course._id)?.progress || 0
                : 0;

              return (
                <div
                  key={course._id}
                  className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:border border-blue-400/30"
                  onClick={() => {
                    const sectionId = course.courseContent?.[0]?._id;
                    const subSectionId = course.courseContent?.[0]?.subSection?.[0]?._id;

                    if (!sectionId || !subSectionId) {
                      toast.error("Course content not available");
                      return;
                    }

                    navigate(`/view-course/${course._id}/section/${sectionId}/sub-section/${subSectionId}`);
                  }}
                >
                  <div className="flex gap-4">

                    <img
                      src={course.thumbnail}
                      alt="thumb"
                      className="w-28 h-20 object-cover rounded-md"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{course.courseName}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {course.courseDescription}
                      </p>

                      <div className="flex justify-between mt-2 text-sm">
                        <span>
                          ⏱ {courseDuration.find(c => c.id === course._id)?.duration || "0m"}
                        </span>
                        <span>{prog}%</span>
                      </div>

                      <div className="h-2 bg-gray-700 rounded-full mt-1">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${prog}%` }}
                        />
                      </div>

                      {/* 🔴 UNENROLL BUTTON */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          setConfirmationModal({
                            text1: "Are you sure?",
                            text2: "You will lose access to this course.",
                            btn1Text: "Unenroll",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleUnenroll(course._id),
                            btn2Handler: () => setConfirmationModal(null),
                          });
                        }}
                        className="mt-3 text-xs bg-red-500/10 border border-red-400/30 text-red-400 px-3 py-1 rounded-full hover:bg-red-500/20 transition"
                      >
                        Unenroll
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>

      {/* ✅ YOUR MODAL */}
      {confirmationModal && (
        <ConfirmationModal data={confirmationModal} />
      )}
    </div>
  );
}

export default Enrolled