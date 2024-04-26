import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import VerifyPassword from "./components/VerifyPassword";
import UploadPic from "./components/UploadPic";
import { useAuthContext } from "./hooks/useAuthContext";
import EditorPage from "./components/EditorPage";
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
            path="/uploadPic"
            element={state.user ? <UploadPic /> : <Navigate to="/" />}
          />
          <Route path="/editor/:roomId/:clientName" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
