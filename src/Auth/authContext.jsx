import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const MY_AUTH_APP = "MY_AUTH_APP";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.localStorage.getItem(MY_AUTH_APP) === "true"
  );

  const login = useCallback(function (token) {
    window.localStorage.setItem(MY_AUTH_APP, "true");
    console.log("Token de autenticación almacenado:", token);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(function () {
    window.localStorage.removeItem(MY_AUTH_APP);
    // Recoger otros items del local storage al momento de logout
    const itemsToRemove = [
      "cartItems",
      "coins",
      "jwtToken",
      "rol",
      "selectedLink",
      "totalCoins",
      "totalPrice",
      "userID",
      "usuario",
    ];
    itemsToRemove.forEach((item) => {
      window.localStorage.removeItem(item);
    });
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
    }),
    [isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
