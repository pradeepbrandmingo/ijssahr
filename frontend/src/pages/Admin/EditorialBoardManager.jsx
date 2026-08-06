import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../../services/api";
import {
  FaSave,
  FaPlus,
  FaTrash,
  FaUserTie,
  FaUsers,
  FaGlobe,
  FaEnvelope,
  FaUserPlus,
  FaBookOpen,
  FaInfoCircle,
  FaStar,
  FaFileUpload,
  FaFilePdf,
  FaExternalLinkAlt,
} from "react-icons/fa";

const defaultEditorialBoardData = {
  header: {
    title: "Editorial Board",
    subtitle: "Meet the distinguished editors and scholars leading IJSSAHR.",
  },
  editorInChief: [
    {
      name: "Dr. Carmine Boniello",
      affiliation:
        "Department of Economic and Statistics Sciences, University of Salerno, Fisciano, Salerno, Italy",
      email: "cboniello@unisa.it",
      profileLink: "",
    },
  ],
  associateEditors: [
    {
      name: "Dr. Steven Cates",
      affiliation:
        "Professor, Human Resource Management and Employment Law, Purdue University Global, USA",
      email: "SCates@purdueglobal.edu",
      profileLink: "",
    },
  ],
  editorialBoardMembers: [
    {
      name: "Dr. Lok Raj Sharma",
      affiliation:
        "Sr. Associate Professor of English & Head of the Faculty of Education, Makawanpur Multiple Campus, Hetauda, Nepal",
      email: "lokraj.sharma@mmchetauda.edu.np",
      profileLink: "https://mmchetauda.edu.np/faculty-members/",
    },
  ],
  recruitmentPage: {
    headerTitle: "Recruitment for Reviewers",
    headerSubtitle:
      "The editorial board of IJSSAHR welcomes you to join us as a reviewer.",
    jobStatus: "Part time",
    workingLanguage: "English",
    workingStyle: "Internet-based",
    paymentNotice: "Voluntary job, no payment",
    description: "Reviewers' names will be listed on the journal's webpage.",
    applicationFormLink: "#",
    applicationEmail: "editor.aliconpublications@gmail.com",
    benefitsTitle: "Reviewer Benefits",
    benefitsDescription:
      "At IJSSAHR, we highly value the time, expertise, and dedication of our reviewers.",
    benefitsList: [
      {
        title: "Recognition Certificate",
        description:
          "Reviewers receive an official certificate acknowledging their valuable contribution.",
      },
      {
        title: "Reviewer Acknowledgment",
        description:
          "Names of active reviewers are listed on our website annually.",
      },
      {
        title: "Priority in Publication",
        description:
          "Reviewers receive prioritized processing for their own submissions.",
      },
      {
        title: "Discount on Publication Fees",
        description: "Active reviewers are eligible for a 50% discount policy.",
      },
    ],
  },
  rolesPage: {
    headerTitle: "Editorial Board Roles & Responsibilities",
    headerSubtitle:
      "Detailed guidelines defining duties for Editors-in-Chief, Associate Editors, and Peer Reviewers.",
    rolesList: [
      {
        id: "editor-in-chief",
        roleTitle: "Editor-in-Chief",
        roleSubtitle:
          "Overall leadership, strategic direction, and final editorial decisions.",
        tag: "Executive Leadership",
        responsibilities: [
          {
            title: "Editorial Leadership",
            points: [
              "Set the editorial direction and scope of the journal.",
              "Oversee peer review to ensure fairness and academic quality.",
            ],
          },
          {
            title: "Decision Making",
            points: [
              "Make final decisions on manuscripts after peer review.",
              "Ensure ethical standards are followed in publication.",
            ],
          },
        ],
      },
      {
        id: "associate-editor",
        roleTitle: "Associate Editor",
        roleSubtitle:
          "Managing peer-review workflow and evaluating domain-specific submissions.",
        tag: "Editorial Management",
        responsibilities: [
          {
            title: "Manuscript Handling",
            points: [
              "Assist in managing the peer-review process for assigned manuscripts.",
              "Select suitable reviewers based on subject expertise.",
            ],
          },
        ],
      },
      {
        id: "reviewer",
        roleTitle: "Reviewer",
        roleSubtitle:
          "Providing rigorous, objective, and constructive expert peer evaluations.",
        tag: "Peer Review Expert",
        responsibilities: [
          {
            title: "Manuscript Evaluation",
            points: [
              "Critically assess originality, methodology, and clarity.",
            ],
          },
        ],
      },
    ],
  },
};

const EditorialBoardManager = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("members"); // 'members' | 'recruitment' | 'roles'
  const [saving, setSaving] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [formData, setFormData] = useState(defaultEditorialBoardData);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Please select a valid PDF file");
      return;
    }
    const data = new FormData();
    data.append("pdfFile", file);
    setUploadingPdf(true);
    try {
      const res = await API.post(
        "/editorial-board/upload-application-form",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(
        res.data?.message || "Reviewer Application Form PDF uploaded successfully!"
      );
      if (res.data?.pdfUrl) {
        setFormData((prev) => ({
          ...prev,
          recruitmentPage: {
            ...prev.recruitmentPage,
            applicationFormLink: res.data.pdfUrl,
          },
        }));
      }
      await queryClient.invalidateQueries({
        queryKey: ["admin-editorial-board"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["editorial-board-public"],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Application Form PDF upload failed"
      );
    } finally {
      setUploadingPdf(false);
    }
  };

  const { data: serverData } = useQuery({
    queryKey: ["admin-editorial-board"],
    queryFn: async () => {
      const res = await API.get("/editorial-board");
      return res.data?.data || defaultEditorialBoardData;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (serverData) {
      const rolesList =
        serverData.rolesPage?.rolesList && serverData.rolesPage.rolesList.length > 0
          ? serverData.rolesPage.rolesList
          : defaultEditorialBoardData.rolesPage.rolesList;

      const benefitsList =
        serverData.recruitmentPage?.benefitsList &&
        serverData.recruitmentPage.benefitsList.length > 0
          ? serverData.recruitmentPage.benefitsList
          : defaultEditorialBoardData.recruitmentPage.benefitsList;

      setFormData({
        ...serverData,
        rolesPage: {
          ...serverData.rolesPage,
          rolesList,
        },
        recruitmentPage: {
          ...serverData.recruitmentPage,
          benefitsList,
        },
      });
    }
  }, [serverData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Clean up empty lines from points arrays before sending
      const cleanedData = {
        ...formData,
        rolesPage: {
          ...formData.rolesPage,
          rolesList: formData.rolesPage?.rolesList?.map((role) => ({
            ...role,
            responsibilities: role.responsibilities?.map((resp) => ({
              ...resp,
              points: resp.points?.filter((p) => p && p.trim() !== "") || [],
            })),
          })),
        },
      };

      const res = await API.put("/editorial-board", cleanedData);
      if (res.data?.data) {
        setFormData(res.data.data);
      }
      toast.success("Editorial Board & Sub-Pages updated live successfully!");
      await queryClient.invalidateQueries({
        queryKey: ["admin-editorial-board"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["editorial-board-public"],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update Editorial Board"
      );
    } finally {
      setSaving(false);
    }
  };

  // Helper for Member Changes
  const handleMemberChange = (category, index, field, value) => {
    setFormData((prev) => {
      const list = [...(prev[category] || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [category]: list };
    });
  };

  const addMember = (category) => {
    setFormData((prev) => ({
      ...prev,
      [category]: [
        ...(prev[category] || []),
        { name: "", affiliation: "", email: "", profileLink: "" },
      ],
    }));
  };

  const removeMember = (category, index) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  // Helper for Benefits Array (Recruitment Page)
  const handleBenefitChange = (index, field, value) => {
    setFormData((prev) => {
      const rPage = prev.recruitmentPage || {};
      const benefits = [...(rPage.benefitsList || [])];
      benefits[index] = { ...benefits[index], [field]: value };
      return {
        ...prev,
        recruitmentPage: { ...rPage, benefitsList: benefits },
      };
    });
  };

  const addBenefit = () => {
    setFormData((prev) => {
      const rPage = prev.recruitmentPage || {};
      const benefits = [
        ...(rPage.benefitsList || []),
        { title: "", description: "" },
      ];
      return {
        ...prev,
        recruitmentPage: { ...rPage, benefitsList: benefits },
      };
    });
  };

  const removeBenefit = (index) => {
    setFormData((prev) => {
      const rPage = prev.recruitmentPage || {};
      const benefits = (rPage.benefitsList || []).filter((_, i) => i !== index);
      return {
        ...prev,
        recruitmentPage: { ...rPage, benefitsList: benefits },
      };
    });
  };

  // Helper for Roles Page Array
  const handleRoleHeaderChange = (rIndex, field, value) => {
    setFormData((prev) => {
      const rPage = prev.rolesPage || {};
      const roles = [...(rPage.rolesList || [])];
      roles[rIndex] = { ...roles[rIndex], [field]: value };
      return {
        ...prev,
        rolesPage: { ...rPage, rolesList: roles },
      };
    });
  };

  const handleResponsibilityChange = (rIndex, cIndex, field, value) => {
    setFormData((prev) => {
      const rPage = prev.rolesPage || {};
      const roles = [...(rPage.rolesList || [])];
      const resps = [...(roles[rIndex].responsibilities || [])];
      if (field === "pointsText") {
        const pointsArray = value.split("\n");
        resps[cIndex] = { ...resps[cIndex], points: pointsArray };
      } else {
        resps[cIndex] = { ...resps[cIndex], [field]: value };
      }
      roles[rIndex] = { ...roles[rIndex], responsibilities: resps };
      return {
        ...prev,
        rolesPage: { ...rPage, rolesList: roles },
      };
    });
  };

  const addResponsibilityCard = (rIndex) => {
    setFormData((prev) => {
      const rPage = prev.rolesPage || {};
      const roles = [...(rPage.rolesList || [])];
      const resps = [
        ...(roles[rIndex].responsibilities || []),
        { title: "", points: [] },
      ];
      roles[rIndex] = { ...roles[rIndex], responsibilities: resps };
      return {
        ...prev,
        rolesPage: { ...rPage, rolesList: roles },
      };
    });
  };

  const removeResponsibilityCard = (rIndex, cIndex) => {
    setFormData((prev) => {
      const rPage = prev.rolesPage || {};
      const roles = [...(rPage.rolesList || [])];
      const resps = (roles[rIndex].responsibilities || []).filter(
        (_, i) => i !== cIndex
      );
      roles[rIndex] = { ...roles[rIndex], responsibilities: resps };
      return {
        ...prev,
        rolesPage: { ...rPage, rolesList: roles },
      };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5 text-slate-900 font-sans w-full"
    >
      {/* Top Banner Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            Editorial Board & Sub-Pages Manager
          </h1>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            SuperAdmin Control: Edit Members, Reviewer Recruitment (/editorialboardrecruitment) & Roles (/editorialboardroles) live in MongoDB.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
        >
          <FaSave /> {saving ? "Saving..." : "Save Live Settings"}
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 bg-white px-3 rounded-t-xl overflow-x-auto gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("members")}
          className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === "members"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <FaUsers /> Editorial Board Members
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("recruitment")}
          className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === "recruitment"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <FaUserPlus /> Reviewer Recruitment (/editorialboardrecruitment)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("roles")}
          className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === "roles"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <FaBookOpen /> Roles & Responsibilities (/editorialboardroles)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-xs font-normal">
        {/* TAB 1: MEMBERS */}
        {activeTab === "members" && (
          <div className="space-y-5">
            {[
              {
                key: "editorInChief",
                label: "Editor-in-Chief",
                icon: FaUserTie,
              },
              {
                key: "associateEditors",
                label: "Associate Editors",
                icon: FaUserTie,
              },
              {
                key: "editorialBoardMembers",
                label: "Editorial Board Members",
                icon: FaUsers,
              },
            ].map((cat) => (
              <div
                key={cat.key}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <cat.icon className="text-blue-600" /> {cat.label} (
                    {formData[cat.key]?.length || 0})
                  </h3>
                  <button
                    type="button"
                    onClick={() => addMember(cat.key)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <FaPlus className="text-[10px]" /> Add Member
                  </button>
                </div>

                {formData[cat.key]?.length === 0 ? (
                  <p className="text-slate-400 italic text-xs py-2">
                    No members added in {cat.label} yet. Click "Add Member" above.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {formData[cat.key]?.map((member, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between font-semibold text-slate-700 border-b border-slate-200/60 pb-1.5">
                          <span>
                            {cat.label} #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeMember(cat.key, idx)}
                            className="text-rose-600 hover:text-rose-700 p-1 transition-colors cursor-pointer"
                            title="Remove Member"
                          >
                            <FaTrash />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block mb-1 font-semibold text-slate-700">
                              Full Name:
                            </label>
                            <input
                              type="text"
                              value={member.name || ""}
                              onChange={(e) =>
                                handleMemberChange(
                                  cat.key,
                                  idx,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="e.g. Dr. Carmine Boniello"
                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block mb-1 font-semibold text-slate-700 flex items-center gap-1">
                              <FaEnvelope className="text-slate-400" /> Email:
                            </label>
                            <input
                              type="email"
                              value={member.email || ""}
                              onChange={(e) =>
                                handleMemberChange(
                                  cat.key,
                                  idx,
                                  "email",
                                  e.target.value
                                )
                              }
                              placeholder="e.g. cboniello@unisa.it"
                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block mb-1 font-semibold text-slate-700">
                            Affiliation & Institution:
                          </label>
                          <input
                            type="text"
                            value={member.affiliation || ""}
                            onChange={(e) =>
                              handleMemberChange(
                                cat.key,
                                idx,
                                "affiliation",
                                e.target.value
                              )
                            }
                            placeholder="e.g. Department of Economic Sciences, University of Salerno, Italy"
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 font-semibold text-slate-700 flex items-center gap-1">
                            <FaGlobe className="text-slate-400" /> Profile Link (Optional):
                          </label>
                          <input
                            type="text"
                            value={member.profileLink || ""}
                            onChange={(e) =>
                              handleMemberChange(
                                cat.key,
                                idx,
                                "profileLink",
                                e.target.value
                              )
                            }
                            placeholder="e.g. https://university.edu/faculty/profile"
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: REVIEWER RECRUITMENT PAGE */}
        {activeTab === "recruitment" && (
          <div className="space-y-5">
            {/* 1. Header & Key Information */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <FaUserPlus className="text-blue-600" /> 1. Header & Key Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 font-semibold text-slate-700">
                    Header Banner Title:
                  </label>
                  <input
                    type="text"
                    value={formData.recruitmentPage?.headerTitle || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recruitmentPage: {
                          ...formData.recruitmentPage,
                          headerTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-semibold text-slate-700">
                    Header Banner Subtitle:
                  </label>
                  <input
                    type="text"
                    value={formData.recruitmentPage?.headerSubtitle || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recruitmentPage: {
                          ...formData.recruitmentPage,
                          headerSubtitle: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                <div>
                  <label className="block mb-1 font-semibold text-slate-700">
                    Status:
                  </label>
                  <input
                    type="text"
                    value={formData.recruitmentPage?.jobStatus || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recruitmentPage: {
                          ...formData.recruitmentPage,
                          jobStatus: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-slate-700">
                    Working Language:
                  </label>
                  <input
                    type="text"
                    value={formData.recruitmentPage?.workingLanguage || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recruitmentPage: {
                          ...formData.recruitmentPage,
                          workingLanguage: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-slate-700">
                    Working Style:
                  </label>
                  <input
                    type="text"
                    value={formData.recruitmentPage?.workingStyle || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recruitmentPage: {
                          ...formData.recruitmentPage,
                          workingStyle: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-slate-700">
                    Payment Notice:
                  </label>
                  <input
                    type="text"
                    value={formData.recruitmentPage?.paymentNotice || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recruitmentPage: {
                          ...formData.recruitmentPage,
                          paymentNotice: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-semibold text-slate-700">
                  Quote / Note Text:
                </label>
                <input
                  type="text"
                  value={formData.recruitmentPage?.description || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recruitmentPage: {
                        ...formData.recruitmentPage,
                        description: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs"
                />
              </div>
            </div>

            {/* 2. How to Apply Section */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <FaInfoCircle className="text-blue-600" /> 2. How to Apply Section
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block font-semibold text-slate-700">
                    Application Form PDF Upload:
                  </label>

                  {/* Upload Button */}
                  <label
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed cursor-pointer transition-colors text-xs font-semibold w-full ${
                      uploadingPdf
                        ? "border-blue-300 bg-blue-50 text-blue-500 cursor-not-allowed"
                        : "border-slate-300 bg-slate-50 text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    <FaFileUpload className="shrink-0 text-sm" />
                    <span>{uploadingPdf ? "Uploading PDF..." : "Click to Upload PDF File"}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      disabled={uploadingPdf}
                      onChange={handleFileUpload}
                    />
                  </label>

                  {/* Current PDF Status */}
                  {formData.recruitmentPage?.applicationFormLink &&
                  formData.recruitmentPage.applicationFormLink !== "#" ? (
                    <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-md">
                      <FaFilePdf className="text-red-500 shrink-0 text-sm" />
                      <span className="text-[11px] text-green-800 font-medium truncate flex-1">
                        Current: {formData.recruitmentPage.applicationFormLink}
                      </span>
                      <a
                        href={formData.recruitmentPage.applicationFormLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 shrink-0"
                        title="Preview PDF"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                      </a>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">
                      No PDF uploaded yet. Upload a PDF or paste a link below.
                    </p>
                  )}

                  {/* Manual Link Override */}
                  <div>
                    <label className="block mb-1 font-semibold text-slate-600 text-[11px]">
                      Or paste manual link:
                    </label>
                    <input
                      type="text"
                      value={formData.recruitmentPage?.applicationFormLink || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          recruitmentPage: {
                            ...formData.recruitmentPage,
                            applicationFormLink: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g. /uploads/reviewer-form.pdf or https://..."
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 font-semibold text-slate-700">
                    Application Submission Email:
                  </label>
                  <input
                    type="email"
                    value={formData.recruitmentPage?.applicationEmail || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recruitmentPage: {
                          ...formData.recruitmentPage,
                          applicationEmail: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 3. Reviewer Benefits List */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FaStar className="text-blue-600" /> 3. Reviewer Benefits Cards ({formData.recruitmentPage?.benefitsList?.length || 0})
                </h3>
                <button
                  type="button"
                  onClick={addBenefit}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md font-semibold text-xs transition-colors cursor-pointer"
                >
                  <FaPlus className="text-[10px]" /> Add Benefit Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1.5 font-semibold text-slate-700">
                    Benefits Section Title:
                  </label>
                  <input
                    type="text"
                    value={formData.recruitmentPage?.benefitsTitle || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recruitmentPage: {
                          ...formData.recruitmentPage,
                          benefitsTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-semibold text-slate-700">
                    Benefits Section Description:
                  </label>
                  <input
                    type="text"
                    value={formData.recruitmentPage?.benefitsDescription || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recruitmentPage: {
                          ...formData.recruitmentPage,
                          benefitsDescription: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {formData.recruitmentPage?.benefitsList?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 relative"
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-700 border-b border-slate-200/60 pb-1">
                      <span>Benefit #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeBenefit(idx)}
                        className="text-rose-600 hover:text-rose-700 p-1 cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block mb-1 font-semibold text-slate-700">
                          Benefit Title:
                        </label>
                        <input
                          type="text"
                          value={item.title || ""}
                          onChange={(e) =>
                            handleBenefitChange(idx, "title", e.target.value)
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 font-semibold text-slate-700">
                          Benefit Description:
                        </label>
                        <input
                          type="text"
                          value={item.description || ""}
                          onChange={(e) =>
                            handleBenefitChange(idx, "description", e.target.value)
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ROLES & RESPONSIBILITIES PAGE */}
        {activeTab === "roles" && (
          <div className="space-y-5">
            {/* Header Title & Subtitle */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <FaBookOpen className="text-blue-600" /> Header Title & Subtitle
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 font-semibold text-slate-700">
                    Header Title:
                  </label>
                  <input
                    type="text"
                    value={formData.rolesPage?.headerTitle || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rolesPage: {
                          ...formData.rolesPage,
                          headerTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-semibold text-slate-700">
                    Header Subtitle:
                  </label>
                  <input
                    type="text"
                    value={formData.rolesPage?.headerSubtitle || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rolesPage: {
                          ...formData.rolesPage,
                          headerSubtitle: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Roles List & Responsibility Cards */}
            {formData.rolesPage?.rolesList?.map((role, rIdx) => (
              <div
                key={rIdx}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4"
              >
                <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FaUserTie className="text-blue-600" /> Role #{rIdx + 1}: {role.roleTitle}
                  </h3>
                  <button
                    type="button"
                    onClick={() => addResponsibilityCard(rIdx)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <FaPlus className="text-[10px]" /> Add Duty Area Card
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block mb-1 font-semibold text-slate-700">
                      Role Title:
                    </label>
                    <input
                      type="text"
                      value={role.roleTitle || ""}
                      onChange={(e) =>
                        handleRoleHeaderChange(rIdx, "roleTitle", e.target.value)
                      }
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold text-slate-700">
                      Role Subtitle:
                    </label>
                    <input
                      type="text"
                      value={role.roleSubtitle || ""}
                      onChange={(e) =>
                        handleRoleHeaderChange(rIdx, "roleSubtitle", e.target.value)
                      }
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold text-slate-700">
                      Role Tag Badge:
                    </label>
                    <input
                      type="text"
                      value={role.tag || ""}
                      onChange={(e) =>
                        handleRoleHeaderChange(rIdx, "tag", e.target.value)
                      }
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs"
                    />
                  </div>
                </div>

                {/* Duty / Responsibility Cards */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-800">
                    Responsibility Duty Cards ({role.responsibilities?.length || 0}):
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {role.responsibilities?.map((resp, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 relative"
                      >
                        <div className="flex items-center justify-between font-semibold text-slate-700 border-b border-slate-200/60 pb-1">
                          <span>Card #{cIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeResponsibilityCard(rIdx, cIdx)}
                            className="text-rose-600 hover:text-rose-700 p-1 cursor-pointer"
                          >
                            <FaTrash />
                          </button>
                        </div>

                        <div>
                          <label className="block mb-1 font-semibold text-slate-700">
                            Duty Card Title:
                          </label>
                          <input
                            type="text"
                            value={resp.title || ""}
                            onChange={(e) =>
                              handleResponsibilityChange(
                                rIdx,
                                cIdx,
                                "title",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 font-semibold text-slate-700">
                            Bullet Points (One per line):
                          </label>
                          <textarea
                            rows="2"
                            value={resp.points?.join("\n") || ""}
                            onChange={(e) =>
                              handleResponsibilityChange(
                                rIdx,
                                cIdx,
                                "pointsText",
                                e.target.value
                              )
                            }
                            placeholder="Point 1&#10;Point 2"
                            className="w-full p-2 bg-white border border-slate-300 rounded-md text-xs leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 text-xs"
          >
            <FaSave /> {saving ? "Saving..." : "Save Live Settings"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditorialBoardManager;
