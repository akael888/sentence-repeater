export default function WaveBackground({ isDarkMode }) {
  // background gradient
  let backgroundStart = isDarkMode ? "#462c09ff" : "#f59e0b";
  let backgroundEnd   = isDarkMode ? "#a07b32ff" : "#fef08a";

  // blob gradients
  const blob1 = isDarkMode
    ? "radial-gradient(circle at 30% 30%, #ffd859ff 0%, rgba(243,216,78,0.65) 25%, rgba(139,92,246,0.08) 40%, transparent 60%)"
    : "radial-gradient(circle at 30% 30%, #ff6b6b 0%, rgba(255,74,74,0.65) 25%, rgba(255,107,107,0.08) 40%, transparent 60%)";

  const blob2 = isDarkMode
    ? "radial-gradient(circle at 40% 40%, #f6953bff 0%, rgba(255, 141, 60, 0.65) 22%, rgba(59,130,246,0.06) 42%, transparent 65%)"
    : "radial-gradient(circle at 40% 40%, #ff9a3c 0%, rgba(6,133,251,0.65) 22%, rgba(255,154,60,0.06) 42%, transparent 65%)";

  const blob3 = isDarkMode
    ? "radial-gradient(circle at 60% 40%, #ec4899 0%, rgba(236,72,153,0.7) 18%, rgba(236,72,153,0.06) 40%, transparent 70%)"
    : "radial-gradient(circle at 60% 40%, #ff4dd2 0%, rgba(255,7,193,0.7) 18%, rgba(255,77,210,0.06) 40%, transparent 70%)";

  return (
    <div
      className="absolute w-full h-screen overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to top, ${backgroundStart}, ${backgroundEnd})`,
      }}
    >
      {/* Neon blobs */}
      <div
        className="absolute -left-[12%] top-[8%] w-[420px] h-[420px] rounded-full 
                   blur-[10px] mix-blend-screen opacity-90 animate-floatA"
        style={{ backgroundImage: blob1 }}
      ></div>

      <div
        className="absolute left-[50%] top-[28%] w-[520px] h-[520px] rounded-full 
                   blur-[10px] mix-blend-screen opacity-95 animate-floatB"
        style={{ backgroundImage: blob2 }}
      ></div>

      <div
        className="absolute left-[82%] top-[62%] w-[360px] h-[360px] rounded-full 
                   blur-[10px] mix-blend-screen opacity-90 animate-floatC"
        style={{ backgroundImage: blob3 }}
      ></div>

      {/* streak overlay stays the same */}
      <div
        className="absolute -left-[10%] top-[18%] w-[160%] h-[60%] -rotate-[12deg] 
                   bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_6%,rgba(255,255,255,0)_16%),linear-gradient(120deg,rgba(255,255,255,0.035),transparent_30%)]
                   blur-[1px] mix-blend-overlay opacity-60 animate-streakFlow"
      ></div>
    </div>
  );
}
