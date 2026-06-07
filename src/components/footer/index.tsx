import Link from "next/link";
import { LogoFacebook, LogoLinkedin, LogoGithub } from "@gravity-ui/icons";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/salary" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/help-center" },
      { label: "Career library", href: "/career-library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand-guideline" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
];

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  className: string;
}

export default function Footer() {
  const socialLinks: SocialLink[] = [
    {
      href: "#",
      icon: <LogoFacebook className="h-5 w-5" />,
      className:
        "flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition hover:bg-violet-600",
    },
    {
      href: "#",
      icon: <LogoGithub className="h-5 w-5" />,
      className:
        "flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 transition hover:bg-violet-500",
    },
    {
      href: "#",
      icon: <LogoLinkedin className="h-5 w-5" />,
      className:
        "flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition hover:bg-violet-600",
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* TOP SECTION */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500">
                <span className="text-xl font-bold text-white">P</span>
              </div>
              <div className="leading-none">
                <h2 className="text-xl font-bold">Hiring</h2>
                <h2 className="text-xl font-bold">Loop</h2>
              </div>
            </Link>

            {/* Description */}
            <p className="max-w-xs leading-8 text-gray-400">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-6">
              {socialLinks.map((social: SocialLink, index: number) => (
                <Link
                  key={index}
                  href={social.href}
                  className={social.className}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* FOOTER SECTIONS */}
          {footerSections.map((section: FooterSection) => (
            <div key={section.title}>
              <h3 className="mb-6 text-lg font-semibold text-violet-500">
                {section.title}
              </h3>
              <ul className="space-y-4 text-gray-400">
                {section.links.map((link: FooterLink) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>Copyright 2024 — Hire Loop</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="transition hover:text-white">
              Terms & Policy
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
