import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import VerifyPassword from "./components/VerifyPassword";
import ChangePassword from "./components/ChangePassword";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const { state } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={state.user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!state.user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!state.user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/forgotPassword"
            element={state.user ? <ForgotPassword /> : <Navigate to="/" />}
          />
          <Route
            path="/verifyPassword"
            element={state.user ? <VerifyPassword /> : <VerifyPassword />}
          />
          <Route
            path="/changePassword"
            element={state.user ? <ChangePassword /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
