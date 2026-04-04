import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import BecomeInstructor from "./pages/BecomeInstructor";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Error from './pages/Error'
import Settings from "./components/Settings";
import Enrolled from "./components/Dashboard/Enrolled";
import Cart from "./components/Dashboard/Cart/Cart";
import AddCourse from "./components/Dashboard/AddCourse/AddCourse";
import MyCourses from "./components/Dashboard/MyCourses";
import EditCourse from "./components/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CoursePage from "./pages/CoursePage";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/ViewCourse/VideoDetails";
import Instuctor from "./components/Dashboard/InstructorDashboard/Instuctor";
import apiConnector from "./services/apiConnector";

function App() {

  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  React.useEffect(() => {
    async function fetchUserProfile() {
      if (token) {
        try {
          const res = await apiConnector("GET", `${import.meta.env.VITE_BASE_URL}/api/v1/profile/getUserData`);
          const userObj = res.data?.user || res.data?.data;
          if (res.data?.success && userObj) {
            dispatch({ type: 'profile/setUser', payload: userObj });
            localStorage.setItem('user', JSON.stringify(userObj));
          }
        } catch (error) {
          // Optionally handle error (e.g., logout, show error toast)
          console.error(error);
        }
      }
    }
    fetchUserProfile();
  }, [token, dispatch]);

  const { loading: authLoading } = useSelector(state => state.auth);
  const { loading: profileLoading } = useSelector(state => state.profile);

  return (
    <div className="min-h-screen bg-stone-900 relative">
      {(authLoading || profileLoading) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="spinner scale-150"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      )}
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/view-course/:courseId" element={<ViewCourse />} />
        <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route index element={<Navigate to="my-profile" />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="profile" element={<Navigate to="my-profile" replace />} />
          <Route path="settings" element={<Settings />} />
          <Route path="enrolled" element={<Navigate to="enrolled-courses" replace />} />
          <Route path="enrolled-courses" element={<Enrolled />} />
          <Route path="cart" element={<Cart />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="edit-course/:courseId" element={<EditCourse />} />
          <Route path="instructor" element={<Instuctor />} />
          <Route path="become-instructor" element={<BecomeInstructor />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 3000 }} />
    </div>
  );
}

export default App;