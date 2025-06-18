"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useState } from "react";

const Header = ({ title, bgColor = "#800000" }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { signOut } = useClerk();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <section
        className={`${
          isHome ? "absolute z-10" : "relative"
        } top-0 left-0 right-0 flex flex-col md:flex-row justify-between items-center text-white p-4 px-4 md:px-8 @container`}
        style={{ backgroundColor: isHome ? "transparent" : bgColor }}
      >
        {/* Logo + Title */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 md:mb-0 overflow-hidden h-auto relative">
          <Link href="/">
            <Image
              src="/img/SMK_MiniLogo_White.png"
              alt="Logo"
              width={240}
              height={82}
              priority
              className="flex w-auto h-[22px] sm:h-[22px] md:h-[32px] lg:h-[52px] xl:h-[72px] 2xl:h-[82px] max-h-[82px]"
            />
          </Link>

          <SignedOut>
            <h1 className="font-thin text-[11cqw] sm:text-[3.8cqw] md:text-[5.2cqw] lg:text-[6.5cqw] xl:text-[7cqw] 2xl:text-[7.3cqw] leading-none relative sm:top-[-2px] md:top-[-2px] lg:top-[-5px] top-[-2px]">
              {title}
            </h1>
          </SignedOut>
          <SignedIn>
            <h1 className="font-thin text-3xl sm:text-3xl md:text-4xl lg:text-7xl xl:text-[7cqw] 2xl:text-[7.3cqw] leading-none relative sm:top-[-2px] md:top-[-2px] lg:top-[-5px] top-[-2px]">
              KURATOR
            </h1>
          </SignedIn>
        </div>

        {/* Log ud-knap + menu-knap */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <SignedIn>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 border border-white px-3 py-1 rounded hover:bg-white hover:text-[#800000] transition-colors"
            >
              <MdLogout className="text-xl" />
              Log ud
            </button>
          </SignedIn>

          {/* Menu-knap */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col justify-between w-6 h-5 cursor-pointer mt-2 md:mt-0 md:ml-auto order-2 md:order-none"
            aria-label="Open menu"
          >
            <span className="block h-0.5 bg-white" />
            <span className="block h-0.5 bg-white" />
            <span className="block h-0.5 bg-white" />
          </button>
        </div>
      </section>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[9997]"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      )}

      {/* Slide-in menu */}
      <div
        className={`fixed top-0 right-0 h-full w-1/4 bg-white text-[#800000] shadow-lg z-[9998] transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Luk-knap */}
        <div className="flex justify-start">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-bold px-4 pt-4 text-[#800000] cursor-pointer"
            aria-label="Luk menu"
          >
            &times;
          </button>
        </div>

        {/* Menuindhold */}
        <nav className="flex flex-col items-start gap-6 px-6 pt-10 text-xl font-medium">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
          >
            Kurator
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
