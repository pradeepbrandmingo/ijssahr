import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import API from "../../services/api";
import {
  FaHistory,
  FaSearch,
  FaUserTie,
  FaClock,
  FaGlobe,
  FaLayerGroup,
} from "react-icons/fa";

const AuditLogsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [page, setPage] = useState(1);

  const { data: logsData, isLoading } = useQuery({
    queryKey: ["admin-audit-logs", searchTerm, moduleFilter, page],
    queryFn: async () => {
      const res = await API.get(
        `/audit-logs?search=${searchTerm}&module=${moduleFilter}&page=${page}&limit=30`
      );
      return res.data?.data || { logs: [], total: 0, pages: 1 };
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const logs = logsData?.logs || [];

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
          <h1 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
            <FaHistory className="text-blue-600 text-sm" /> Employee Activity & Audit Logs
          </h1>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            SuperAdmin Tracking: Track who did what, exact actions, modules modified, date & time stamp.
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100 shrink-0">
          Total Logs: {logsData?.total || 0}
        </span>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by Employee name, email, action, details..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={moduleFilter}
            onChange={(e) => {
              setModuleFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="">All Employee Modules</option>
            <option value="Manuscripts">Manuscripts</option>
            <option value="Issues">Issues & Volumes</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold text-[10.5px]">
              <tr>
                <th className="p-3">Employee / Admin</th>
                <th className="p-3">Action Performed</th>
                <th className="p-3">Module</th>
                <th className="p-3">Details / Description</th>
                <th className="p-3">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-slate-400 text-xs">
                    Loading activity logs...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-slate-500 text-xs italic">
                    No activity logs recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] flex items-center justify-center border border-blue-100 shrink-0">
                          {log.userName?.charAt(0) || "A"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs m-0">{log.userName}</p>
                          <p className="text-[10.5px] text-slate-500 font-normal m-0">{log.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10.5px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        <FaLayerGroup className="text-[9px]" /> {log.module}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 text-xs max-w-xs truncate">
                      {log.details || "-"}
                    </td>
                    <td className="p-3 text-slate-500 text-[11px]">
                      <div className="flex items-center gap-1 font-mono">
                        <FaClock className="text-[10px] text-slate-400 shrink-0" />
                        <span>{new Date(log.createdAt).toLocaleString()}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AuditLogsManager;
