import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { becomeInstructor } from "../services/profile";
import ConfirmationModal from "../components/ConfirmationModal";

function BecomeInstructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

    React.useEffect(() => {
      if (user && user.accountType === "Instructor") {
        navigate("/dashboard/instructor", { replace: true });
      }
    }, [user, navigate]);


  const handleClick = () => {
    // Double-check before showing modal
    if (user && user.accountType === "Instructor") {
      toast("You are already an Instructor");
      navigate("/dashboard/instructor", { replace: true });
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    becomeInstructor(token, dispatch, navigate, user);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  // Prevent showing the page if already instructor
  if (user && user.accountType === "Instructor") {
    return null;
  }

  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-xl text-center max-w-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-yellow-400">
          Become an Instructor
        </h1>

        <p className="text-gray-300 mb-6">
          Share your knowledge, create courses, and earn money by teaching
          students around the world.
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="bg-yellow-300 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Become Instructor
          </button>
        </div>
        {showModal && (
          <ConfirmationModal
            data={{
              text1: "Are you sure you want to become an instructor?",
              text2: "Your account will change from student to instructor. This action cannot be undone.",
              btn1Text: "Yes, Become Instructor",
              btn2Text: "Cancel",
              btn1Handler: handleConfirm,
              btn2Handler: handleCancel,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default BecomeInstructor;