import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import API from "../../services/api";
import {
  FaBookmark,
  FaPlus,
  FaTrash,
  FaSave,
  FaExternalLinkAlt,
  FaGripVertical,
} from "react-icons/fa";

const IndexingServicesManager = () => {
  const queryClient = useQueryClient();
  const [services, setServices] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { data: fetchedServices = [], isLoading } = useQuery({
    queryKey: ["admin-indexing-services"],
    queryFn: async () => {
      const res = await API.get("/indexing-services");
      return res.data?.data || [];
    },
  });

  useEffect(() => {
    if (fetchedServices && fetchedServices.length > 0) {
      setServices(fetchedServices);
    }
  }, [fetchedServices]);

  const saveMutation = useMutation({
    mutationFn: async (updatedList) => {
      const res = await API.put("/indexing-services", { services: updatedList });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-indexing-services"]);
      queryClient.invalidateQueries(["sidebar-indexing-services"]);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Failed to save indexing services");
    },
  });

  const handleServiceChange = (index, field, value) => {
    setServices((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleAddService = () => {
    setServices((prev) => [...prev, { name: "", url: "" }]);
  };

  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleDeleteService = (index) => {
    setDeleteIndex(index);
  };

  const confirmDeleteService = () => {
    if (deleteIndex === null) return;
    setServices((prev) => prev.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanList = services.filter((s) => s.name.trim() !== "");
    saveMutation.mutate(cleanList);
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-400 text-xs">
        Loading Indexing Services settings...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-4 text-slate-900 font-sans w-full"
    >
      {/* Top Banner Header */}
      <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <h1 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <FaBookmark className="text-blue-600 text-sm" /> Manage Indexing Services Links
          </h1>
          <p className="text-xs font-normal text-slate-500 mt-0.5 m-0">
            SuperAdmin Control: Live add, edit, or delete external indexing service menu items in Website Sidebar.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saveMutation.isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0 disabled:opacity-50"
        >
          <FaSave className="text-xs" />
          {saveMutation.isPending ? "Saving..." : "Save Live Menu"}
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200">
          ✓ Indexing Services sidebar menu updated live successfully!
        </div>
      )}

      {/* Indexing Services List */}
      <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider m-0">
            Indexing Links ({services.length})
          </h2>

          <button
            type="button"
            onClick={handleAddService}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 rounded-lg text-xs font-bold border border-slate-200/80 transition-all cursor-pointer"
          >
            <FaPlus className="text-[10px] text-blue-600" /> Add New Indexing Link
          </button>
        </div>

        <div className="space-y-3">
          {services.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4 text-center">
              No indexing services links added yet. Click "+ Add New Indexing Link" to create one.
            </p>
          ) : (
            services.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 p-3 bg-slate-50 rounded-lg border border-slate-200/70"
              >
                <div className="flex items-center gap-2 flex-1">
                  <FaGripVertical className="text-slate-300 text-xs shrink-0 cursor-grab" />
                  <span className="font-mono text-[11px] font-bold text-slate-400 w-5">
                    #{idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleServiceChange(idx, "name", e.target.value)}
                    placeholder="Title (e.g. Index Copernicus)"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="url"
                    value={item.url}
                    onChange={(e) => handleServiceChange(idx, "url", e.target.value)}
                    placeholder="URL Link (e.g. https://indexcopernicus.com)"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-normal text-slate-700 focus:outline-none focus:border-blue-600"
                  />

                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-white text-slate-500 hover:text-blue-600 rounded-md border border-slate-200 text-xs shrink-0"
                      title="Test URL Link"
                    >
                      <FaExternalLinkAlt className="text-[11px]" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeleteService(idx)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md border border-red-200 text-xs shrink-0 cursor-pointer"
                    title="Delete Link"
                  >
                    <FaTrash className="text-[11px]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Custom Warning Modal for Delete Service */}
      {deleteIndex !== null && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-5 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto text-xl border border-red-100">
              <FaTrash />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Remove Indexing Link</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Are you sure you want to remove this indexing link from the menu list?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={() => setDeleteIndex(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all cursor-pointer flex-1"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteService}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex-1"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default IndexingServicesManager;
