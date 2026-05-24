import { createContext, useContext, useEffect, useState } from 'react';
import {
  fetchCurrentUser,
  login as apiLogin,
  logoutLocal,
} from '../api/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export function isAdmin(user) {
  return Boolean(user?.is_staff || user?.is_superuser);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const me = await fetchCurrentUser();
      setUser(me);
    } catch {
      logoutLocal();
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser().finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    await apiLogin(username, password);
    const me = await fetchCurrentUser();
    setUser(me);
    return me;
  };

  const logout = () => {
    logoutLocal();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: isAdmin(user),
        login,
        logout,
        refreshUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
