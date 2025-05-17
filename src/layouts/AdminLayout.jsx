import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
      <Footer />
      
    </div>
  );
};

export default AdminLayout;
