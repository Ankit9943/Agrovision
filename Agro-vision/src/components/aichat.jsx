import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

const ENDPOINT = "https://agrovision-contributed.onrender.com/ai-chat";

function AiChat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMarkdown = (text) => {
    // Replace ** with proper markdown syntax
    text = text.replace(/\*\*/g, "_");
    // Ensure newlines are preserved
    return text.replace(/\\n/g, "\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("user_input", userMessage);

      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const aiResponse = JSON.parse(data).candidates[0].content.parts[0].text;
      const formattedResponse = formatMarkdown(aiResponse);

      setMessages((prev) => [
        ...prev,
        { type: "ai", content: formattedResponse },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "Sorry, I couldn't process your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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
                <ReactMarkdown
                  components={{
                    p: ({node, children}) => (
                      <p style={{marginBottom: '0.5rem'}}>{children}</p>
                    ),
                    ul: ({node, children}) => (
                      <ul style={{listStyleType: 'disc', marginLeft: '1rem', marginBottom: '0.5rem'}}>
                        {children}
                      </ul>
                    ),
                    ol: ({node, children}) => (
                      <ol style={{listStyleType: 'decimal', marginLeft: '1rem', marginBottom: '0.5rem'}}>
                        {children}
                      </ol>
                    ),
                    code: ({node, children}) => (
                      <code style={{
                        backgroundColor: '#f1f1f1',
                        padding: '0.1rem 0.3rem',
                        borderRadius: '0.2rem'
                      }}>
                        {children}
                      </code>
                    ),
                  }}
                >
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
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#89AC46]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-[#89AC46] text-white px-4 py-2 rounded-lg hover:bg-[#7a9b35] transition-colors
                            ${
                              isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
          >
            <IoSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AiChat;
