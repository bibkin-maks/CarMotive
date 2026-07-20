"use client";

import Image from "next/image";
import { asset } from "@/utils/navigation";

const LINKS = [
  { name: "Home", href: asset("/") },
  { name: "About", href: asset("/#about") },
  { name: "Services", href: asset("/services") },
  { name: "Gallery", href: asset("/gallery") },
];

/**
 * A real footer. Each page previously ended with its own one-line copyright
 * bar — three near-identical blocks with different borders, backgrounds and
 * heights, and no navigation or contact details in any of them.
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-steel-800 bg-steel-950/80">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src={asset("/image/logo.png")}
              alt="Carmotive"
              width={140}
              height={50}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel-400">
              Mechanical, auto electrical and fleetcare repairs in southeastern
              Melbourne. Over 100 years of combined experience.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-steel-400">
              Pages
            </h2>
            <ul className="space-y-2.5">
              {LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-steel-200 transition-colors hover:text-brand-400"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-steel-400">
              Workshop
            </h2>
            <address className="space-y-2.5 text-sm not-italic text-steel-200">
              <p className="leading-relaxed text-steel-400">
                292 Boundary Road
                <br />
                Dingley Village VIC 3172
              </p>
              <p>
                <a
                  href="tel:+61395516555"
                  className="transition-colors hover:text-brand-400"
                >
                  (03) 9551 6555
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@carmotive.com.au"
                  className="transition-colors hover:text-brand-400"
                >
                  info@carmotive.com.au
                </a>
              </p>
              <p className="pt-1 text-steel-400">Mon&ndash;Fri, 8:00am&ndash;5:30pm</p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-steel-800 pt-6">
          <p className="text-xs text-steel-500">
            Copyright {new Date().getFullYear()} &copy; Carmotive | Site by
            OurAuto Digital
          </p>
        </div>
      </div>
    </footer>
  );
}
