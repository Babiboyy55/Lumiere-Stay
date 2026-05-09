import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/Account/GetUserInfo');
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user info", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/Account/login', { 
        userName: email, 
        password: password 
      });
      // Lấy role từ API trả về
      const { token, role, userName, image } = response.data;
      
      localStorage.setItem('token', token);
      
      // Fetch full user info after login
      const userInfoResponse = await api.get('/Account/GetUserInfo');
      setUser(userInfoResponse.data);
      
      return { 
        success: true, 
        role: role 
      };
    } catch (error) {
      console.error("Login error", error);
      return { 
        success: false, 
        message: error.response?.data?.Error || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
