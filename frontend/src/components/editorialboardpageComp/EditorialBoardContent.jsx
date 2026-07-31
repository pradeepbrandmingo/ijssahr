import { motion } from 'framer-motion';
import { FiUsers, FiBook, FiChevronRight, FiUser, FiExternalLink } from 'react-icons/fi';
import { MdOutlineAccountBalance } from 'react-icons/md';
import { Link } from 'react-router-dom';

const editorialData = {
  editorInChief: [
    {
      id: 1,
      name: 'Dr. Carmine Boniello',
      affiliation: 'Department of Economic and Statistics Sciences, University of Salerno, Fisciano, Salerno, Italy',
      email: 'cboniello@unisa.it',
    }
  ],
  associateEditors: [
    {
      id: 2,
      name: 'Dr. Steven Cates',
      affiliation: 'Professor, Human Resource Management and Employment Law, Purdue University Global, USA',
      email: 'SCates@purdueglobal.edu',
    }
  ],
  editorialBoardMembers: [
    {
      id: 3,
      name: 'Dr. Lok Raj Sharma',
      affiliation: 'Sr. Associate Professor of English & Head of the Faculty of Education, Makawanpur Multiple Campus, Hetauda, Nepal',
      email: 'lokraj.sharma@mmchetauda.edu.np',
      profileLink: 'https://mmchetauda.edu.np/faculty-members/',
    },
    {
      id: 4,
      name: 'Prof. Albrecht Classen',
      affiliation: 'Department of German Studies, The University of Arizona, USA',
      email: 'aclassen@arizona.edu',
      profileLink: '#',
    }
  ]
};

const MemberCard = ({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex items-start gap-4 p-5 mb-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-xl"></div>

      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
        <FiUser className="w-6 h-6" />
      </div>

      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
        <p className="text-sm text-gray-600 mt-1">{member.affiliation}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-medium text-blue-600">Email:</span>
          <a href={`mailto:${member.email}`} className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {member.email}
          </a>
        </div>
        {member.profileLink && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-blue-600">Profile link:</span>
            <a href={member.profileLink} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline break-all">
              {member.profileLink}
            </a>
          </div>
        )}
      </div>

      {member.profileLink && (
        <a href={member.profileLink} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-blue-600 hover:bg-blue-50 transition-colors shrink-0">
          <FiExternalLink className="w-5 h-5" />
        </a>
      )}
    </motion.div>
  );
};

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 mt-8 mb-4">
    <Icon className="w-6 h-6 text-gray-700" />
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
  </div>
);

const EditorialBoardContent = () => {
  return (
    <div className="w-full">
      {/* Top Banner Cards */}
      <div className="mb-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200 shadow-sm rounded-xl flex flex-col xl:flex-row overflow-hidden w-full"
        >
          {/* Recruitment Card (Left Half) */}
          <div className="flex-1 p-4 lg:p-5 flex items-start gap-4 xl:border-r border-b xl:border-b-0 border-gray-200 min-w-0">
            <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FiUsers className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="font-bold text-gray-900 text-[15px] leading-snug mb-1 truncate sm:whitespace-normal">
                Recruitment Open for Reviewers
              </h4>
              <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
                We are always looking for passionate researchers and academics to join our reviewer team.
              </p>
              <Link to="/editorialboardrecruitment" className="inline-flex items-stretch border border-gray-200 rounded-md text-[13px] font-semibold text-blue-600 hover:border-blue-200 transition-colors bg-white shadow-sm overflow-hidden w-fit group">
                <span className="px-3 py-1.5 flex items-center justify-center whitespace-nowrap">
                  Click Here to Apply
                </span>
                <span className="border-l border-gray-200 px-2.5 flex items-center justify-center group-hover:bg-blue-50 transition-colors shrink-0">
                  <FiChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Roles Card (Right Half) */}
          <Link to="/editorialboardroles" className="flex-[0.8] p-4 lg:p-5 flex items-start gap-4 cursor-pointer hover:bg-gray-50/80 transition-colors group min-w-0">
            <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <MdOutlineAccountBalance className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="font-bold text-gray-900 text-[15px] leading-snug mb-1 truncate sm:whitespace-normal group-hover:text-blue-700 transition-colors">
                Roles and Responsibilities
              </h4>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                Detailed roles and responsibilities of our editorial team.
              </p>
            </div>
            <div className="shrink-0 flex items-center pt-2">
               <FiChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors w-5 h-5" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Editorial Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SectionHeader title="Editor-in-Chief" icon={FiUsers} />
        {editorialData.editorInChief.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}

        <SectionHeader title="Associate Editor's" icon={FiUser} />
        {editorialData.associateEditors.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}

        <SectionHeader title="Editorial Board Member's" icon={FiUsers} />
        {editorialData.editorialBoardMembers.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </motion.div>
    </div>
  );
};

export default EditorialBoardContent;
