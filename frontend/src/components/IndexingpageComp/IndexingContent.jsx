import React from "react";
import googleScholar from "../../assets/images/Indexinglogos/googlescholar.jpg";
import researchBib from "../../assets/images/Indexinglogos/rbid.jpg";
import road from "../../assets/images/Indexinglogos/road-issn.png";
import indexCopernicus from "../../assets/images/Indexinglogos/ICI.png";
import euroPub from "../../assets/images/Indexinglogos/europub.jpg";

const IndexingContent = () => {
  // Dummy data representing future backend response
  const dummyIndexingData = {
    title: "Indexing",
    logos: [
      {
        id: 1,
        name: "Google Scholar",
        image: googleScholar,
        link: "https://scholar.google.com/citations?user=fNdaiNcAAAAJ&hl=en&authuser=7",
      },
      {
        id: 2,
        name: "ResearchBib",
        image: researchBib,
        link: "https://www.researchbib.com/view/issn/3139-5805",
      },
      {
        id: 3,
        name: "ROAD",
        image: road,
        link: "https://ijssahr.com/indexing.php",
      },
      {
        id: 4,
        name: "Index Copernicus",
        image: indexCopernicus,
        link: "https://journals.indexcopernicus.com/search/details?id=136682&lang=en",
      },
      {
        id: 5,
        name: "EuroPub",
        image: euroPub,
        link: "https://europub.co.uk/journals/international-journal-of-social-science-arts-and-humanities-research-J-34161",
      },
    ],
  };

  return (
    <div className="w-full animate-fade-in">
      {/* Main Container */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 p-5 md:p-8 lg:p-10 mb-6 transition-all duration-300">
        {/* Title Header */}
        <div className="border-b border-slate-100 pb-4 mb-8">
          <h2 className="text-[17px] md:text-[20px] font-bold text-[var(--heading)] m-0 relative inline-block group cursor-default">
            {dummyIndexingData.title}
            <span className="absolute -bottom-[17px] left-0 w-8 h-[3px] bg-[var(--primary)] rounded-full group-hover:w-full transition-all duration-500 ease-out"></span>
          </h2>
        </div>

        {/* Logos Grid */}
        <div className="flex flex-wrap lg:grid lg:grid-cols-5 justify-center items-center gap-y-8 gap-x-6 md:gap-x-8 md:gap-y-10 lg:gap-10 pb-4">
          {dummyIndexingData.logos.map((logo, index) => (
            <a 
              key={logo.id} 
              href={logo.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center group/logo hover:-translate-y-1 transition-transform duration-300 w-[42%] sm:w-[28%] lg:w-full"
            >
              <img 
                src={logo.image} 
                alt={logo.name} 
                className="max-w-full max-h-[45px] sm:max-h-[50px] lg:max-h-[60px] object-contain opacity-90 group-hover/logo:opacity-100 group-hover/logo:drop-shadow-md transition-all duration-300" 
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexingContent;
