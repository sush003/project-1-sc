import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthContextType {
  user: any | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signUp: (data: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Hook for child components to get the auth object ...
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check active sessions and sets the user
    // MOCK: Check localStorage
    const isAuth = localStorage.getItem('koravo_auth') === 'true';
    if (isAuth) {
        setUser({ email: 'system@koravo.ai', id: 'mock-id-123' });
    } else {
        setUser(null);
    }
    setLoading(false);
  }, []);

  // Login function
  const signIn = async (email: string, password: string) => {
    // MOCK LOGIN LOGIC
    // We accept 'koravo' as email (or simple check) and 'koravo123' or 'koravo 123' as password
    // The user's legacy code sends 'email', so we treat username as email for comp.
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if ((email.includes('koravo') || email === 'system_id') && 
        (password === 'koravo123' || password === 'koravo 123')) {
        
        localStorage.setItem('koravo_auth', 'true');
        setUser({ email: 'system@koravo.ai', id: 'mock-id-123' });
        
        // Redirect logic handled here or in component? 
        // User's code: "The navigation will be handled by AuthContext" (comment says this)
        // But his provided AuthContext actually navigates in useEffect. 
        // We will mimic that.
        
        if (location.pathname === '/login' || location.pathname === '/signup') {
             navigate('/priming'); // Redirect to Priming instead of /
        }
        
        return { error: null };
    } else {
        return { error: { message: "Invalid credentials" } };
    }
  };

  const signInWithGoogle = async () => {
      // Mock Google Auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('koravo_auth', 'true');
      setUser({ email: 'google-user@koravo.ai', id: 'mock-google-id' });
      navigate('/priming');
      return { error: null };
  };

  const signUp = async (data: any) => {
      return { error: { message: "Sign up disabled in demo mode." } };
  };

  const signOut = async () => {
    localStorage.removeItem('koravo_auth');
    setUser(null);
    navigate("/login");
  };

  const value = {
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
