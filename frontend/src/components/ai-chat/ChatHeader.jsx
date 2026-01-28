import React from "react";
import { motion } from "framer-motion";
import { Plus, History } from "lucide-react";

const ChatHeader = ({ credits, onNewChat, onToggleHistory, isMobile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 md:px-6 md:py-4 border-b border-border"
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">
            A2S AI Interior Consultant
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
            Ask anything about your room
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        {!isMobile && (
          <motion.button
            onClick={onNewChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>New Chat</span>
          </motion.button>
        )}
        {isMobile && (
          <motion.button
            onClick={onNewChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-primary text-primary-foreground"
            aria-label="New Chat"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        )}
        <motion.button
          onClick={onToggleHistory}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-xl border border-border text-muted-foreground hover:bg-accent transition-colors"
          aria-label="Chat history"
        >
          <History className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-accent border ${credits > 3 ? 'border-green-200 dark:border-green-800' : credits > 0 ? 'border-amber-200 dark:border-amber-800' : 'border-destructive/20'}`}
        >
          <span className="text-base md:text-lg">🪙</span>
          <span className={`text-xs md:text-sm font-semibold ${credits > 3 ? 'text-green-700 dark:text-green-300' : credits > 0 ? 'text-amber-700 dark:text-amber-300' : 'text-destructive'}`}>
            {credits} {isMobile ? '' : 'credits left'}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatHeader;