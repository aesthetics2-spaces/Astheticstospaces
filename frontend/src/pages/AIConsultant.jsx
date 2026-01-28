import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import ChatHeader from "../components/ai-chat/ChatHeader";
import ChatMessages from "../components/ai-chat/ChatMessages";
import ChatInput from "../components/ai-chat/ChatInput";
import OutOfCreditsModal from "../components/ai-chat/OutOfCreditsModal";
import ChatHistory from "../components/ai-chat/ChatHistory";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

// Mock AI responses
const MOCK_RESPONSES = [
  "Great question! For a modern living room, I'd recommend starting with a neutral color palette—think soft grays, warm whites, or beige tones. These create a calming foundation that works with any accent color you choose later.",
  "When it comes to furniture placement, the golden rule is to create conversation areas. Place your sofa facing the focal point (like a TV or fireplace), and add accent chairs at angles to encourage interaction. Leave at least 18 inches of walking space around furniture.",
  "For lighting, layer three types: ambient (overhead), task (reading lamps), and accent (spotlights on art). This creates depth and makes the room feel more inviting. Consider dimmable options for flexibility.",
  "Storage is key in any room! Built-in shelves or floating cabinets can maximize space while keeping things organized. For small rooms, consider multi-functional furniture like ottomans with hidden storage.",
  "Color psychology matters! Blues and greens promote calm (perfect for bedrooms), while warm tones like oranges and reds energize (great for living areas). Start with one accent wall if you're unsure about committing to a full color scheme.",
];

const MAX_MESSAGES = 10;

const AIConsultant = () => {
  const { user, credits, setCredits } = useAuth(); // <-- get credits from context
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const streamingIntervalRef = useRef(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load message count from Supabase or localStorage fallback
  useEffect(() => {
    const loadMessageCount = async () => {
      const today = new Date().toDateString();
      const savedDate = localStorage.getItem("aiChatMessageDate");
      const savedCount = localStorage.getItem("aiChatMessageCount");

      if (savedDate === today && savedCount) {
        const count = parseInt(savedCount, 10);
        setMessageCount(count);
      } else {
        localStorage.setItem("aiChatMessageDate", today);
        localStorage.setItem("aiChatMessageCount", "0");
        setMessageCount(0);
      }
    };

    loadMessageCount();
  }, []);

  // Save chat to history
  const saveChatToHistory = useCallback((chatId, chatMessages) => {
    if (!chatMessages.length) return;
    const saved = localStorage.getItem("aiChatHistory");
    let history = saved ? JSON.parse(saved) : [];

    const chatTitle = chatMessages[0]?.text?.slice(0, 50) || "New Chat";
    const existingIndex = history.findIndex((chat) => chat.id === chatId);

    const chatData = {
      id: chatId,
      title: chatTitle,
      messages: chatMessages,
      timestamp: new Date().toISOString(),
    };

    if (existingIndex >= 0) history[existingIndex] = chatData;
    else history.unshift(chatData);

    history = history.slice(0, 50); // keep last 50 chats
    localStorage.setItem("aiChatHistory", JSON.stringify(history));
  }, []);

  // Streaming AI response
  const simulateStreaming = useCallback(
    (fullText) => {
      if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current);
      let currentIndex = 0;
      setStreamingText("");
      setIsStreaming(true);

      streamingIntervalRef.current = setInterval(() => {
        if (currentIndex < fullText.length) {
          setStreamingText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(streamingIntervalRef.current);
          streamingIntervalRef.current = null;
          setIsStreaming(false);
          setStreamingText("");

          const aiMessage = { text: fullText, isUser: false, id: Date.now() };
          setMessages((prevMessages) => {
            const updated = [...prevMessages, aiMessage];
            if (currentChatId) saveChatToHistory(currentChatId, updated);
            return updated;
          });
        }
      }, 20);
    },
    [currentChatId, saveChatToHistory]
  );

  // Send message handler
  const handleSend = useCallback(
    async (text) => {
      if (!user) return;

      if (credits <= 0 || messageCount >= MAX_MESSAGES) {
        setShowModal(true);
        return;
      }

      if (!currentChatId) setCurrentChatId(`chat-${Date.now()}`);

      // Add user message
      const userMessage = { text, isUser: true, id: Date.now() };
      setMessages((prev) => {
        const updated = [...prev, userMessage];
        if (currentChatId) saveChatToHistory(currentChatId, updated);
        return updated;
      });

      // Decrement credits in Supabase
      const newCredits = credits - 1;
      setCredits(newCredits); // update context
      setMessageCount((prev) => prev + 1);
      localStorage.setItem("aiChatMessageCount", (messageCount + 1).toString());

      // Update Supabase tables
      await supabase.from("user_credits").update({ credits: newCredits }).eq("user_id", user.id);
      await supabase.from("credit_transactions").insert([{ user_id: user.id, action: "ai_chat", credits: -1 }]);

      if (newCredits === 0) setTimeout(() => setShowModal(true), 500);

      // Simulate AI response
      const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      setTimeout(() => simulateStreaming(randomResponse), 800);
    },
    [credits, currentChatId, messageCount, user, setCredits, saveChatToHistory, simulateStreaming]
  );

  const handleNewChat = () => {
    if (currentChatId && messages.length) saveChatToHistory(currentChatId, messages);
    setCurrentChatId(null);
    setMessages([]);
    setStreamingText("");
    setIsStreaming(false);
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
    }
  };

  const handleSelectChat = (chatId) => {
    const saved = localStorage.getItem("aiChatHistory");
    if (!saved) return;
    const history = JSON.parse(saved);
    const chat = history.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChatId(chat.id);
      setMessages(chat.messages || []);
      setShowHistory(false);
    }
  };

  const handleDeleteChat = (chatId) => {
    if (currentChatId === chatId) handleNewChat();
  };

  const handleReferFriend = async () => {
    const newCredits = MAX_MESSAGES;
    setCredits(newCredits);
    setMessageCount(0);
    localStorage.setItem("aiChatMessageCount", "0");
    setShowModal(false);

    // Update Supabase credits
    if (user) {
      await supabase.from("user_credits").update({ credits: newCredits }).eq("user_id", user.id);
      await supabase.from("credit_transactions").insert([{ user_id: user.id, action: "referral_bonus", credits: newCredits }]);
    }
  };

  useEffect(() => {
    return () => {
      if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 md:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-4xl h-full md:h-[90vh] rounded-2xl md:rounded-3xl bg-card/80 backdrop-blur-xl border border-border shadow-2xl flex flex-col overflow-hidden relative"
      >
        <ChatHeader
          credits={credits}
          onNewChat={handleNewChat}
          onToggleHistory={() => setShowHistory(!showHistory)}
          isMobile={isMobile}
        />
        <ChatMessages
          messages={messages}
          isStreaming={isStreaming}
          streamingText={streamingText}
          isMobile={isMobile}
        />
        <ChatInput
          onSend={handleSend}
          disabled={isStreaming}
          credits={credits}
          isMobile={isMobile}
        />
      </motion.div>

      <ChatHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        currentChatId={currentChatId}
        isMobile={isMobile}
      />

      <OutOfCreditsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onReferFriend={handleReferFriend}
      />
    </div>
  );
};

export default AIConsultant;
