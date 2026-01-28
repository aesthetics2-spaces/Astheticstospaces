import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const OutOfCreditsModal = ({ isOpen, onClose, onReferFriend }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl p-6"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center pt-4">
                <div className="text-6xl mb-4">😕</div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  You&apos;re out of credits
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  You&apos;ve reached your daily message limit. Refer a friend to
                  earn more credits!
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={onReferFriend}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Refer a friend to earn more credits
                  </motion.button>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OutOfCreditsModal;
