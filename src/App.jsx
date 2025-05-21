// External libraries
import { Routes, Route } from "react-router";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";

// Pages
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";

// Auth Pages
import EmailVerification from "./pages/auth/EmailVerification";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserEdit from "./pages/admin/users/Edit";
import UserList from "./pages/admin/users/List";
import VerifyForgetPassword from "./pages/auth/VerifyForgetPassword";


const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/auth">
        <Route index element={<Login />} />
        <Route path="email-verify" element={<EmailVerification />} />
        <Route path="forget-password" element={<ForgetPassword />} />
         <Route path="forget-password/verify" element={<VerifyForgetPassword/>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<UserEdit />} />
        <Route path="*" element={<ErrorPage Link="/admin" />} />
      </Route>

      {/* Global 404 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
