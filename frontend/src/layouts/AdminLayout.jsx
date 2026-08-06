import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";

const AdminLayout = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50 font-sans">
      {/* Dynamic Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 md:p-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
