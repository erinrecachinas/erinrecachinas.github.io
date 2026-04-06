"use client";

import { useState } from "react";
import Image from "next/image";
import { FaFacebook, FaLinkedin, FaGithub, FaFileAlt, FaPenNib } from "react-icons/fa";

const COLOR_BARS = [
  { id: "b", color: "#2980b9" },
  { id: "g", color: "#27ae60" },
  { id: "r", color: "#c0392b" },
];

const DEFAULT_BG = "#8e44ad";

const SOCIALS = [
  { href: "https://facebook.com/erinrecachinas", icon: FaFacebook, label: "Facebook" },
  { href: "https://www.linkedin.com/in/erinrecachinas/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://github.com/erinrecachinas", icon: FaGithub, label: "GitHub" },
  { href: "/resume.pdf", icon: FaFileAlt, label: "Resume" },
  { href: "./blog", icon: FaPenNib, label: "Blog", sameTab: true },
];

export default function Home() {
  const [headerBg, setHeaderBg] = useState(DEFAULT_BG);

  return (
    <>
      <div className="header" style={{ backgroundColor: headerBg }}>
        <header>
          <h1 style={{ fontFamily: "var(--font-arvo)" }}>
            <Image
              src="/pic.jpg"
              alt="Erin Recachinas"
              width={600}
              height={427}
              style={{ maxWidth: "100%", height: "auto" }}
              priority
            />
          </h1>
          <h1 style={{ fontFamily: "var(--font-arvo)" }}>Erin Recachinas</h1>
          <h2 style={{ fontFamily: "var(--font-nunito)" }}>
            I&apos;m Erin, an Engineering Manager leading Controls at{" "}
            <a href="https://cash.app/" target="_blank" rel="noopener noreferrer">
              CashApp
            </a>
            .
            <br />
            My favorite things include Yoga, Cooking &amp; Baking, Star Trek, Mini Coopers, my
            husband{" "}
            <a href="https://mike.recachinas.dev" target="_blank" rel="noopener noreferrer">
              Mike
            </a>
            , my kids, and{" "}
            <a href="https://www.instagram.com/jalapenopoppy" target="_blank" rel="noopener noreferrer">
              my dog, Poppy
            </a>
          </h2>
          <ul className="socials">
            {SOCIALS.map(({ href, icon: Icon, label, sameTab }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target={sameTab ? undefined : "_blank"}
                  rel={sameTab ? undefined : "noopener noreferrer"}
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </header>
      </div>

      {COLOR_BARS.map((bar) => (
        <div
          key={bar.id}
          className="colors"
          id={bar.id}
          onMouseEnter={() => setHeaderBg(bar.color)}
          onMouseLeave={() => setHeaderBg(DEFAULT_BG)}
        />
      ))}

      <footer style={{ fontFamily: "var(--font-nunito)" }}>
        Made with ♡ by Erin
      </footer>
    </>
  );
}
