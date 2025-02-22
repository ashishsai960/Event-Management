import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = (userData) => {
    setUser({
      userId: userData.user_id,
      username: userData.username,
      userType: userData.user_type,
      category: userData.category,
    });
    setAccessToken(userData.access_token);
    setRefreshToken(userData.refresh_token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  // Axios request interceptor to attach token
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

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/token/refresh/", {
        refresh: refreshToken,
      });
      setAccessToken(data.access_token);
      return data.access_token;
    } catch (error) {
      console.error("Token refresh failed", error);
      logout();
    }
  };

  // Axios response interceptor to refresh token if expired
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
    <AuthContext.Provider value={{ user, login, logout, accessToken, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
