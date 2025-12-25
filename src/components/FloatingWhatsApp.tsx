import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import whatsappIcon from "@/assets/whatsapp-floating.png";
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
                initial={{ opacity: 0, y: 24, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.9 }}
                whileHover={{
                  y: -4,
                  scale: 1.05,
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
                onClick={handleClick}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-md"
                aria-label="Chat via WhatsApp"
              >
                <img
                  src={whatsappIcon}
                  alt="WhatsApp"
                  className="w-full h-full object-contain"
                />
              </motion.button>
            </TooltipTrigger>

            <TooltipContent side="left">
              <p>Kirim Masukan</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </AnimatePresence>
  );
};
