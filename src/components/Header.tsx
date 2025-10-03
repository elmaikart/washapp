import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[var(--washapp-cream)] shadow-md z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-center h-16">
        <Image
          src="/logo.png"
          alt="WashApp"
          width={120}
          height={28}
          priority
          className="h-7 w-auto"
        />
      </div>
    </header>
  );
}
