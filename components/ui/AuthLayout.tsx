import React from 'react';

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
        <div className="absolute bottom-10 left-10">
          <button className="bg-white text-primary font-semibold px-6 py-2 rounded-md shadow-md hover:bg-gray-100">
            Découvrir Skill Guru
          </button>
        </div>
      </div>

      {/* Right Form Section - Centered both vertically & horizontally */}
      <div className="flex flex-1 items-center justify-center p-10 bg-white min-h-full">
        <div className="max-w-md w-full">{children}</div>
      </div>
    </div>
  );
}
