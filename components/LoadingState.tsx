import React, { useEffect, useState } from "react";

const HINGLISH_MESSAGES = [
  "Compiler ki chai thandi ho rahi hai… ☕",
  "Sharma ji ke bete se comparison chal raha hai… 👦",
  "Bhau, roast tayyar ho raha hai… 🔥",
  "Panchavati Express se bhi late hai tumhara code… 🚆",
  "Memory leak dhoond rahe hain… 💧",
];

export default function LoadingState() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % HINGLISH_MESSAGES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 text-center min-h-[350px]">
      <div className="w-16 h-16 border-3 border-[#141414] rounded-2xl flex items-center justify-center bg-[#EDB13E] mb-4 shadow-[4px_4px_0px_#141414] animate-bounce">
        <span className="font-mono text-2xl font-black text-[#141414] animate-spin">
          /
        </span>
      </div>
      <h3 className="font-mono text-base font-bold text-[#141414] uppercase tracking-wide mb-2 animate-pulse">
        Analyzing Code...
      </h3>
      <p className="font-sans text-xs text-gray-700 max-w-xs font-medium bg-[#EFF2FB] px-3 py-1.5 rounded-full border border-[#141414]">
        {HINGLISH_MESSAGES[msgIdx]}
      </p>
      <p className="font-mono text-[11px] text-gray-500 mt-3">
        Evaluating computational complexity & architectural purity
      </p>
    </div>
  );
}
