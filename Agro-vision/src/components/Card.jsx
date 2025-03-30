import { useState, useEffect } from "react";
import { IoRefresh } from "react-icons/io5";
import SensorChart from "./SensorChart";
import ReactMarkdown from "react-markdown";

const Card = ({
  flexdirection = "flex-row",
  greeting = false,
  heading = "Default Heading",
  warnings = [],
  summary = "", // New prop for summary
}) => {
  let dateTime = new Date();
  const [date] = useState(dateTime.toDateString());
  const [highlights, setHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formatMarkdown = (text) => {
    text = text.replace(/\\\*/g, "*");
    text = text.replace(/\\n/g, "\n");
    text = text.replace(/\\\\/g, "\\");
    return text;
  };

  const fetchHighlights = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(
        "https://agrovision-contributed.onrender.com/ai-highlight"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch highlights");
      }
      const data = await response.json();
      const aiResponse = JSON.parse(data).candidates[0].content.parts[0].text;
      const highlightArray = aiResponse
        .split("\n")
        .filter((item) => item.trim())
        .map((item) => formatMarkdown(item));
      setHighlights(highlightArray);
      setError(null);
    } catch (err) {
      console.error("Error fetching highlights:", err);
      setError("सुझाव लोड नहीं किए जा सके."); // Suggestions could not be loaded.
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHighlights();
  }, []);

  return (
    <div className="section flex justify-center px-4 py-6 min-h-[60vh] w-full sm:w-11/12 mt-6 rounded-2xl">
      <div
        className={`Card bg-white w-full flex flex-col md:flex-row ${
          flexdirection === "flex-row-reverse" ? "md:flex-row-reverse" : ""
        } shadow-lg rounded-2xl overflow-hidden`}
      >
        {/* Left: Greeting & Notifications */}
        <div className="greeting w-full md:w-1/3 p-4 flex flex-col">
          <div className="flex justify-between items-center">
            {greeting && (
              <p className="text-xs sm:text-sm md:text-base font-bold text-gray-600">
                {date}
              </p>
            )}
            <button
              onClick={fetchHighlights}
              disabled={isRefreshing}
              className={`p-2 rounded-ful transition-all ${
                isRefreshing ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Refresh recommendations"
            >
              <IoRefresh
                className={`w-5 h-5 text-gray-600 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold my-2">
            {heading}
          </h2>

          {/* New Summary Section */}
          {summary && (
            <p className="text-sm sm:text-base text-gray-700 my-2">{summary}</p>
          )}

          <hr className="border-gray-400 my-2" />

          {/* Notification List */}
          <div className="notification-card w-full max-h-[500px] overflow-y-auto rounded-2xl my-2 p-2 scrollbar-hide">
            {isLoading ? (
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : error ? (
              <p className="text-red-500 text-center p-2">{error}</p>
            ) : (
              <>
                {highlights.map((highlight, idx) => (
                  <div
                    key={`highlight-${idx}`}
                    className="bg-green-100 m-1 rounded-lg p-2 text-xs sm:text-sm md:text-base shadow-sm"
                  >
                    <span className="font-medium">{idx + 1}. </span>
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => <span {...props} />,
                        strong: ({ node, ...props }) => (
                          <span className="font-bold" {...props} />
                        ),
                        em: ({ node, ...props }) => (
                          <span className="italic" {...props} />
                        ),
                        code: ({ node, ...props }) => (
                          <code
                            className="bg-green-50 px-1 rounded"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {highlight}
                    </ReactMarkdown>
                  </div>
                ))}
                {warnings.map((warning, idx) => (
                  <p
                    className="bg-red-100 m-1 rounded-lg p-2 text-xs sm:text-sm md:text-base shadow-sm"
                    key={`warning-${idx}`}
                  >
                    {idx + 1}. {warning}
                  </p>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Right: Enlarged Chart Section */}
        <div className="chart w-full md:w-2/3 p-4 flex items-center justify-center bg-gray-100 flex-1 h-[250px] md:h-[400px] lg:h-[500px] min-h-[250px]">
          <SensorChart />
        </div>
      </div>
    </div>
  );
};

export default Card;
