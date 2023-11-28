/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback } from "react";
import "./GoogleTranslate.css"

const GoogleTranslate: React.FC = () => {
  const googleTranslateElementInit = useCallback(() => {
    new (window as any).google.translate.TranslateElement(
      { pageLanguage: "es", includedLanguages: "es,en,fr,ar,de" },
      "google_translate_element"
    );
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = googleTranslateElementInit;

    return () => {
      delete (window as any).googleTranslateElementInit;
    };
  }, [googleTranslateElementInit]);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;

