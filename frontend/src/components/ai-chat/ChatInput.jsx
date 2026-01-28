import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const ChatInput = ({ onSend, disabled, credits, isMobile }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, isMobile ? 80 : 120)}px`;
    }
  }, [input, isMobile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled && credits > 0) {
      onSend(input.trim());
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isLimitReached = credits === 0;

  return (
    <div className="border-t border-border p-3 md:p-4 md:px-6">
      {isLimitReached && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-destructive mb-2 text-center"
        >
          ⚠️ Daily message limit reached. Come back tomorrow!
        </motion.p>
      )}
      <form onSubmit={handleSubmit} className="flex items-end gap-2 md:gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isLimitReached
                ? "Daily limit reached"
                : "Ask about room design, colors, furniture..."
            }
            disabled={disabled || isLimitReached}
            rows={1}
            className="w-full px-3 md:px-4 py-2 md:py-3 pr-10 md:pr-12 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            style={{ 
              minHeight: isMobile ? "44px" : "48px", 
              maxHeight: isMobile ? "80px" : "120px" 
            }}
          />
        </div>
        <motion.button
          type="submit"
          disabled={!input.trim() || disabled || isLimitReached}
          whileHover={{ scale: disabled || isLimitReached ? 1 : 1.05 }}
          whileTap={{ scale: disabled || isLimitReached ? 1 : 0.95 }}
          className="p-2.5 md:p-3 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>
      </form>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        {isMobile ? "Enter to send" : "Press Enter to send, Shift+Enter for newline"}
      </p>
    </div>
  );
};

export default ChatInput;