import { motion } from "framer-motion";
import { MousePosition } from ".";

export function AnimatedGlow({
  mousePosition,
}: {
  mousePosition: MousePosition;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Horizontal sweeping glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 20%, rgba(147, 51, 234, 0.15) 50%, rgba(59, 130, 246, 0.1) 80%, transparent 100%)",
            "linear-gradient(90deg, transparent 0%, rgba(147, 51, 234, 0.1) 20%, rgba(59, 130, 246, 0.15) 50%, rgba(147, 51, 234, 0.1) 80%, transparent 100%)",
            "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 20%, rgba(147, 51, 234, 0.15) 50%, rgba(59, 130, 246, 0.1) 80%, transparent 100%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Mouse-following glow */}
      <motion.div
        className="absolute h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 30%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </div>
  );
}
