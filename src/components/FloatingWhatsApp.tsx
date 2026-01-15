import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FloatingWhatsAppProps {
  phoneNumber: string;
  message: string;
}

export const FloatingWhatsApp = ({
  phoneNumber,
  message,
}: FloatingWhatsAppProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById("contact-section");

      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setIsVisible(rect.top < windowHeight && rect.bottom > 0);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const formattedPhone = phoneNumber.replace(/^0/, "62");
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${formattedPhone}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={handleClick}
                aria-label="Chat via WhatsApp"
                className="fixed bottom-6 right-6 z-50
                   w-14 h-14 md:w-16 md:h-16
                   rounded-full
                   bg-primary
                   flex items-center justify-center
                   shadow-xl
                   overflow-visible"
              >
                {/* WAVE 1 */}
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  initial={{ scale: 1, opacity: 0.9 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />

                {/* WAVE 2 (delay) */}
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  initial={{ scale: 1, opacity: 0.9 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.9,
                  }}
                />

                {/* ICON */}
                <FaWhatsapp className="relative w-7 h-7 md:w-11 md:h-11 text-white" />
              </motion.button>
            </TooltipTrigger>

            <TooltipContent
              side="left"
              className="bg-card/90 backdrop-blur-md border-border/50 text-foreground px-3 py-2 rounded-lg shadow-xl"
            >
              <p className="font-medium">Chat WhatsApp</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </AnimatePresence>
  );
};
