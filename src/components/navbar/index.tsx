"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";

interface NavLink {
  label: string;
  href: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user;

  const handleSignOut = async (): Promise<void> => {
    await signOut();
  };

  const navLinks: NavLink[] = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg">
            <span className="text-xl font-bold text-white">P</span>
          </div>
          <div className="hidden leading-none sm:block">
            <h1 className="text-lg font-bold text-white">Hire Loop</h1>
          </div>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* Desktop Menu */}
          <div className="hidden items-center gap-6 md:flex">
            {/* Nav Links */}
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              {navLinks.map((link: NavLink) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Auth Links */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-300">
                    Hi, {user.name}!
                  </span>
                  <Button onClick={handleSignOut} variant="ghost">
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                >
                  Sign In
                </Link>
              )}

              {/* ✅ Link দিয়ে wrap করা হয়েছে */}
              <Link href="/auth/signup">
                <Button className="h-11 bg-white px-6 text-sm font-semibold text-black hover:bg-gray-200">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0B0B0F] md:hidden">
          <div className="space-y-3 px-4 py-6">
            <ul className="space-y-2">
              {navLinks.map((link: NavLink) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/10 pt-4">
              <div className="flex flex-col gap-3">
                {user ? (
                  <>
                    <span className="px-4 text-sm text-gray-300">
                      Hi, {user.name}!
                    </span>
                    <Button onClick={handleSignOut} variant="ghost">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="rounded-xl px-4 py-3 text-base font-medium text-violet-400 transition hover:bg-white/5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}

                {/* ✅ Link দিয়ে wrap করা হয়েছে */}
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="h-11 bg-white px-6 text-sm font-semibold text-black hover:bg-gray-200 rounded-lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
