import axios from 'axios'
import store from '../store/store'
import { setToken } from '../slices/auth';
import { authEndpoints } from './apis';

const instance = axios.create({
  withCredentials: true, // very important to enable cookies
})

// separate instance to avoid infinite interceptor loop
const refreshInstance = axios.create({ withCredentials: true });

// Add response interceptor for handling 401 errors globally
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — handle it globally here
      try {
        const res = await refreshInstance.get(authEndpoints.REFRESH_API);
        console.log("res", res)
        if (res.data.success) {
          // Token refreshed successfully
          // You can also update the token in your store or state management here
          console.log("Token refreshed successfully:", res.data.accessToken);

          const newToken = res.data.accessToken;

          store.dispatch(setToken(newToken));
          localStorage.setItem("token", newToken);

          // retry the original request
          error.config.headers["Authorization"] = `Bearer ${newToken}`;

          return instance.request(error.config);

        } else {
          // Token refresh failed — redirect to login or show a message
          console.log("Token refresh failed:", res.data.message);
          store.dispatch(setToken(null));
          localStorage.removeItem("token");

        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        // Handle error (e.g., redirect to login page)
        store.dispatch(setToken(null));
        localStorage.removeItem("token");
      }

    }
    return Promise.reject(error);
  }
)
const apiConnector = (method, url, bodyData, headers = {}, params) => {

  const rawToken = localStorage.getItem("token");
  const token = rawToken ? rawToken.replace(/^\"|\"$/g, "") : null;
  
  // For FormData, don't set Content-Type - let axios handle it with boundary
  const isFormData = bodyData instanceof FormData;
  const finalHeaders = {
    Authorization: token ? `Bearer ${token}` : "",
    ...headers,
  };
  
  // Remove Content-Type for FormData to let axios set it with boundary
  if (isFormData && finalHeaders["Content-Type"] === "multipart/form-data") {
    delete finalHeaders["Content-Type"];
  }

  return instance({
    method: method,
    url: url,
    headers: finalHeaders,
    data: bodyData || null,
    params: params || null,
  });
};

export default apiConnector;