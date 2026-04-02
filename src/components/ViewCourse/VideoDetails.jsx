import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCompletedLectures } from '../../slices/viewCourse';
import ReactPlayer from "react-player";
import { AiFillPlayCircle } from "react-icons/ai"
import { markLectureAsCompleted } from '../../services/course';
function VideoDetails({ setReviewModal }) {

  const { courseId, sectionId, subSectionId } = useParams();
  const { courseEntireData, courseSectionData, completedLectures, totalNoOfLectures } = useSelector(state => state.viewCourse);
  const { token } = useSelector(state => state.auth);
  console.log(completedLectures)
  const ref = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [playedSeconds, setPlayedSeconds] = useState(0);
  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("PARAMS:");
  console.log("courseId:", courseId);
  console.log("sectionId:", sectionId);
  console.log("subSectionId:", subSectionId);

  console.log("COURSE SECTION DATA:");
  console.log(courseSectionData);

  useEffect(() => {
    const setVideoDetails = () => {

      if (!courseSectionData?.length) return;

      if (!courseId || !sectionId || !subSectionId) {
        navigate('/dashboard/enrolled-course');
        return;
      }

      const section = courseSectionData.find(
        (sec) => sec._id.toString() === sectionId
      );

      const video = section?.subSection?.find(
        (vid) => vid._id.toString() === subSectionId
      );
      console.log("MATCHED VIDEO:", video);

      if (!video) {
        console.log("VIDEO NOT FOUND");
        return;
      }

      console.log("VIDEO URL:", video.videoURL);

      setVideoData(video);
      setVideoEnded(false);
    };

    setVideoDetails();

  }, [location.pathname, courseSectionData]);

  const isFirstVideo = () => {
    const sectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
    console.log(courseSectionData)
    const subSecIndex = courseSectionData[sectionIndex]?.subSection?.findIndex((video) => video._id === subSectionId);

    if (sectionIndex === 0 && subSecIndex === 0) {
      return true
    }
    else return false
  }

  const isLastVideo = () => {
    const sectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
    const subSecIndex = courseSectionData[sectionIndex]?.subSection?.findIndex((video) => video._id === subSectionId);

    if (sectionIndex === courseSectionData?.length - 1 && subSecIndex === courseSectionData[sectionIndex]?.subSection.length - 1) {
      return true
    }
    else return false
  }

  const goToPreviousVideo = () => {

    const sectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
    const noOfSubSections = courseSectionData[sectionIndex]?.subSection.length;
    const subSecIndex = courseSectionData[sectionIndex]?.subSection?.findIndex((video) => video._id === subSectionId);

    // previous vedio of same secton i-e current index is first
    if (subSecIndex !== 0) {
      const prevSubSecId = courseSectionData[sectionIndex]?.subSection[subSecIndex - 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSecId}`)
    }
    else {

      // previous section, last vedio
      const prevSecId = courseSectionData[sectionIndex - 1]._id
      const noOfSubSec = courseSectionData[sectionIndex - 1]?.subSection.length
      const prevSubSecId = courseSectionData[sectionIndex - 1]?.subSection[noOfSubSec - 1]._id
      navigate(`/view-course/${courseId}/section/${prevSecId}/sub-section/${prevSubSecId}`)


    }
  }

  const goToNextVideo = () => {

    const sectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
    const noOfSubSections = courseSectionData[sectionIndex]?.subSection.length;
    const subSecIndex = courseSectionData[sectionIndex]?.subSection?.findIndex((video) => video._id === subSectionId);

    // next vedio of same secton i-e current index is not last
    if (subSecIndex !== noOfSubSections - 1) {

      const nextSubSecId = courseSectionData[sectionIndex]?.subSection[subSecIndex + 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSecId}`)
    }
    else {

      // next section, 1st vedio
      const nextSecId = courseSectionData[sectionIndex + 1]?._id
      const nextSubSecId = courseSectionData[sectionIndex + 1]?.subSection[0]?._id

      navigate(`/view-course/${courseId}/section/${nextSecId}/sub-section/${nextSubSecId}`)
    }
  }

  const ishandleVideoCompleted = async () => {

    setLoading(true)
    console.log(token)
    const res = await markLectureAsCompleted({ courseId: courseId, subSectionId: subSectionId }, token)

    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)

  }

  return (
    <div className="px-2 h-screen bg-gray-900 flex flex-col">
      {!videoData || !videoData?.videoURL ? (
        <div className="flex-1 flex items-center justify-center text-white text-xl">
          No video exists.
        </div>
      ) : (
        <>
          <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>

            <ReactPlayer
              src={videoData.videoURL}
              ref={ref}
              // autoPlay={true}
              controls
              width="100%"
              height="100%"
              className="absolute top-0 left-0"
              onEnded={() => setVideoEnded(true)}
            />
            {/* <AiFillPlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white opacity-60 hover:opacity-100 transition-opacity pointer-events-none" /> */}
          </div>

          <div className="p-6 bg-gray-900">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-3">
                {!completedLectures?.includes(subSectionId) && videoEnded && (
                  <button
                    disabled={loading}
                    onClick={() => ishandleVideoCompleted()}
                    className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700 transition-colors duration-300 touch-none"
                  >
                    {!loading ? "Mark as Completed" : "Loading..."}
                  </button>
                )}
                {!completedLectures?.includes(subSectionId) && videoEnded &&
                  (
                    <button
                      disabled={loading}
                      onClick={() => {
                        if (ref.current) {
                          ref.current.seekTo(0);
                          setVideoEnded(false);
                        }
                      }}
                      className="px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700 transition-colors duration-300 touch-none"
                    >
                      Rewatch
                    </button>
                  )
                }
              </div>

              <div className="flex gap-3">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPreviousVideo}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {!isLastVideo() && videoEnded && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">{videoData?.title}</h1>
            <p className="text-gray-400">{videoData?.description}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default VideoDetails
