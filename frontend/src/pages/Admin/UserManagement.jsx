import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api";
import {
  FaUserPlus,
  FaUserCheck,
  FaUsers,
  FaTrash,
  FaSearch,
  FaEdit,
  FaToggleOn,
  FaToggleOff,
  FaKey,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const UserManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Sync tab according to current sidebar route
  const defaultTab = location.pathname.includes("clients") ? "client" : "employee";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModalPassword, setShowModalPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: defaultTab,
    designation: "",
    phone: "",
    companyName: "",
    status: "active",
  });

  // Automatically switch tab when clicking sidebar links
  useEffect(() => {
    if (location.pathname.includes("clients")) {
      setActiveTab("client");
    } else if (location.pathname.includes("employees")) {
      setActiveTab("employee");
    }
  }, [location.pathname]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    if (tabName === "client") {
      navigate("/admin/clients");
    } else {
      navigate("/admin/employees");
    }
  };

  const loadData = async (isInitial = true) => {
    if (isInitial) setLoading(true);
    try {
      const response = await API.get(`/users?role=${activeTab}&search=${searchTerm}`);
      setUsers(response.data.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);
  }, [activeTab, searchTerm]);

  // Create User
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users", { ...formData, role: activeTab });
      setShowCreateModal(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: activeTab,
        designation: "",
        phone: "",
        companyName: "",
        status: "active",
      });
      loadData(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create account");
    }
  };

  // Open Edit Modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "", // Optional: Fill only if updating password
      role: user.role || activeTab,
      designation: user.designation || "",
      phone: user.phone || "",
      companyName: user.companyName || "",
      status: user.status || "active",
    });
    setShowEditModal(true);
  };

  // Update User Details
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      const updatePayload = {
        name: formData.name,
        designation: formData.designation,
        phone: formData.phone,
        companyName: formData.companyName,
        status: formData.status,
      };

      if (formData.password && formData.password.trim() !== "") {
        updatePayload.password = formData.password;
      }

      await API.put(`/users/${selectedUser._id}`, updatePayload);
      setShowEditModal(false);
      setSelectedUser(null);
      loadData(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update user account");
    }
  };

  // Optimistic UI Toggle
  const handleToggleStatus = async (user) => {
    const newStatus = user.status === "active" ? "inactive" : "active";

    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u._id === user._id ? { ...u, status: newStatus } : u
      )
    );

    try {
      await API.put(`/users/${user._id}`, { status: newStatus });
    } catch (error) {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === user._id ? { ...u, status: user.status } : u
        )
      );
      alert(error.response?.data?.message || "Failed to change status");
    }
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Delete User
  const handleDeleteUser = (id) => {
    setDeleteConfirmId(id);
  };

  const confirmDeleteUser = async () => {
    if (!deleteConfirmId) return;
    try {
      await API.delete(`/users/${deleteConfirmId}`);
      loadData(false);
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Header & Dynamic Action Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {activeTab === "client" ? "Authors Management" : "Employee Management"}
          </h1>
          <p className="text-xs font-medium text-slate-600 mt-0.5">
            {activeTab === "client"
              ? "View, edit details & passwords, toggle active/inactive status and manage Author accounts"
              : "View, edit details & passwords, toggle active/inactive status and manage Employee accounts"}
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              name: "",
              email: "",
              password: "",
              role: activeTab,
              designation: "",
              phone: "",
              companyName: "",
              status: "active",
            });
            setShowCreateModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          <FaUserPlus className="text-sm" /> Add New {activeTab === "employee" ? "Employee" : "Author"}
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-fit">
          <button
            onClick={() => handleTabChange("employee")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "employee"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            <FaUserCheck className="text-sm" /> Employees
          </button>
          <button
            onClick={() => handleTabChange("client")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "client"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            <FaUsers className="text-sm" /> Authors
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>
      </div>

      {/* User Table (Compact) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold text-[10.5px]">
              <tr>
                <th className="p-3">User Info</th>
                <th className="p-3">Role</th>
                <th className="p-3">{activeTab === "client" ? "University / Institution" : "Designation"}</th>
                <th className="p-3">Status Toggle</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-slate-500 font-semibold">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-slate-500 font-semibold">
                    No {activeTab === "client" ? "Author" : "Employee"} accounts found.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-[11px] border border-blue-100 shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs m-0">{u.name}</p>
                          <p className="text-[10.5px] text-slate-500 font-normal m-0">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-100">
                        {u.role === "client" ? "Author" : u.role}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-900 font-semibold text-xs">
                      {activeTab === "client" ? u.companyName || "N/A" : u.designation || "Staff"}
                    </td>
                    <td className="p-2.5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(u)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                          u.status === "active"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                        }`}
                        title="Click to toggle Active / Inactive"
                      >
                        {u.status === "active" ? (
                          <>
                            <FaToggleOn className="text-xs text-emerald-600" /> Active
                          </>
                        ) : (
                          <>
                            <FaToggleOff className="text-xs text-red-500" /> Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(u)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                        title="Edit Details & Reset Password"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        title="Delete Account"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Creating User */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Create New {activeTab === "employee" ? "Employee" : "Author"} Account
            </h3>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-bold text-slate-800">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-800">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-800">Password</label>
                <div className="relative">
                  <input
                    type={showModalPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full p-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowModalPassword(!showModalPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  >
                    {showModalPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                  </button>
                </div>
              </div>

              {activeTab === "employee" ? (
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="Editor / Desk Manager"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                  />
                </div>
              ) : (
                <div>
                  <label className="block mb-1 font-bold text-slate-800">University / Institution Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="University / Organization"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Editing User */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Edit {activeTab === "employee" ? "Employee" : "Author"} Account
            </h3>

            <form onSubmit={handleUpdateUser} className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-bold text-slate-800">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-800">Email Address (Read-only)</label>
                <input
                  type="email"
                  disabled
                  value={formData.email}
                  className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-500 cursor-not-allowed"
                />
              </div>

              {/* Password Edit Input */}
              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 space-y-1">
                <label className="block font-bold text-blue-900 flex items-center gap-1.5">
                  <FaKey className="text-blue-600 text-xs" /> Reset Password (Optional)
                </label>
                <div className="relative">
                  <input
                    type={showModalPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter new password to change..."
                    className="w-full p-2.5 pr-10 bg-white border border-slate-200 rounded-xl font-medium text-slate-900 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowModalPassword(!showModalPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  >
                    {showModalPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 font-normal">
                  Leave empty if you don't want to change the existing password.
                </p>
              </div>

              {activeTab === "employee" ? (
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                  />
                </div>
              ) : (
                <div>
                  <label className="block mb-1 font-bold text-slate-800">University / Institution Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                  />
                </div>
              )}

              <div>
                <label className="block mb-1 font-bold text-slate-800">Account Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Custom Warning Modal for Delete User */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-5 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto text-xl border border-red-100">
              <FaTrash />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Confirm Deletion</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Are you sure you want to delete this account? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all cursor-pointer flex-1"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex-1"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
