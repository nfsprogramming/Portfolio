import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "../data/nav";
import { scrollToSection } from "../hooks/useLenis";

/**
 * Fixed glass navbar with smooth-scroll anchors + a contact CTA.
 * Switches to a more solid background once the user scrolls past 40px.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav__inner">
        <button
          className="nav__brand font-display"
          onClick={() => scrollToSection("top")}
          data-cursor="hover"
          aria-label="Scroll to top"
        >
          <span className="nav__brand-mark font-mono">MN</span>
          <span className="nav__brand-name">
            MOHAMED&nbsp;NIFRAS
          </span>
        </button>

        <nav className="nav__links">
          {navItems.map((item) => (
            <button
              key={item.target}
              className="nav__link font-display"
              onClick={() => scrollToSection(item.target)}
              data-cursor="hover"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="nav__side">
          <span className="nav__time font-display" aria-hidden="true">
            {time} <span className="nav__tz">LOCAL</span>
          </span>
          <button
            className="btn btn--solid nav__cta"
            onClick={() => scrollToSection("contact")}
            data-cursor="hover"
            data-cursor-label="Say hi"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <MobileNav />
    </motion.header>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="mnav">
      <button
        className="mnav__btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span className={`mnav__bars ${open ? "mnav__bars--open" : ""}`}>
          <span />
          <span />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mnav__panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(false)}
            data-lenis-prevent
          >
            {[...navItems, { label: "Contact", target: "contact" }].map(
              (item, i) => (
                <motion.button
                  key={item.target}
                  className="mnav__link font-display"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  onClick={() => scrollToSection(item.target)}
                >
                  <span className="mnav__idx">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  {item.label}
                </motion.button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
