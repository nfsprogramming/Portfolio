/** Section anchors that appear in the navbar (smooth-scroll targets). */
export type NavItem = {
  label: string;
  target: string; // id of section to scroll to
};

export const navItems: NavItem[] = [
  { label: "About", target: "about" },
  { label: "Skills", target: "skills" },
  { label: "Projects", target: "projects" },
  { label: "Experience", target: "experience" },
  { label: "Stats", target: "github" },
];

/** Social links used in contact + footer. */
export const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:hello@example.com" },
  { label: "Resume", href: "/resume.pdf" },
];
