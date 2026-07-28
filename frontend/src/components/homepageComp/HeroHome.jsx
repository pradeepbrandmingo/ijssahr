import React from 'react';
import { FiGlobe } from 'react-icons/fi';
import { BsPeople } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';

const HeroHome = () => {
  return (
    <section className="relative w-full overflow-hidden mb-12 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] bg-[var(--primary-dark)]">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[70%] bg-blue-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[60%] bg-blue-800/20 blur-[80px] rounded-full"></div>
      </div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-6 md:p-8 lg:px-10 lg:py-8 gap-6 lg:gap-8">
        
        {/* Left Content */}
        <div className="flex-1 min-w-0 lg:min-w-[300px] flex flex-col items-start text-left w-full">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-bold uppercase text-[9px] md:text-[10px] tracking-[0.1em] text-blue-400">
              Peer-Reviewed
            </span>
            <span className="w-1 h-1 rounded-full bg-blue-400/70"></span>
            <span className="font-bold uppercase text-[9px] md:text-[10px] tracking-[0.1em] text-blue-400">
              Bimonthly
            </span>
            <span className="w-1 h-1 rounded-full bg-blue-400/70"></span>
            <span className="font-bold uppercase text-[9px] md:text-[10px] tracking-[0.1em] text-blue-400">
              Open Access
            </span>
          </div>
          
          <h2 className="font-bold text-white text-[24px] md:text-[28px] leading-snug tracking-wide mb-3">
            Advancing Research.<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Inspiring Knowledge.
          </h2>
          
          <p className="text-white/80 text-[13px] md:text-[15px] leading-relaxed max-w-xl">
            IJSSAHR is a platform for scholars, researchers, and practitioners to share and discover high-quality research across Social Sciences, Arts and Humanities.
          </p>
        </div>

        {/* Right Content (Stats/Features) */}
        <div className="flex-1 min-w-0 lg:min-w-auto flex flex-row items-start lg:items-center justify-between lg:justify-end gap-2 sm:gap-4 lg:gap-6 pt-4 lg:pt-0 w-full">
           
           {/* Stat 1 */}
           <div className="flex flex-col items-center text-center px-1 flex-1 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl mb-2 shadow-md bg-[var(--primary)] shrink-0">
                 <BsPeople className="text-sm sm:text-lg text-white" />
              </div>
              <h3 className="font-bold tracking-wide text-white text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] mb-0.5 whitespace-nowrap">2026</h3>
              <p className="font-medium text-white/60 text-[9px] sm:text-[10px] md:text-[11px] m-0 leading-tight whitespace-nowrap">Starting Year</p>
           </div>

           <div className="hidden lg:block w-px h-[40px] bg-white/15"></div>

           {/* Stat 2 */}
           <div className="flex flex-col items-center text-center px-1 flex-1 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl mb-2 shadow-md bg-[var(--primary)] shrink-0">
                 <HiOutlineDocumentText className="text-sm sm:text-lg text-white" />
              </div>
              <h3 className="font-bold tracking-wide text-white text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] mb-0.5 whitespace-nowrap">Bimonthly</h3>
              <p className="font-medium text-white/60 text-[9px] sm:text-[10px] md:text-[11px] m-0 leading-tight whitespace-nowrap">Publication Frequency</p>
           </div>

           <div className="hidden lg:block w-px h-[40px] bg-white/15"></div>

           {/* Stat 3 */}
           <div className="flex flex-col items-center text-center px-1 flex-1 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl mb-2 shadow-md bg-[var(--primary)] shrink-0">
                 <FiGlobe className="text-sm sm:text-lg text-white" />
              </div>
              <h3 className="font-bold tracking-wide text-white text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] mb-0.5 whitespace-nowrap">Open Access</h3>
              <p className="font-medium text-white/60 text-[9px] sm:text-[10px] md:text-[11px] m-0 leading-tight whitespace-nowrap">Global Reach</p>
           </div>
           
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
