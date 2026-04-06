"use client";

import { useState } from "react";
import ProfilePhoto from "./components/ProfilePhoto";
import Bio from "./components/Bio";
import SocialLinks from "./components/SocialLinks";
import ColorBars from "./components/ColorBars";
import Footer from "./components/Footer";

const DEFAULT_BG = "#8e44ad";

export default function Home() {
  const [headerBg, setHeaderBg] = useState(DEFAULT_BG);

  return (
    <>
      <div className="header" style={{ backgroundColor: headerBg }}>
        <header>
          <ProfilePhoto />
          <Bio />
          <SocialLinks />
        </header>
      </div>

      <ColorBars
        onHover={(color) => setHeaderBg(color)}
        onLeave={() => setHeaderBg(DEFAULT_BG)}
      />

      <Footer />
    </>
  );
}
