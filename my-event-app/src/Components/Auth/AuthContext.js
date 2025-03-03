import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));

  // 🔹 Login: Save user & tokens
  const login = (userData) => {
    setUser({
      userId: userData.user_id,
      username: userData.username,
      userType: userData.user_type,
    });
    setAccessToken(userData.access_token);
    setRefreshToken(userData.refresh_token);

    // Persist tokens in localStorage
    localStorage.setItem("accessToken", userData.access_token);
    localStorage.setItem("refreshToken", userData.refresh_token);
  };

  // 🔹 Logout: Clear user & tokens, call backend logout
  const logout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/login/logout/", {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.location.href = "/"; // Redirect to login page
  };

  // 🔹 Attach token to every request
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]);

  // 🔹 Refresh Token Function
  const refreshAccessToken = async () => {
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/token/refresh/", {
        refresh: refreshToken,
      });
      setAccessToken(data.access_token);
      localStorage.setItem("accessToken", data.access_token);
      return data.access_token;
    } catch (error) {
      console.error("Token refresh failed", error);
      logout();
    }
  };

  // 🔹 Handle expired tokens (401 response)
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider value={{ user, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
