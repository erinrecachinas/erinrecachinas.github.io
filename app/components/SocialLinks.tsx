import { IconType } from "react-icons";
import { FaFacebook, FaLinkedin, FaGithub, FaFileAlt, FaPenNib } from "react-icons/fa";

interface SocialLink {
  href: string;
  icon: IconType;
  label: string;
  sameTab?: boolean;
}

const SOCIALS: SocialLink[] = [
  { href: "https://facebook.com/erinrecachinas", icon: FaFacebook, label: "Facebook" },
  { href: "https://www.linkedin.com/in/erinrecachinas/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://github.com/erinrecachinas", icon: FaGithub, label: "GitHub" },
  { href: "/resume.pdf", icon: FaFileAlt, label: "Resume" },
  { href: "./blog", icon: FaPenNib, label: "Blog", sameTab: true },
];

export default function SocialLinks() {
  return (
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
  );
}
