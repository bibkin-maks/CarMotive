export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a public asset or route with the GitHub Pages base path. */
export const asset = (path: string) =>
  `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Scroll to the contact form.
 *
 * This logic was duplicated inline in five places (nav CTA, mobile menu CTA,
 * hero CTA, and both service block buttons). If the form is not on the
 * current page, fall back to navigating home with the hash.
 */
export const scrollToContact = () => {
  const form = document.querySelector("#contactForm");
  if (form) {
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.href = asset("/#contactForm");
  }
};
