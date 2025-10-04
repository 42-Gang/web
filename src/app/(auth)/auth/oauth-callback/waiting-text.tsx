'use client';

import { useEffect, useState } from 'react';

export const WaitingText = () => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="font-medium text-[32px] text-white leading-snug">Waiting{'.'.repeat(dotCount)}</p>
  );
};
