import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FiCreditCard, FiCheckCircle, FiInfo, FiLock } from "react-icons/fi";
import { FaPaypal } from "react-icons/fa";
import paypalSs2 from "../../assets/images/paypal-ss-2.jpg";
import API from "../../services/api";

const defaultPaymentData = {
  header: {
    title: "Mode of Payment",
    subtitle: "Secure online payment options for publication processing fee (APC).",
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
  alternativeNotice: {
    title: "Need Alternative Payment Options?",
    text:
      "If you cannot pay using PayPal or Credit Card, you can request Bank Transfer / Wire Transfer or Western Union details by emailing info@ijssahr.com.",
  },
};

const PaymentContent = () => {
  const { data: paymentData } = useQuery({
    queryKey: ["payment-info-public"],
    queryFn: async () => {
      const res = await API.get("/payment-info");
      return res.data?.data || defaultPaymentData;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const activeData = paymentData || defaultPaymentData;
  const feeInfo = activeData.feeInfo || defaultPaymentData.feeInfo;
  const header = activeData.header || defaultPaymentData.header;
  const alternativeNotice =
    activeData.alternativeNotice || defaultPaymentData.alternativeNotice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-full overflow-hidden space-y-3"
    >
      {/* Top Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-[#0b1340] mb-0.5">
          {header.title}
        </h1>
        <p className="text-slate-500 text-xs font-normal">
          {header.subtitle || "Secure online payment options for publication processing fee (APC)."}
        </p>
      </div>

      {/* Main Payment Card */}
      <div className="bg-white border border-slate-200 rounded-md p-3.5 sm:p-4 shadow-2xs space-y-3.5">
        {/* Title & Fee Amount Highlight Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm sm:text-[15px] font-bold text-[#0b1340] mb-0.5">
              {feeInfo.title}
            </h3>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 font-normal">
              <FiLock className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>256-Bit SSL Encrypted & Secure Payment</span>
            </p>
          </div>

          {/* Fee Amount Badge */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-md px-3 py-1.5 flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Fee:
            </span>
            <span className="text-base sm:text-lg font-bold text-[#004bdd]">
              {feeInfo.amount}
            </span>
          </div>
        </div>

        {/* Instructions Paragraphs */}
        <div className="space-y-2">
          {feeInfo.paragraphs?.map((paragraph, idx) => (
            <p key={idx} className="text-[11.5px] sm:text-xs text-slate-600 font-normal leading-relaxed m-0">
              {paragraph}
            </p>
          )) || (
            <p className="text-[11.5px] sm:text-xs text-slate-600 font-normal leading-relaxed m-0">
              If you have a credit card or PayPal account, we strongly encourage you to pay the fee through PayPal.
            </p>
          )}
        </div>

        {/* Payment Action Buttons / Gateways */}
        <div className="space-y-2 pt-0.5">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Select Payment Method
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* PayPal Option */}
            <motion.a
              href={feeInfo.paypalLink || "https://www.paypal.com"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="bg-[#0070ba] hover:bg-[#005ea6] text-white rounded-md p-2.5 sm:p-3 flex items-center justify-between shadow-2xs transition-all group min-w-0"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7.5 h-7.5 rounded bg-white/15 flex items-center justify-center shrink-0">
                  <FaPaypal className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <h5 className="font-bold text-xs text-white truncate">
                    Check out with PayPal
                  </h5>
                  <p className="text-[10.5px] text-blue-100 truncate font-normal">
                    Pay via PayPal Account or Balance
                  </p>
                </div>
              </div>
              <FiCheckCircle className="w-3.5 h-3.5 text-blue-200 group-hover:text-white transition-colors shrink-0 ml-1.5" />
            </motion.a>

            {/* Debit or Credit Card Option */}
            <motion.a
              href={feeInfo.cardPayLink || "https://www.paypal.com"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="bg-[#2d3748] hover:bg-[#1a202c] text-white rounded-md p-2.5 sm:p-3 flex items-center justify-between shadow-2xs transition-all group min-w-0"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7.5 h-7.5 rounded bg-white/15 flex items-center justify-center shrink-0">
                  <FiCreditCard className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <h5 className="font-bold text-xs text-white truncate">
                    Debit or Credit Card
                  </h5>
                  <p className="text-[10.5px] text-slate-300 truncate font-normal">
                    Visa, Mastercard, Amex, Discover
                  </p>
                </div>
              </div>
              <FiCheckCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors shrink-0 ml-1.5" />
            </motion.a>
          </div>
        </div>

        {/* Accepted Payment Cards Banner with PayPal Image */}
        <div className="bg-slate-50/70 border border-slate-100 rounded-md p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            Accepted Payment Methods
          </span>
          <div className="bg-white border border-slate-200 rounded p-1 shadow-2xs inline-block max-w-fit">
            <img
              src={paypalSs2}
              alt="PayPal Accepted Cards (VISA, Mastercard, AMEX, Discover, PayPal)"
              className="h-7 sm:h-8 w-auto object-contain rounded"
            />
          </div>
        </div>

        {/* Alternative Methods Notice */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-md p-2.5 sm:p-3 flex items-start gap-2.5 shadow-2xs">
          <div className="w-6.5 h-6.5 rounded-full bg-blue-100 text-[#004bdd] flex items-center justify-center shrink-0 mt-0.5">
            <FiInfo className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs text-slate-700 leading-relaxed flex-1 min-w-0 font-normal">
            <span className="font-semibold text-slate-900 block mb-0.5">
              {alternativeNotice.title || "Need Alternative Payment Options?"}
            </span>
            <span>{alternativeNotice.text} </span>
            <a
              href={`mailto:${feeInfo.contactEmail}`}
              className="text-[#004bdd] font-semibold hover:underline whitespace-nowrap inline-block"
            >
              {feeInfo.contactEmail}
            </a>
            .
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentContent;
