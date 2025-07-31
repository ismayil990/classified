import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3001/verify-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.valid) {
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (err) {
        logout(); 
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
