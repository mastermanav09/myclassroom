import React, { useState } from "react";

const UIContext = React.createContext();

export const UIContextProvider = (props) => {
  const [showClasses, setShowClasses] = useState(true);
  const [showCurriculum, setCurriculum] = useState(false);
  const [currentClsId, setCurrentClsId] = useState(null);

  const uiContext = {
    showClasses: showClasses,
    showCurriculum: showCurriculum,
    currentClassId:currentClsId,
    setCurrentClassId: (value) => setCurrentClsId(value),
    setShowCurriculum: (value) => setCurriculum(value),
    toggleShowClasses: (value) => setShowClasses(value),

  };

  return (
    <UIContext.Provider value={uiContext}>{props.children}</UIContext.Provider>
  );
};

export default UIContext;
