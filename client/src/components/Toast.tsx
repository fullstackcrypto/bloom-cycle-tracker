/*
 * Bloom — Cycle Tracker
 * Warm toast notification that slides up from bottom.
 */

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div
      className="fixed bottom-24 left-1/2 bg-[#4A3F3A] text-white px-6 py-2.5 rounded-full text-sm font-semibold z-[200] shadow-lg"
      style={{ animation: "toastIn 0.3s ease forwards" }}
    >
      {message}
    </div>
  );
}
