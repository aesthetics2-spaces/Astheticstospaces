import React from "react";
import { motion } from "framer-motion";

const ChatMessage = ({ message, isUser, index, isStreaming = false, isMobile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: isUser ? 30 : -30, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.03,
      }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3 md:mb-4 px-3 md:px-4`}
    >
      <motion.div
        initial={{ filter: "blur(4px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 0.3, delay: index * 0.03 + 0.1 }}
        className={`max-w-[calc(100%-50px)] md:max-w-[calc(100%-100px)] rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
          isUser
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
            : "bg-card text-card-foreground border border-border shadow-sm"
        }`}
        style={{ 
          wordBreak: "break-word",
          overflowWrap: "break-word"
        }}
      >
        {/* AI Message */}
        {!isUser && (
          <div className="flex items-start gap-2">
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.03 + 0.2,
              }}
              className="flex-shrink-0 text-base md:text-lg"
            >
              🤖
            </motion.span>
            <div className="flex-1 min-w-0">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 + 0.3 }}
                className="text-sm leading-relaxed whitespace-pre-wrap break-words"
              >
                {message}
                {isStreaming && (
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-block w-2 h-4 bg-current ml-1 align-middle"
                  />
                )}
              </motion.p>
            </div>
          </div>
        )}
        
        {/* User Message */}
        {isUser && (
          <div className="flex items-start justify-end">
            <div className="flex-1 min-w-0">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 + 0.2 }}
                className="text-sm leading-relaxed whitespace-pre-wrap break-words text-right"
              >
                {message}
              </motion.p>
            </div>
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.03 + 0.2,
              }}
              className="flex-shrink-0 text-base md:text-lg ml-2"
            >
              👤
            </motion.span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChatMessage;