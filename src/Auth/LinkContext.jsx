import React, { createContext, useContext, useState, useEffect } from 'react';

const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    const storedLink = localStorage.getItem("selectedLink");
    if (storedLink) {
      setSelectedLink(storedLink);
    }
  }, []);

  useEffect(() => {
    const updateTopOffset = () => {
      if (selectedLink) {
        const selectedLinkElement = document.getElementById(selectedLink);
        if (selectedLinkElement) {
          setTopOffset(selectedLinkElement.offsetTop);
        }
      }
    };

    updateTopOffset();

    window.addEventListener("resize", updateTopOffset);

    return () => {
      window.removeEventListener("resize", updateTopOffset);
    };
  }, [selectedLink]);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    localStorage.setItem("selectedLink", link);
  };

  return (
    <LinkContext.Provider value={{ selectedLink, handleLinkClick, topOffset }}>
      {children}
    </LinkContext.Provider>
  );
};

export const useLinkContext = () => useContext(LinkContext);
