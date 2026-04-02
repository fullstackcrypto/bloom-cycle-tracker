/*
 * Bloom — PWA Install Prompt
 * Shows a subtle banner encouraging users to install the app on their home screen.
 * Detects iOS Safari vs Android Chrome and shows appropriate instructions.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Don't show if already installed as PWA
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    // Don't show if user dismissed it before
    if (localStorage.getItem("bloom_install_dismissed")) return;

    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    if (ios) {
      // On iOS, show after a short delay
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }

    // On Android/Chrome, listen for the beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShow(true), 2000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
    setShow(false);
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("bloom_install_dismissed", "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mx-5 mb-3 bg-white rounded-2xl p-4 shadow-sm border border-[#F0E8E3]"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">📲</span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-[#4A3F3A]">
                Add Bloom to your home screen
              </p>
              {isIOS ? (
                <p className="text-[12px] text-[#A99E98] mt-1 leading-relaxed">
                  Tap the <span className="inline-block text-[14px] align-middle">⎙</span> share button, then <strong>"Add to Home Screen"</strong>
                </p>
              ) : (
                <p className="text-[12px] text-[#A99E98] mt-1 leading-relaxed">
                  Install Bloom for quick access — just like a native app
                </p>
              )}
            </div>
            <button
              onClick={handleDismiss}
              className="text-[#C4BAB2] text-lg leading-none hover:text-[#A99E98] transition-colors p-1"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstall}
              className="w-full mt-3 py-2.5 bg-[#D94F5C] text-white rounded-xl text-[13px] font-bold hover:bg-[#C44350] active:scale-[0.98] transition-all"
            >
              Install App
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
