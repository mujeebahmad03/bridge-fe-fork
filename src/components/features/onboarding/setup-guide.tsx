"use client";

import { useState } from "react";

import { Guides } from "./guides";
import { WelcomeDialog } from "./welcome-dialog";

export const SetupGuide = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const handleContinue = () => {
    setShowWelcomeModal(false);
  };

  return (
    <>
      <Guides />
      <WelcomeDialog
        showWelcomeModal={showWelcomeModal}
        setShowWelcomeModal={setShowWelcomeModal}
        handleContinue={handleContinue}
      />
    </>
  );
};
