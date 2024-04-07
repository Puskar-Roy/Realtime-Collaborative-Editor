import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import VerifyPassword from "./components/VerifyPassword";
import ChangePassword from "./components/ChangePassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/verifyPassword" element={<VerifyPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/user" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
