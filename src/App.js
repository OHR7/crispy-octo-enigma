import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Kudos from "./views/Kudos";
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
            key="home"
            path="/"
            element={
              <PrivateRoute token={token}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            key="kudos"
            path="/my-kudos"
            element={
              <PrivateRoute token={token}>
                <Kudos />
              </PrivateRoute>
            }
          />
          <Route key="login" path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
