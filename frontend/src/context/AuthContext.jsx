import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [openDrawerAfterLogin, setOpenDrawerAfterLogin] = useState(false); // <-- Naya flag

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    setOpenDrawerAfterLogin(true); // Login hone pe drawer open karne ka flag set karo
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setOpenDrawerAfterLogin(false); // Logout pe flag reset kar do
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, openDrawerAfterLogin, setOpenDrawerAfterLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
