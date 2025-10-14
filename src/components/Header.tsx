"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-wash-primary h-20 fixed top-0 left-0 right-0 z-50 shadow-md flex items-center">
      <div className="w-full max-w-4xl mx-auto px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-washapp-white.png"
            alt="WashApp Logo"
            width={130}
            height={130}
            className="object-contain ml-2" // ← esto lo mueve a la derecha
            priority
          />
        </Link>
      </div>
    </header>
  );
}
