import React from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';

const dummyArticles = [
  {
    id: 1,
    title: "Hans Sachs and the Birth of Poetic Self-awareness: Autobiography, Criticism, and a Paradigm Shift in Literature",
    author: "Albrecht Classen, USA",
    volumeIssue: "Vol. 01, Issue 03",
    date: "May–Jun 2026",
    link: "#"
  },
  {
    id: 2,
    title: "SOS to Ghana's and ECOWAS' Parliaments for the Promulgation of Victims Protection Act",
    author: "Ishmael D. Norman, Ghana",
    volumeIssue: "Vol. 01, Issue 03",
    date: "May–Jun 2026",
    link: "#"
  },
  {
    id: 3,
    title: "The Phenomenon of Poverty and the Ethics of Help by the Rich Countries",
    author: "Robert Wadri Aluma, Uganda",
    volumeIssue: "Vol. 01, Issue 03",
    date: "May–Jun 2026",
    link: "#"
  },
  {
    id: 4,
    title: "Algorithmic Composition: Artificial Intelligence and Generative Methods in Music",
    author: "Belikova Viktoriia, USA",
    volumeIssue: "Vol. 01, Issue 03",
    date: "May–Jun 2026",
    link: "#"
  },
  {
    id: 5,
    title: "Puro Veneno Wall Posters, Colombia, South America, 2018 to Present",
    author: "R.G. Wakeland, USA",
    volumeIssue: "Vol. 01, Issue 03",
    date: "May–Jun 2026",
    link: "#"
  },
  {
    id: 6,
    title: "Tracing the Concept of Mission in Public Organizations",
    author: "Dr. Mike Potter, USA",
    volumeIssue: "Vol. 01, Issue 03",
    date: "May–Jun 2026",
    link: "#"
  },
  {
    id: 7,
    title: "Recent U.S. Actions on Venezuela: Power, Legitimacy, Energy, and the Future of Global Order",
    author: "Dr Rakesh Kumar, India",
    volumeIssue: "Vol. 01, Issue 03",
    date: "May–Jun 2026",
    link: "#"
  },
  {
    id: 8,
    title: "Revisiting the Book of Revelation in the Context and the Makala Prison Experience in the Democratic Republic of Congo",
    author: "Prof. Dr Lazare Sebitereko Rukundwa, Congo",
    volumeIssue: "Vol. 01, Issue 03",
    date: "May–Jun 2026",
    link: "#"
  }
];

const RecentlyPublishedArticles = ({
  title = "Recently Published Articles",
  articles = dummyArticles,
  viewAllLink = "#"
}) => {
  return (
    <section className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6 lg:p-8 mb-10">
      
      {/* Component Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-3">
        <div className="flex items-center gap-2.5">
          <HiOutlineDocumentText className="text-[var(--primary)] text-2xl shrink-0" />
          <h2 className="text-base md:text-lg font-bold text-[var(--heading)]">
            {title}
          </h2>
        </div>
        <a 
          href={viewAllLink} 
          className="flex items-center gap-1.5 text-[13px] md:text-sm font-semibold text-[var(--primary)] hover:text-blue-800 transition-colors group shrink-0"
        >
          <span>View All Articles</span>
          <FiArrowRight className="transform transition-transform group-hover:translate-x-1 shrink-0" />
        </a>
      </div>

      {/* Article List */}
      <div className="divide-y divide-slate-100">
        {articles.map((article) => (
          <div 
            key={article.id || article._id} 
            className="py-4 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-start justify-between gap-3 group hover:bg-slate-50/60 p-2 sm:p-3 rounded-xl transition-colors"
          >
            {/* Left side: Icon + Title & Author */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <HiOutlineDocumentText className="text-[var(--primary)] text-xl shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <a 
                  href={article.link || `#`}
                  className="block text-[13px] md:text-[14px] font-semibold text-[var(--primary)] hover:text-blue-800 leading-snug mb-1 transition-colors"
                >
                  {article.title}
                </a>
                <p className="text-[12px] md:text-[13px] text-slate-500 font-medium m-0">
                  {article.author}
                </p>
              </div>
            </div>

            {/* Right side: Volume/Issue & Date */}
            <div className="sm:text-right shrink-0 pl-8 sm:pl-0 flex sm:flex-col justify-between sm:justify-start items-baseline sm:items-end gap-2 sm:gap-0">
              <p className="text-[12px] md:text-[13px] text-slate-600 font-semibold m-0">
                {article.volumeIssue || (article.volume && `Vol. ${article.volume}, Issue ${article.issue}`)}
              </p>
              <p className="text-[11px] md:text-[12px] text-slate-400 font-normal m-0">
                {article.date || article.publishedDate}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default RecentlyPublishedArticles;
