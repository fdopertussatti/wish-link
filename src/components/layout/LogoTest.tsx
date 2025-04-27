'use client';

import Image from 'next/image';

export function LogoTest() {
  return (
    <div className="p-4 text-center">
      <h2 className="mb-4 text-lg">Logo Test</h2>
      <div className="flex flex-col gap-4 items-center">
        <div>
          <p className="mb-2">Regular img tag:</p>
          <img src="/pertussatti_logo.svg" alt="Pertussatti Logo" width={150} height={50} />
        </div>
        <div>
          <p className="mb-2">Next Image component:</p>
          <Image 
            src="/pertussatti_logo.svg" 
            alt="Pertussatti Logo" 
            width={150} 
            height={50}
          />
        </div>
      </div>
    </div>
  );
} 