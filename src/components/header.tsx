import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-center py-4 bg-[#FFF9E6]">
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="WashApp Logo"
          width={40}
          height={40}
        />
        <h1 className="text-2xl font-bold text-blue-900">WashApp</h1>
      </div>
    </header>
  );
};

export default Header;
