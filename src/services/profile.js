import toast from "react-hot-toast";
import apiConnector from "./apiConnector";
import { coursesEndpoints, profileEndpoints } from "./apis";
import { updateProfilePic, setUser } from "../slices/profile";

const { BECOME_INSTRUCTOR_API } = profileEndpoints;

export function updateProfile(profile, token, setLoading) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("profile", profile); // Backend will receive it as `req.file`
      const res = await apiConnector(
        "POST",
        profileEndpoints.UPDATEPROPIC_API,
        formData
      );
      dispatch(updateProfilePic(res.data.user.image));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Image Uploaded!");
    } catch (error) {
      console.log("Error uploading image", error);
      toast.error(error?.response?.data?.message || "Error uploading image");
    }
    setLoading(false);
  };
}
export function updatePersonalInfo(
  gender,
  about,
  dateOfBirth,
  contactNumber,
  token
) {
  return async (dispatch) => {
    // setLoading(true)
    try {
      const res = await apiConnector(
        "POST",
        profileEndpoints.UPDATEPERSONALINFO_API,
        { gender, about, dateOfBirth, contactNumber }
      );
      console.log(res.data);
      // dispatch(updateProfileInfo(res.data.updatedProfile))
      // localStorage.setItem("user", JSON.stringify(res.data.user))
      toast.success("personal information Uploaded!");
    } catch (error) {
      console.log("Error uploading personal information", error);
      toast.error(error?.response?.data?.message || "Error uploading personal information");
    }
    // setLoading(false)
  };
}

export async function getEnrolledCourses() {
  let normalized = {
    success: false,
    courses: [],
    message: "",
  };

  try {
    const resp = await apiConnector("GET", coursesEndpoints.GET_USER_ENROLLED_COURSES_API);
    console.log("getEnrolledCourses response", resp);

    if (!resp?.data?.success) {
      throw new Error(resp?.data?.message || "Error Fetching Enrolled Courses");
    }

    normalized = {
      success: true,
      courses: Array.isArray(resp.data.data) ? resp.data.data : [],
      message: resp.data.message || "",
    };
  } catch (error) {
    console.log("Error Fetching Enrolled Courses", error);
    toast.error(error?.response?.data?.message || "Error Fetching Enrolled Courses");
    normalized.message = error?.response?.data?.message || error.message || "Error Fetching Enrolled Courses";
  }

  return normalized;
}


export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const resp = await apiConnector("GET", profileEndpoints.INSTRUCTOR_STATS_API);
    console.log("Instructor Data: ", resp);
    result = resp?.data?.courses;

  } catch (error) {
    console.log("Error Fetching Instructor Data", error)
    toast.error(error?.response?.data?.message || "Error Fetching Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}

export async function becomeInstructor(token, dispatch, navigate, user) {
  // Guard: don't call API if already instructor
  if (user && user.accountType === "Instructor") {
    toast.dismiss();
    toast("You are already an Instructor");
    navigate("/dashboard/instructor", { replace: true });
    return;
  }
  toast.dismiss();
  const toastId = toast.loading("Updating account...");

  try {
    const response = await apiConnector(
      "POST",
      BECOME_INSTRUCTOR_API,
      {}
    );

    console.log("BECOME INSTRUCTOR RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // ✅ update redux user and localStorage
    dispatch(setUser(response.data.user));
    localStorage.setItem("user", JSON.stringify(response.data.user));

    // Fetch latest user data from backend to ensure sync
    try {
      const userResp = await apiConnector(
        "GET",
        "/profile/getUserData"
      );
      if (userResp.data && userResp.data.user) {
        dispatch(setUser(userResp.data.user));
        localStorage.setItem("user", JSON.stringify(userResp.data.user));
      }
    } catch (e) {
      // ignore fetch error, fallback to previous user
    }

    toast.dismiss();
    toast.success("You are now an Instructor!");
    navigate("/dashboard/instructor");
  } catch (error) {
    console.error("BECOME INSTRUCTOR ERROR:", error.response?.data || error.message);
    toast.dismiss();
    toast.error(error.response?.data?.message || "Something went wrong");
  }

  toast.dismiss();
}