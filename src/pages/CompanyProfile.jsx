
import { useState } from "react";

import {
     ArrowUpRight,
     Download,
     FileText,
     Maximize2,
     Building2,
     Sparkles,
     LoaderCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./CompanyProfile.css";

// ========================================
// PDF IMPORT
// File location: src/assets/gsPdf.pdf
// ========================================

import gsPdf from "../assets/gsPdf.pdf";

const PROFILE_PDF = gsPdf;

const CompanyProfile = () => {
     const navigate = useNavigate();

     // PDF Loading State
     const [pdfLoading, setPdfLoading] = useState(true);
     const [pdfError, setPdfError] = useState(false);

     // PDF Fullscreen
     const handleFullscreen = () => {
          const viewer = document.getElementById("gs-profile-viewer");

          if (viewer?.requestFullscreen) {
               viewer.requestFullscreen();
          }
     };

     return (
          <main className="gs-company-profile">

               {/* =====================================
          TOP HERO
      ===================================== */}

               <section className="gs-profile-hero">
                    <div className="gs-profile-hero-overlay">

                         <span className="gs-profile-hero-label">
                              GAMMASOFT
                         </span>

                         <h1>
                              Company <span>Profile</span>
                         </h1>

                         <p>
                              Discover our company, capabilities, expertise and
                              commitment to delivering innovative digital solutions.
                         </p>
                         <button
                              className="gs-profile-back-btn"
                              onClick={() => navigate("/about")}
                         >
                              ← Back to About
                         </button>

                    </div>
               </section>


               {/* =====================================
          PROFILE CONTENT + PDF VIEWER
      ===================================== */}

               <section className="gs-profile-main">
                    <div className="gs-profile-container">

                         {/* LEFT CONTENT - STICKY */}

                         <div className="gs-profile-info">

                              <span className="gs-profile-label">
                                   <Sparkles size={14} />
                                   GET TO KNOW US
                              </span>

                              <h2>
                                   Discover
                                   <span> GammaSoft.</span>
                              </h2>

                              <p className="gs-profile-description">
                                   Explore the GammaSoft company profile and learn more
                                   about our vision, expertise, services, projects and
                                   commitment to technology-driven solutions.
                              </p>


                              {/* WHO WE ARE */}

                              <div className="gs-profile-info-card">
                                   <Building2 size={24} />

                                   <h3>Who We Are</h3>

                                   <p>
                                        GammaSoft is dedicated to delivering modern software
                                        solutions through innovation, technology and
                                        professional expertise.
                                   </p>
                              </div>


                              {/* WHAT YOU WILL DISCOVER */}

                              <div className="gs-profile-info-card">
                                   <Sparkles size={24} />

                                   <h3>What You Will Discover</h3>

                                   <ul>
                                        <li>Company Overview</li>
                                        <li>Our Vision & Mission</li>
                                        <li>Services & Solutions</li>
                                        <li>Projects & Expertise</li>
                                        <li>Our Team & Capabilities</li>
                                   </ul>
                              </div>


                              {/* DOWNLOAD BUTTON */}

                              <a
                                   href={PROFILE_PDF}
                                   download="GammaSoft-Company-Profile.pdf"
                                   className="gs-profile-download-btn"
                              >
                                   <Download size={17} />
                                   Download Company Profile
                                   <ArrowUpRight size={17} />
                              </a>

                         </div>


                         {/* =====================================
              RIGHT PDF VIEWER
          ===================================== */}

                         <div className="gs-profile-preview">

                              {/* PDF HEADER */}

                              <div className="gs-profile-viewer-header">

                                   <div className="gs-profile-file-info">

                                        <div className="gs-profile-pdf-icon">
                                             <FileText size={21} />
                                        </div>

                                        <div>
                                             <h3>GammaSoft Company Profile</h3>
                                             <p>Official Company Document</p>
                                        </div>

                                   </div>


                                   {/* VIEWER ACTIONS */}

                                   <div className="gs-profile-viewer-actions">

                                        <a
                                             href={PROFILE_PDF}
                                             download="GammaSoft-Company-Profile.pdf"
                                             title="Download PDF"
                                        >
                                             <Download size={15} />
                                             <span>Download PDF</span>
                                        </a>

                                        <button
                                             type="button"
                                             onClick={handleFullscreen}
                                             title="Fullscreen"
                                        >
                                             <Maximize2 size={15} />
                                             <span>Fullscreen</span>
                                        </button>

                                   </div>

                              </div>


                              {/* PDF PREVIEW */}

                              <div
                                   className="gs-profile-viewer"
                                   id="gs-profile-viewer"
                              >

                                   {/* PDF LOADING ANIMATION */}

                                   {pdfLoading && !pdfError && (
                                        <div className="gs-profile-pdf-loading">
                                             <div className="gs-profile-loader-icon">
                                                  <LoaderCircle size={38} />
                                             </div>

                                             <h3>Loading Company Profile</h3>

                                             <p>
                                                  Please wait while we prepare your document...
                                             </p>

                                             <div className="gs-profile-loader-bar">
                                                  <span></span>
                                             </div>
                                        </div>
                                   )}

                                   {/* PDF ERROR */}

                                   {pdfError && (
                                        <div className="gs-profile-pdf-error">
                                             <FileText size={35} />
                                             <h3>Unable to Preview PDF</h3>
                                             <p>
                                                  Please download the document to view it.
                                             </p>
                                        </div>
                                   )}

                                   <iframe
                                        src={`${PROFILE_PDF}#toolbar=1&navpanes=0&view=FitH`}
                                        title="GammaSoft Company Profile Preview"
                                        onLoad={() => {
                                             setPdfLoading(false);
                                             setPdfError(false);
                                        }}
                                        onError={() => {
                                             setPdfLoading(false);
                                             setPdfError(true);
                                        }}
                                   />

                              </div>


                              {/* PDF FOOTER */}

                              <div className="gs-profile-viewer-footer">

                                   <span>
                                        <FileText size={14} />
                                        PDF Document
                                   </span>

                                   <a
                                        href={PROFILE_PDF}
                                        target="_blank"
                                        rel="noreferrer"
                                   >
                                        Open in New Tab
                                        <ArrowUpRight size={14} />
                                   </a>

                              </div>

                         </div>

                    </div>
               </section>


               {/* =====================================
          BOTTOM CTA
      ===================================== */}

               <section className="gs-profile-bottom">

                    <div className="gs-profile-container">

                         <div>
                              <span>LET'S WORK TOGETHER</span>

                              <h2>
                                   Have a Project in Mind?
                                   <strong> Let's Create Something Great.</strong>
                              </h2>
                         </div>

                         <button
                              type="button"
                              onClick={() => navigate("/#contact")}
                         >
                              Contact Our Team
                              <ArrowUpRight size={18} />
                         </button>

                    </div>

               </section>

          </main>
     );
};

export default CompanyProfile;
