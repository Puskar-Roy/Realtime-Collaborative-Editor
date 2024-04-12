import { useState } from "react";
import { LANGUAGE_VERSIONS } from '../constants/data'
const languages = Object.entries(LANGUAGE_VERSIONS);

const ACTIVE_COLOR = "blue-400";

const LanguageSelector = ({
  language,
  onSelect,
}: {
  language: string;
  onSelect: (selectedLanguage: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-2 mb-4">
      <p className="mb-2 text-lg font-semibold">Language:</p>
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white  rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {language}
          Curve Down
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 origin-top-right bg-gray-900 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {languages.map(([lang, version]) => (
                <button
                  key={lang}
                  className={`${
                    lang === language
                      ? `text-${ACTIVE_COLOR} bg-gray-900`
                      : "text-white"
                  } group flex items-center w-full px-4 py-2 text-sm`}
                  onClick={() => {
                    onSelect(lang);
                    setIsOpen(false);
                  }}
                >
                  {lang}
                  <span className="ml-auto text-sm text-gray-600">
                    ({version})
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
