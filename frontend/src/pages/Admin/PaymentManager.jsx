import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../../services/api";
import { formatFileUrl } from "../../utils/fileUrl";
import {
  FaSave,
  FaCheckCircle,
  FaFileUpload,
  FaFilePdf,
  FaCreditCard,
  FaPaypal,
  FaLock,
  FaExternalLinkAlt,
} from "react-icons/fa";

const defaultPaymentFormData = {
  header: {
    title: "Mode of Payment",
    subtitle:
      "Secure online payment options for publication processing fee (APC).",
  },
  feeInfo: {
    title: "Payment of Publication Fee",
    amount: "$60.00 USD",
    currency: "USD",
    paragraphs: [
      "If you have a credit card or PayPal account, we strongly encourage you to pay the fee through PayPal. PayPal enables users, whether or not they are PayPal members, to use all major credit cards, including Visa, Mastercard, Discover, and American Express. PayPal is fast, secure, and free.",
      "Processing Fee has to be paid only if your article gets accepted for publication. If you are unable to pay through PayPal, you can contact the editorial assistant at info@ijssahr.com for alternative methods like Bank Transfer / Wire Transfer, Western Union money transfer etc.",
    ],
    contactEmail: "info@ijssahr.com",
    paypalLink: "https://www.paypal.com/ncp/payment/G7WW5ZB5EWNQL",
    cardPayLink: "https://www.paypal.com/ncp/payment/G7WW5ZB5EWNQL",
  },
  copyrightForm: {
    title: "IJSSAHR Copyright Form PDF",
    pdfUrl: "",
  },
  alternativeNotice: {
    title: "Need Alternative Payment Options?",
    text:
      "If you cannot pay using PayPal or Credit Card, you can request Bank Transfer / Wire Transfer or Western Union details by emailing info@ijssahr.com.",
  },
};

const PaymentManager = () => {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState(defaultPaymentFormData);

  const { data: serverData } = useQuery({
    queryKey: ["admin-payment-info"],
    queryFn: async () => {
      const res = await API.get("/payment-info");
      return res.data?.data || defaultPaymentFormData;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (serverData) {
      setFormData(serverData);
    }
  }, [serverData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await API.put("/payment-info", formData);
      if (res.data?.data) {
        setFormData(res.data.data);
      }
      toast.success("Payment details & settings updated live successfully!");
      await queryClient.invalidateQueries({ queryKey: ["admin-payment-info"] });
      await queryClient.invalidateQueries({ queryKey: ["payment-info-public"] });
      await queryClient.invalidateQueries({ queryKey: ["sidebar-copyright-pdf"] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update payment info");
    } finally {
      setSaving(false);
    }
  };

  const handlePdfUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.warning("Please select a PDF file first.");
      return;
    }

    setUploadingPdf(true);
    const data = new FormData();
    data.append("pdfFile", selectedFile);
    data.append("title", "IJSSAHR Copyright Form PDF");

    try {
      const res = await API.post("/payment-info/upload-copyright-pdf", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Copyright Form PDF uploaded & published live successfully!");
      setSelectedFile(null);
      
      // Update form state with new uploaded PDF URL immediately
      if (res.data?.pdfUrl) {
        setFormData((prev) => ({
          ...prev,
          copyrightForm: {
            ...prev?.copyrightForm,
            pdfUrl: res.data.pdfUrl,
          },
        }));
      }

      // Invalidate queries so TanStack query cache and Sidebar URL update
      queryClient.invalidateQueries({ queryKey: ["admin-payment-info"] });
      queryClient.invalidateQueries({ queryKey: ["payment-info-public"] });
      queryClient.invalidateQueries({ queryKey: ["sidebar-copyright-pdf"] });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to upload Copyright Form PDF"
      );
    } finally {
      setUploadingPdf(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5 text-slate-900 font-sans w-full"
    >
      {/* Page Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            Mode of Payment & Copyright PDF Manager
          </h1>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            SuperAdmin Control: Edit Payment Fee ($60 USD), PayPal & Card links, and Push New Copyright Form PDF.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
        >
          <FaSave /> {saving ? "Saving Changes..." : "Save Live Settings"}
        </button>
      </div>

      {/* SECTION A: Upload Copyright Form PDF */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <FaFilePdf className="text-rose-600 text-sm" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              1. Upload New Copyright Form PDF (Push from Backend)
            </h3>
          </div>
          {formData.copyrightForm?.pdfUrl && (
            <a
              href={formatFileUrl(formData.copyrightForm.pdfUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              View Active PDF <FaExternalLinkAlt className="text-[10px]" />
            </a>
          )}
        </div>

        <form onSubmit={handlePdfUpload} className="space-y-3">
          <div>
            <label className="block mb-1.5 font-semibold text-slate-700 text-xs">
              Select Copyright PDF File (PDF format, max 25MB):
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 text-xs cursor-pointer file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500 font-normal">
              Active PDF File:{" "}
              <strong className="text-slate-800">
                {formData.copyrightForm?.pdfUrl || "Default fallback PDF"}
              </strong>
            </span>
            <button
              type="submit"
              disabled={uploadingPdf || !selectedFile}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-md shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <FaFileUpload />{" "}
              {uploadingPdf ? "Uploading PDF..." : "Upload & Publish PDF"}
            </button>
          </div>
        </form>
      </div>

      {/* SECTION B: Payment Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-5 text-xs font-normal">
        {/* 2. Main Header & Fee Highlight */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            2. Page Header & Fee Highlight Box
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Page Header Title:
              </label>
              <input
                type="text"
                value={formData.header?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    header: { ...formData.header, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Page Subtitle:
              </label>
              <input
                type="text"
                value={formData.header?.subtitle || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    header: { ...formData.header, subtitle: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-3">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Publication Fee Section Title:
              </label>
              <input
                type="text"
                value={formData.feeInfo?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeInfo: { ...formData.feeInfo, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Fee Amount Badge Text (e.g. $60.00 USD):
              </label>
              <input
                type="text"
                value={formData.feeInfo?.amount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeInfo: { ...formData.feeInfo, amount: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs font-bold text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* 3. Payment Gateway Links & Contact Email */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FaPaypal className="text-blue-600 text-sm" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              3. Gateway Redirect URLs & Email
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                PayPal Checkout URL:
              </label>
              <input
                type="text"
                value={formData.feeInfo?.paypalLink || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeInfo: { ...formData.feeInfo, paypalLink: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Debit/Credit Card Pay URL:
              </label>
              <input
                type="text"
                value={formData.feeInfo?.cardPayLink || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeInfo: { ...formData.feeInfo, cardPayLink: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Support / Enquiries Email:
              </label>
              <input
                type="email"
                value={formData.feeInfo?.contactEmail || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeInfo: {
                      ...formData.feeInfo,
                      contactEmail: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>
          </div>
        </div>

        {/* 4. Payment Paragraphs & Alternative Notice */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            4. Instructions Paragraphs & Alternative Options Notice
          </h3>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Paragraph 1 (PayPal & Credit Card description):
            </label>
            <textarea
              rows="3"
              value={formData.feeInfo?.paragraphs?.[0] || ""}
              onChange={(e) => {
                const updated = [...(formData.feeInfo?.paragraphs || [])];
                updated[0] = e.target.value;
                setFormData({
                  ...formData,
                  feeInfo: { ...formData.feeInfo, paragraphs: updated },
                });
              }}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Paragraph 2 (Bank Transfer & Western Union notice):
            </label>
            <textarea
              rows="3"
              value={formData.feeInfo?.paragraphs?.[1] || ""}
              onChange={(e) => {
                const updated = [...(formData.feeInfo?.paragraphs || [])];
                updated[1] = e.target.value;
                setFormData({
                  ...formData,
                  feeInfo: { ...formData.feeInfo, paragraphs: updated },
                });
              }}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Alternative Payment Notice Text:
            </label>
            <textarea
              rows="2"
              value={formData.alternativeNotice?.text || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  alternativeNotice: {
                    ...formData.alternativeNotice,
                    text: e.target.value,
                  },
                })
              }
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 text-xs"
          >
            <FaSave className="text-xs" />{" "}
            {saving ? "Saving Changes..." : "Save & Publish Payment Info"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PaymentManager;
