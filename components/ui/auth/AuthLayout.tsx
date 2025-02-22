import React from 'react';
import { Button } from '@/components/ui/button';

export function AuthLayout({
  children,
  imageSrc,
}: {
  children: React.ReactNode;
  imageSrc: string;
}) {;
  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="relative bg-gray-100">
        <img
          src={imageSrc}
          alt="Auth Step Background"
          className="h-full object-cover"
        />

        {/* Button inside the image */}
        <div className="justify-center absolute inset-x-0 bottom-10 flex">
          <Button type='tertiary'>
            Découvrir Skill Guru
          </Button>
        </div>
      </div>

      {/* Right Form Section - Centered both vertically & horizontally */}
      <div className="flex flex-1 items-center justify-center p-10 bg-white min-h-full">
        <div className="max-w-md w-full">{children}</div>
      </div>
    </div>
  );
}
