import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, X, MessageSquare, Trash2 } from "lucide-react";

const ChatHistory = ({ isOpen, onClose, onSelectChat, onDeleteChat, currentChatId, isMobile }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    loadChatHistory();
  }, [isOpen]);

  const loadChatHistory = () => {
    const saved = localStorage.getItem("aiChatHistory");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChats(parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      } catch (e) {
        console.error("Error loading chat history:", e);
      }
    }
  };

  const handleDelete = (e, chatId) => {
    e.stopPropagation();
    const updated = chats.filter((chat) => chat.id !== chatId);
    localStorage.setItem("aiChatHistory", JSON.stringify(updated));
    setChats(updated);
    if (onDeleteChat) onDeleteChat(chatId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: isMobile ? "-100%" : "-320px" }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? "-100%" : "-320px" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed left-0 top-0 h-full ${isMobile ? 'w-full max-w-sm' : 'w-80'} bg-card/95 backdrop-blur-xl border-r border-border shadow-2xl z-50 flex flex-col`}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">
                  Chat History
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {chats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No chat history yet
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Start a new conversation to see it here
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {chats.map((chat) => (
                    <motion.button
                      key={chat.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => onSelectChat(chat.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        currentChatId === chat.id
                          ? "bg-primary/10 border-primary/30"
                          : "bg-accent/50 border-border hover:bg-accent"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-1">
                            {chat.title || "New Chat"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(chat.timestamp).toLocaleDateString()} • 
                            {new Date(chat.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleDelete(e, chat.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatHistory;