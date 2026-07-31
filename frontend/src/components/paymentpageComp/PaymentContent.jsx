import React from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiCheckCircle, FiInfo, FiLock } from 'react-icons/fi';
import { FaPaypal } from 'react-icons/fa';
import paypalSs2 from '../../assets/images/paypal-ss-2.jpg';

const paymentData = {
  header: {
    title: "Mode of Payment",
    subtitle: "Secure online payment options for publication processing fee (APC)."
  },
  feeInfo: {
    title: "Payment of Publication Fee",
    amount: "$60.00 USD",
    currency: "USD",
    paragraphs: [
      "If you have a credit card or PayPal account, we strongly encourage you to pay the fee through PayPal. PayPal enables users, whether or not they are PayPal members, to use all major credit cards, including Visa, Mastercard, Discover, and American Express. PayPal is fast, secure, and free.",
      "Processing Fee has to be paid only if your article gets accepted for publication. If you are unable to pay through PayPal, you can contact the editorial assistant at info@ijssahr.com for alternative methods like Bank Transfer / Wire Transfer, Western Union money transfer etc."
    ],
    contactEmail: "info@ijssahr.com"
  }
};

const PaymentContent = () => {
  return (
    <div className="w-full max-w-full overflow-hidden space-y-5">
      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-1"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {paymentData.header.title}
        </h2>
        <div className="w-12 h-1 bg-[#004bdd] rounded-full"></div>
      </motion.div>

      {/* Main Payment Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm space-y-4 sm:space-y-5"
      >
        {/* Title & Fee Amount Highlight Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">
              {paymentData.feeInfo.title}
            </h3>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FiLock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>256-Bit SSL Encrypted & Secure Payment</span>
            </p>
          </div>

          {/* Fee Amount Badge */}
          <div className="bg-[#f0f5ff] border border-blue-100 rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Fee:</span>
            <span className="text-xl sm:text-2xl font-black text-[#004bdd]">{paymentData.feeInfo.amount}</span>
          </div>
        </div>

        {/* Instructions Paragraphs */}
        <div className="space-y-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <p>{paymentData.feeInfo.paragraphs[0]}</p>
          <p>
            Processing Fee has to be paid only if your article gets accepted for publication. If you are unable to pay through PayPal, you can contact the editorial assistant at{" "}
            <a href={`mailto:${paymentData.feeInfo.contactEmail}`} className="text-[#004bdd] font-bold hover:underline">
              {paymentData.feeInfo.contactEmail}
            </a>{" "}
            for alternative methods like Bank Transfer / Wire Transfer, Western Union money transfer etc.
          </p>
        </div>

        {/* Payment Action Buttons / Gateways */}
        <div className="space-y-3 pt-1">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Select Payment Method
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* PayPal Option */}
            <motion.a
              href="https://www.paypal.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="bg-[#0070ba] hover:bg-[#005ea6] text-white rounded-xl p-3.5 sm:p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all group min-w-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <FaPaypal className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h5 className="font-bold text-sm sm:text-base text-white truncate">Check out with PayPal</h5>
                  <p className="text-[11px] sm:text-xs text-blue-100 truncate">Pay via PayPal Account or Balance</p>
                </div>
              </div>
              <FiCheckCircle className="w-4.5 h-4.5 text-blue-200 group-hover:text-white transition-colors shrink-0 ml-2" />
            </motion.a>

            {/* Debit or Credit Card Option */}
            <motion.a
              href="https://www.paypal.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="bg-[#2d3748] hover:bg-[#1a202c] text-white rounded-xl p-3.5 sm:p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all group min-w-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <FiCreditCard className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h5 className="font-bold text-sm sm:text-base text-white truncate">Debit or Credit Card</h5>
                  <p className="text-[11px] sm:text-xs text-gray-300 truncate">Visa, Mastercard, Amex, Discover</p>
                </div>
              </div>
              <FiCheckCircle className="w-4.5 h-4.5 text-gray-400 group-hover:text-white transition-colors shrink-0 ml-2" />
            </motion.a>
          </div>
        </div>

        {/* Accepted Payment Cards Banner with PayPal Image */}
        <div className="bg-[#f8fafc] border border-gray-100 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Accepted Payment Methods</span>
          <div className="bg-white border border-gray-200 rounded-lg p-1.5 shadow-2xs inline-block max-w-fit">
            <img 
              src={paypalSs2} 
              alt="PayPal Accepted Cards (VISA, Mastercard, AMEX, Discover, PayPal)" 
              className="h-9 sm:h-10 w-auto object-contain rounded"
            />
          </div>
        </div>

        {/* Alternative Methods Notice */}
        <div className="bg-[#f0f7ff] border border-blue-100 rounded-xl p-3.5 sm:p-4 flex items-start gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-[#004bdd] flex items-center justify-center shrink-0 mt-0.5">
            <FiInfo className="w-4 h-4" />
          </div>
          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed flex-1 min-w-0">
            <span className="font-bold text-gray-900 block mb-0.5">Need Alternative Payment Options?</span>
            <span>If you cannot pay using PayPal or Credit Card, you can request </span>
            <strong className="font-semibold text-gray-900">Bank Transfer / Wire Transfer</strong> or <strong className="font-semibold text-gray-900">Western Union</strong> details by emailing{" "}
            <a href={`mailto:${paymentData.feeInfo.contactEmail}`} className="text-[#004bdd] font-bold hover:underline whitespace-nowrap inline-block">
              {paymentData.feeInfo.contactEmail}
            </a>.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentContent;
