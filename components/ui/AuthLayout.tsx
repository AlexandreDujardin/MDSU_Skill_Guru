import React from 'react';

export function AuthLayout({
  children,
  imageSrc,
}: {
  children: React.ReactNode;
  imageSrc: string;
}) {
  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="flex-1 bg-gray-100">
        <img src={imageSrc} alt="Auth Image" className="h-full w-full object-cover" />
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center px-8 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
