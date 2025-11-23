import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { IoSend } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

const ENDPOINT = "https://agrovision-contributed.onrender.com/ai-chat";

function AiChat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const formatMarkdown = useCallback((text) => {
    // Replace ** with proper markdown syntax
    text = text.replace(/\*\*/g, "_");
    // Ensure newlines are preserved
    return text.replace(/\\n/g, "\n");
  }, []);
  
  // Memoize markdown components to avoid recreation on each render
  const markdownComponents = useMemo(() => ({
    p: ({ children }) => (
      <p style={{ marginBottom: "0.5rem" }}>{children}</p>
    ),
    ul: ({ children }) => (
      <ul
        style={{
          listStyleType: "disc",
          marginLeft: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        style={{
          listStyleType: "decimal",
          marginLeft: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        {children}
      </ol>
    ),
    code: ({ children }) => (
      <code
        style={{
          backgroundColor: "#f1f1f1",
          padding: "0.1rem 0.3rem",
          borderRadius: "0.2rem",
        }}
      >
        {children}
      </code>
    ),
  }), []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);
    setInputMessage("");
    setIsLoading(true);
    
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();

    try {
      const formData = new FormData();
      formData.append("user_input", userMessage);

      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: formData,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = JSON.parse(data).candidates[0].content.parts[0].text;
      const formattedResponse = formatMarkdown(aiResponse);

      setMessages((prev) => [
        ...prev,
        { type: "ai", content: formattedResponse },
      ]);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: "Sorry, I couldn't process your request. Please try again.",
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading, formatMarkdown]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto h-[600px] bg-white rounded-xl shadow-lg flex flex-col">
      {/* Header */}
      <div className="bg-[#89AC46] text-white px-6 py-4 rounded-t-xl">
        <h2 className="text-xl font-semibold">Ask Computer Ji</h2>
        <p className="text-sm opacity-80">
          Ask your Computer Ji, how you farm is doing?
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            Start a conversation with the AI assistant
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.type === "user"
                  ? "bg-[#89AC46] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.type === "ai" ? (
                <ReactMarkdown components={markdownComponents}>
                  {message.content}
                </ReactMarkdown>
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 p-4 bg-white rounded-b-xl"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="md:flex-1 border border-gray-300 rounded-lg px-1 md:px-4 py-2 focus:outline-none focus:border-[#89AC46]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-[#89AC46] text-white px-4 py-2 rounded-lg hover:bg-[#7a9b35] transition-colors
                            ${
                              isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
          >
            <IoSend size={15} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AiChat;
