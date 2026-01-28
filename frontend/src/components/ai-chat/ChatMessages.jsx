import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

const ChatMessages = ({ messages, isStreaming, streamingText, isMobile }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const prevMessagesLengthRef = useRef(0);
  const prevIsStreamingRef = useRef(false);

  const checkIfNearBottom = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setIsNearBottom(distanceFromBottom < 100);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      checkIfNearBottom();
    };

    container.addEventListener("scroll", handleScroll);
    
    // Initial check
    checkIfNearBottom();
    
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll when new message arrives
  useEffect(() => {
    if (messages.length > 0 && isNearBottom) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages.length, isNearBottom]);

  // Handle streaming
  useEffect(() => {
    if (isStreaming && isNearBottom) {
      const scrollInterval = setInterval(() => {
        if (isStreaming && isNearBottom) {
          scrollToBottom();
        }
      }, 500);
      
      return () => clearInterval(scrollInterval);
    }
  }, [isStreaming, isNearBottom, streamingText]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto space-y-3 md:space-y-4 w-full"
      style={{ minWidth: 0 }} // Important for flex containers
    >
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full min-h-[200px] md:min-h-[300px] w-full">
          <div className="text-center max-w-md w-full px-4">
            <p className="text-muted-foreground mb-2">
              Start by asking about your room design
            </p>
            <p className="text-xs text-muted-foreground/60">
              Try: "How can I make my small living room feel bigger?"
            </p>
          </div>
        </div>
      )}

      {messages.map((msg, index) => (
        <ChatMessage
          key={`${msg.id || index}-${msg.text?.slice(0, 10)}`}
          message={msg.text}
          isUser={msg.isUser}
          index={index}
          isMobile={isMobile}
        />
      ))}

      {isStreaming && (
        <>
          {streamingText ? (
            <ChatMessage
              message={streamingText}
              isUser={false}
              index={messages.length}
              isStreaming={true}
              isMobile={isMobile}
            />
          ) : (
            <TypingIndicator isMobile={isMobile} />
          )}
        </>
      )}

      <div ref={messagesEndRef} className="h-4" />
    </div>
  );
};

export default ChatMessages;