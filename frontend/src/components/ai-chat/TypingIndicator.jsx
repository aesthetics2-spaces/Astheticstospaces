import React from "react";
import { motion } from "framer-motion";

const TypingIndicator = ({ isMobile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      className="flex justify-start mb-3 md:mb-4 px-3 md:px-4"
    >
      <div className="max-w-[calc(100%-50px)] md:max-w-[calc(100%-100px)] rounded-2xl px-3 md:px-4 py-2 md:py-3 bg-card border border-border shadow-sm">
        <div className="flex items-center gap-2">
          <span className="flex-shrink-0 text-base md:text-lg">🤖</span>
          <div className="flex gap-1.5 items-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-muted-foreground"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
            <span className="ml-2 text-xs text-muted-foreground">
              AI is typing...
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;