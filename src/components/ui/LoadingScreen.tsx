import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(() => onComplete?.(), 1000); // Wait for exit animation
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
          {/* Top Shutter */}
          <motion.div
            initial={{ height: "50vh" }}
            exit={{ height: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            className="w-full bg-black border-b border-white/10 relative overflow-hidden"
          >
            <div className="absolute inset-x-0 bottom-0 h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent opacity-50" />
          </motion.div>

          {/* Bottom Shutter */}
          <motion.div
            initial={{ height: "50vh" }}
            exit={{ height: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            className="w-full bg-black border-t border-white/10 relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent opacity-50" />
          </motion.div>

          {/* Content Layer - Fades out */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <div className="relative flex flex-col items-center">
              {/* Logo or Brand Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                  MetaCode<span className="text-primary"></span>
                </div>
              </motion.div>

              {/* Progress Container */}
              <div className="w-64 md:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Percentage */}
              <motion.div
                className="mt-4 font-mono text-primary flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-2xl font-bold">
                  {Math.round(progress)}
                </span>
                <span className="text-sm opacity-50">%</span>
              </motion.div>

              {/* Loading Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-12 text-xs uppercase tracking-[0.3em] text-white/30"
              >
                Initializing Experience
              </motion.p>
            </div>

            {/* Decorative side numbers/lines */}
            <div className="absolute bottom-10 left-10 hidden md:block">
              <div className="h-20 w-[1px] bg-gradient-to-t from-primary/50 to-transparent" />
              <p className="mt-4 text-[10px] font-mono text-primary/40 uppercase tracking-widest [writing-mode:vertical-rl]">
                System.v1.0
              </p>
            </div>

            <div className="absolute top-10 right-10 hidden md:block text-right">
              <p className="mb-4 text-[10px] font-mono text-primary/40 uppercase tracking-widest">
                Aesthetics & Performance
              </p>
              <div className="h-20 w-[1px] bg-gradient-to-b from-primary/50 to-transparent ml-auto" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
