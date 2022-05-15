import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import TokenContext from "./TokenContext";
import useToken from "./hooks/useToken";
import PrivateRoute from "./PrivateRoute";

function App() {
  const { token, setToken, getToken } = useToken();

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        getToken,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            key="tas01"
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route key="tas02" path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
