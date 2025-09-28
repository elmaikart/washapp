import Image from "next/image";

export default function Header() {
  return (
    <header className="py-5 bg-[var(--washapp-cream)]">
      <div className="container-wash flex items-center justify-center">
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
