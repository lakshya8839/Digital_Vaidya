import React from 'react';
import { authService } from '../services/authService';

const AuthContext = React.createContext({ 
  isAuthenticated: false, 
  user: null, 
  loading: true,
  login: () => {}, 
  logout: () => {},
  signUp: () => {},
  signInWithGoogle: () => {},
  resetPassword: () => {}
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = authService.onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
          photoURL: firebaseUser.photoURL
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        
        try {
          await fetch('/api/auth/save-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uid: userData.uid,
              email: userData.email,
              displayName: userData.displayName,
              photoURL: userData.photoURL,
              provider: firebaseUser.providerData?.[0]?.providerId || 'email'
            })
          });
        } catch (error) {
          console.error('Failed to save user data:', error);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { user: firebaseUser, error } = await authService.signIn(email, password);
    if (error) {
      throw new Error(error);
    }
    return firebaseUser;
  };

  const signUp = async (email, password, displayName) => {
    const { user: firebaseUser, error } = await authService.signUp(email, password, displayName);
    if (error) {
      throw new Error(error);
    }
    return firebaseUser;
  };

  const signInWithGoogle = async () => {
    const { user: firebaseUser, error } = await authService.signInWithGoogle();
    if (error) {
      throw new Error(error);
    }
    return firebaseUser;
  };

  const logout = async () => {
    const { error } = await authService.signOut();
    if (error) {
      throw new Error(error);
    }
  };

  const resetPassword = async (email) => {
    const { error } = await authService.resetPassword(email);
    if (error) {
      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      loading,
      login, 
      logout,
      signUp,
      signInWithGoogle,
      resetPassword
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}


