import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-center py-4 bg-[#FFF9E6] shadow-sm">
      <div className="flex items-center space-x-3">
        {/* Logo */}
        <Image
          src="/logo.png"   // archivo guardado en /public/logo.png
          alt="WashApp Logo"
          width={40}        // tamaño ajustable
          height={40}
          priority
        />
        {/* Texto */}
        <h1 className="text-2xl font-extrabold text-blue-900">WashApp</h1>
      </div>
    </header>
  );
};

export default Header;
