import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 bg-black/40">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* content */}
        <div className="flex items-center gap-2">
          <Link href={"/"} className="flex items-center gap-2">
            {/* Logo using css styles. TODO: Replace with icon */}
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-black rounded[1px]"></div>
            </div>
            <span className="text-lg font-semibold tracking-tight text-white/90">
              ServIQ
            </span>
          </Link>
        </div>

        <div className="flex gap-8 text-sm text-zinc-600 font-light">
          <Link href="#" className="hover:text-zinc-400 transition-colors">
            {" "}
            Privacy
          </Link>

          <Link href="#" className="hover:text-zinc-400 transition-colors">
            {" "}
            Terms
          </Link>

          <Link href="#" className="hover:text-zinc-400 transition-colors">
            {" "}
            Twitter
          </Link>

          <Link href="#" className="hover:text-zinc-400 transition-colors">
            {" "}
            Github
          </Link>
        </div>

        <div className="text-xs text-zinc-700">
          © {new Date().getFullYear()} ServIQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
