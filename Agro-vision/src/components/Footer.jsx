import { React, useState } from "react";
import {
  FaExternalLinkAlt,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

const members = [
  {
    name: "Ankit Sharma",
    linkedin: "https://www.linkedin.com/in/ankitsh1/",
  },
  {
    name: "Anshuman Mishra",
    linkedin: "https://www.linkedin.com/in/anshuman-mishra-03329925a/",
  },
  { name: "Aarav Kumar", linkedin: "https://www.linkedin.com/in/kumaraarav" },
];

function Footer() {
  const email = "manshuman816@gmail.com";
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };
  return (
    <footer className="w-full bg-gray-900 text-white text-center py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Detailed Presentation */}
        <div className="flex justify-center gap-3 items-center mb-5">
          <h2 className="text-lg font-semibold">Detailed Presentation</h2>
          <a
            href="https://drive.google.com/file/d/1XKOB_e7vrs3DqoDeBEuWocqdiEZ9AQqP/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition-transform transform hover:scale-110"
          >
            <FaExternalLinkAlt className="w-5 h-5" />
          </a>
        </div>

        <div>
          <h1 className="text-xl font-bold mb-4">Meet the Team</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {members.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <h2 className="text-lg">{member.name}</h2>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 transition-transform transform hover:scale-110"
                >
                  <FaLinkedin className="w-6 h-6 mt-1" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full border-t border-gray-600 my-5"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400  ">
          <div>
            <a
              href="mailto:contact@agrovision.com"
              className={`text-xl pb-4 cursor-pointer transition-colors  duration-300 ${
                isCopied ? "text-green-500" : "text-blue-400 hover:text-white"
              }`}
              onClick={handleClick}
            >
              {email}
            </a>
          </div>
          <p className="text-sm pt-3">
            &copy; {new Date().getFullYear()} Agro Vision. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
