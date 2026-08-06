import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  FiUsers,
  FiChevronRight,
  FiUser,
  FiExternalLink,
} from "react-icons/fi";
import { MdOutlineAccountBalance } from "react-icons/md";
import { Link } from "react-router-dom";
import API from "../../services/api";

const defaultEditorialData = {
  editorInChief: [
    {
      id: 1,
      name: "Dr. Carmine Boniello",
      affiliation:
        "Department of Economic and Statistics Sciences, University of Salerno, Fisciano, Salerno, Italy",
      email: "cboniello@unisa.it",
    },
  ],
  associateEditors: [
    {
      id: 2,
      name: "Dr. Steven Cates",
      affiliation:
        "Professor, Human Resource Management and Employment Law, Purdue University Global, USA",
      email: "SCates@purdueglobal.edu",
    },
  ],
  editorialBoardMembers: [
    {
      id: 3,
      name: "Dr. Lok Raj Sharma",
      affiliation:
        "Sr. Associate Professor of English & Head of the Faculty of Education, Makawanpur Multiple Campus, Hetauda, Nepal",
      email: "lokraj.sharma@mmchetauda.edu.np",
      profileLink: "https://mmchetauda.edu.np/faculty-members/",
    },
    {
      id: 4,
      name: "Prof. Albrecht Classen",
      affiliation:
        "Department of German Studies, The University of Arizona, USA",
      email: "aclassen@arizona.edu",
      profileLink: "#",
    },
  ],
};

const MemberCard = ({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-3 p-3.5 sm:p-4 mb-3 bg-white border border-slate-200 rounded-lg hover:shadow-2xs transition-all relative overflow-hidden group"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-lg"></div>

      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
        <FiUser className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-[14px] font-semibold text-slate-900 m-0 leading-tight">
          {member.name}
        </h4>
        <p className="text-[12px] font-normal text-slate-600 mt-1 leading-relaxed">
          {member.affiliation}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-[11.5px] font-normal text-slate-500">
          {member.email && (
            <div className="flex items-center gap-1">
              <span className="font-semibold text-blue-600">Email:</span>
              <a
                href={`mailto:${member.email}`}
                className="hover:text-blue-600 transition-colors"
              >
                {member.email}
              </a>
            </div>
          )}
          {member.profileLink && member.profileLink !== "#" && (
            <div className="flex items-center gap-1">
              <span className="font-semibold text-blue-600">Profile:</span>
              <a
                href={member.profileLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline truncate max-w-[220px]"
              >
                {member.profileLink}
              </a>
            </div>
          )}
        </div>
      </div>

      {member.profileLink && member.profileLink !== "#" && (
        <a
          href={member.profileLink}
          target="_blank"
          rel="noreferrer"
          className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-50 text-blue-600 hover:bg-blue-50 transition-colors shrink-0 mt-0.5"
          title="Open Profile"
        >
          <FiExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </motion.div>
  );
};

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 mt-6 mb-3 border-b border-slate-200 pb-1.5">
    <Icon className="w-4 h-4 text-blue-600" />
    <h3 className="text-sm sm:text-base font-bold text-slate-900 m-0">{title}</h3>
  </div>
);

const EditorialBoardContent = () => {
  const { data: serverData } = useQuery({
    queryKey: ["editorial-board-public"],
    queryFn: async () => {
      const res = await API.get("/editorial-board");
      return res.data?.data || defaultEditorialData;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const editorialData = serverData || defaultEditorialData;

  const editorInChiefList =
    editorialData.editorInChief?.length > 0
      ? editorialData.editorInChief
      : defaultEditorialData.editorInChief;

  const associateEditorsList =
    editorialData.associateEditors?.length > 0
      ? editorialData.associateEditors
      : defaultEditorialData.associateEditors;

  const editorialBoardMembersList =
    editorialData.editorialBoardMembers?.length > 0
      ? editorialData.editorialBoardMembers
      : defaultEditorialData.editorialBoardMembers;

  return (
    <div className="w-full space-y-4">
      {/* Top Banner Cards */}
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-slate-200 shadow-2xs rounded-lg flex flex-col md:flex-row overflow-hidden w-full"
        >
          {/* Recruitment Card (Left Half) */}
          <div className="flex-1 p-3.5 sm:p-4 flex items-start gap-3 md:border-r border-b md:border-b-0 border-slate-200 min-w-0">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FiUsers className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="font-semibold text-slate-900 text-[13.5px] leading-snug mb-0.5">
                {editorialData.recruitmentBanner?.title ||
                  "Recruitment Open for Reviewers"}
              </h4>
              <p className="text-[11.5px] font-normal text-slate-600 leading-relaxed mb-2.5">
                {editorialData.recruitmentBanner?.text ||
                  "We are always looking for passionate researchers and academics to join our reviewer team."}
              </p>
              <Link
                to={
                  editorialData.recruitmentBanner?.applyLink ||
                  "/editorialboardrecruitment"
                }
                className="inline-flex items-center gap-1.5 border border-slate-200 rounded-md text-[12px] font-semibold text-blue-600 hover:border-blue-300 transition-colors bg-white px-2.5 py-1 shadow-2xs group"
              >
                <span>
                  {editorialData.recruitmentBanner?.linkText ||
                    "Click Here to Apply"}
                </span>
                <FiChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Roles Card (Right Half) */}
          <Link
            to={editorialData.rolesBanner?.link || "/editorialboardroles"}
            className="flex-[0.8] p-3.5 sm:p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50 transition-colors group min-w-0"
          >
            <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <MdOutlineAccountBalance className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="font-semibold text-slate-900 text-[13.5px] leading-snug mb-0.5 group-hover:text-blue-600 transition-colors">
                {editorialData.rolesBanner?.title ||
                  "Roles and Responsibilities"}
              </h4>
              <p className="text-[11.5px] font-normal text-slate-600 leading-relaxed">
                {editorialData.rolesBanner?.text ||
                  "Detailed roles and responsibilities of our editorial team."}
              </p>
            </div>
            <div className="shrink-0 flex items-center pt-1">
              <FiChevronRight className="text-slate-400 group-hover:text-blue-600 transition-colors w-4 h-4" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Editorial Sections */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {editorInChiefList.length > 0 && (
          <>
            <SectionHeader title="Editor-in-Chief" icon={FiUsers} />
            {editorInChiefList.map((member, idx) => (
              <MemberCard key={member._id || member.id || idx} member={member} />
            ))}
          </>
        )}

        {associateEditorsList.length > 0 && (
          <>
            <SectionHeader title="Associate Editor's" icon={FiUser} />
            {associateEditorsList.map((member, idx) => (
              <MemberCard key={member._id || member.id || idx} member={member} />
            ))}
          </>
        )}

        {editorialBoardMembersList.length > 0 && (
          <>
            <SectionHeader title="Editorial Board Member's" icon={FiUsers} />
            {editorialBoardMembersList.map((member, idx) => (
              <MemberCard key={member._id || member.id || idx} member={member} />
            ))}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default EditorialBoardContent;
