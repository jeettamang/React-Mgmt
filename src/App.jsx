import { Routes, Route } from "react-router";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";

import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserList from "./pages/admin/users/List";
import UserEdit from "./pages/admin/users/Edit";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/auth">
        <Route index element={<Login />} />
        <Route path="forgot-password" element={<Login />} />
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
