import React from "react";

export function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 container py-16">

      {/* Page Content */}
      <div>{children}</div>
    </main>
  );
}
