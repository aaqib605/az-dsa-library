"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive: (pathname: string) => boolean;
}

const navItems: NavItem[] = [
  {
    label: "Tracks",
    href: "/",
    icon: (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M4 19.5V5.75A2.75 2.75 0 0 1 6.75 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5" />
        <path d="M8 7h8" />
        <path d="M8 11h6" />
      </svg>
    ),
    isActive: (pathname) => pathname === "/" || pathname.startsWith("/tracks"),
  },
  {
    label: "Preview",
    href: "/preview",
    icon: (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
        <path d="M14 2v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h4" />
      </svg>
    ),
    isActive: (pathname) => pathname.startsWith("/preview"),
  },
  {
    label: "Sync",
    href: "/admin/sync",
    icon: (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M18 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M6 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M8.6 6.5 15.4 11.5" />
        <path d="M15.4 14.5 8.6 19.5" />
      </svg>
    ),
    isActive: (pathname) => pathname.startsWith("/admin/sync"),
  },
];

function BrandMark() {
  return (
    <Link
      aria-label="DSA Library home"
      className="group flex items-center gap-2.5"
      href="/"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded border border-emerald-400/35 bg-emerald-400/10 text-emerald-300 transition-colors group-hover:border-emerald-300/55 group-hover:bg-emerald-400/15">
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
          viewBox="0 0 24 24"
        >
          <path d="m8 9-4 3 4 3" />
          <path d="m16 9 4 3-4 3" />
          <path d="m14 5-4 14" />
        </svg>
      </span>
      <span className="font-mono text-sm font-semibold tracking-normal text-slate-100">
        dsa<span className="text-slate-500">.</span>
        <span className="text-slate-300">library</span>
      </span>
      <span className="hidden rounded border border-slate-700/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-normal text-slate-400 sm:inline-flex">
        Preview
      </span>
    </Link>
  );
}

function NavLink({
  item,
  pathname,
  mobile = false,
  onClick,
}: {
  item: NavItem;
  pathname: string;
  mobile?: boolean;
  onClick?: () => void;
}) {
  const active = item.isActive(pathname);

  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={[
        "flex items-center gap-2 rounded-md font-medium transition-colors",
        "text-slate-400 hover:bg-slate-800/70 hover:text-slate-100",
        active ? "bg-slate-800 text-slate-100 shadow-sm" : "",
        mobile ? "px-3 py-2.5 text-sm" : "px-3 py-2 text-sm",
      ].join(" ")}
      href={item.href}
      onClick={onClick}
    >
      <span className={active ? "text-slate-100" : "text-slate-500"}>
        {item.icon}
      </span>
      {item.label}
    </Link>
  );
}

export function DashboardNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/90 bg-[#090d12]/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandMark />

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink item={item} key={item.href} pathname={pathname} />
          ))}
        </nav>

        <button
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-800 bg-slate-900/80 text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-800 hover:text-slate-100 md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-slate-800/90 bg-[#090d12] px-4 pb-4 pt-2 md:hidden">
          <nav
            aria-label="Mobile primary navigation"
            className="mx-auto flex w-full max-w-7xl flex-col gap-1"
          >
            {navItems.map((item) => (
              <NavLink
                item={item}
                key={item.href}
                mobile
                onClick={() => setMobileMenuOpen(false)}
                pathname={pathname}
              />
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
