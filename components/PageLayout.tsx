import React from "react";

export function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 py-12">

      {/* Page Content */}
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
  );
}
