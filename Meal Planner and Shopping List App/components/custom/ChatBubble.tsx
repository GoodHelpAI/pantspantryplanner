import React, { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Face Icon Component using a placeholder
const FaceIcon = () => (
    <ImageWithFallback
      src="https://via.placeholder.com/56"
      alt="Face"
      className="w-full h-full object-cover rounded-full"
    />
  );

interface ChatBubbleProps {
    compliments: string[];
}

const ChatBubble = ({ compliments }: ChatBubbleProps) => {
    const [showChatBubble, setShowChatBubble] = useState(false);
    const [currentCompliment, setCurrentCompliment] = useState("");
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [isFaceClicked, setIsFaceClicked] = useState(false);
    const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

    const getRandomCompliment = () => {
        const randomIndex = Math.floor(Math.random() * compliments.length);
        return compliments[randomIndex];
    };

    const handleFaceClick = () => {
        setIsFaceClicked(true);
        setTimeout(() => setIsFaceClicked(false), 300);

        if (autoCloseTimerRef.current) {
            clearTimeout(autoCloseTimerRef.current);
        }

        setCurrentCompliment(getRandomCompliment());
        setShowChatBubble(true);
        setIsAnimatingOut(false);

        autoCloseTimerRef.current = setTimeout(() => {
            setIsAnimatingOut(true);
            setTimeout(() => {
                setShowChatBubble(false);
                setIsAnimatingOut(false);
            }, 300);
        }, 5000); // Increased time to 5 seconds
    };

    const handleBubbleClick = () => {
        if (autoCloseTimerRef.current) {
            clearTimeout(autoCloseTimerRef.current);
        }

        setIsAnimatingOut(true);
        setTimeout(() => {
            setShowChatBubble(false);
            setIsAnimatingOut(false);
        }, 300);
    };

    const handleChatClose = () => {
        setShowChatBubble(false);
    };

    useEffect(() => {
        return () => {
            if (autoCloseTimerRef.current) {
                clearTimeout(autoCloseTimerRef.current);
            }
        };
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/*
                Recommendation for Framer Motion:
                To use Framer Motion, you would wrap the div with <motion.div>
                and use the `animate` and `transition` props.

                Example for the face icon:
                <motion.div
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.2, rotate: 10 }}
                >
            */}
            <div
                className={`w-14 h-14 bg-white rounded-full shadow-2xl border-2 border-white overflow-hidden cursor-pointer transition-all duration-200 hover:scale-110 animate-[gentleRotate_4s_ease-in-out_infinite] ${isFaceClicked ? 'animate-[faceClick_0.3s_ease-in-out]' : ''}`}
                onClick={handleFaceClick}
                style={{ animationIterationCount: isFaceClicked ? 1 : 'infinite' }}
            >
                <FaceIcon />
            </div>

            {/*
                Recommendation for Framer Motion:
                Use the `AnimatePresence` component to handle enter and exit animations.

                <AnimatePresence>
                    {showChatBubble && (
                        <motion.div
                            initial={{ opacity: 0, x: -10, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -10, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            ... chat bubble content ...
                        </motion.div>
                    )}
                </AnimatePresence>
            */}
            {(showChatBubble || isAnimatingOut) && (
                <div
                    className={`absolute bottom-4 left-20 max-w-sm cursor-pointer transition-all duration-300 ease-out ${
                        isAnimatingOut
                            ? 'opacity-0 animate-[bubbleSlideOut_0.3s_ease-out]'
                            : 'opacity-100 animate-[bubbleSlideIn_0.3s_ease-out]'
                    }`}
                    onClick={handleBubbleClick}
                >
                    <div
                        className="bg-gradient-to-r from-blue-500 to-sky-500 text-white px-5 py-3 rounded-2xl shadow-xl relative"
                        style={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
                        }}
                    >
                        <p className="text-base font-medium leading-snug">
                            {currentCompliment}
                        </p>
                        <div className="absolute bottom-3 -left-2 w-4 h-4 bg-blue-500 transform rotate-45"></div>
                    </div>
                </div>
            )}

            {showChatBubble && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={handleChatClose}
                ></div>
            )}
        </div>
    );
};

export default ChatBubble;
