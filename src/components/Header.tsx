"use client";

import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-wash-bg shadow-md z-50">
      <div className="mx-auto max-w-[800px] px-4 py-3 flex justify-center items-center">
        <h1 className="text-xl font-bold text-wash-primary">WashApp</h1>
      </div>
    </header>
  );
}
