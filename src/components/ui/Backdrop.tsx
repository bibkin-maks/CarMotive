"use client";

/**
 * Page backdrop.
 *
 * Replaces the previous approach — several 600–800px blurred colour orbs
 * plus 20 infinitely-animating particles, duplicated verbatim across the
 * services and gallery pages. That read as generic dark-SaaS and cost a
 * permanent compositing load.
 *
 * This is static: a blueprint grid that fades out with distance, one
 * restrained brand wash anchored behind the hero, and a horizon hairline.
 * Structure instead of glow.
 */
export const Backdrop = () => (
  <div
    className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    aria-hidden
  >
    {/* Coarse blueprint grid, masked so it dissolves toward the edges */}
    <div
      className="grid-rules absolute inset-0 opacity-70"
      style={{
        maskImage:
          "radial-gradient(120% 90% at 50% 0%, #000 20%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(120% 90% at 50% 0%, #000 20%, transparent 75%)",
      }}
    />

    {/* Fine grid, only near the top where the hero sits */}
    <div
      className="grid-rules-fine absolute inset-x-0 top-0 h-[60vh]"
      style={{
        maskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, transparent 100%)",
      }}
    />

    {/* Single brand wash — the only colour in the backdrop */}
    <div className="absolute -top-[20%] left-1/2 h-[45vw] w-[70vw] -translate-x-1/2 rounded-full bg-brand-700/12 blur-[140px]" />

    {/* Horizon hairline under the hero */}
    <div className="absolute inset-x-0 top-[85vh] h-px bg-gradient-to-r from-transparent via-steel-700/60 to-transparent" />
  </div>
);

/**
 * Section-level accent: a pair of technical corner brackets.
 * Used to frame panels in place of the old gradient-border divs.
 */
export const CornerBrackets = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
    <div className="absolute left-0 top-0 h-10 w-10 rounded-tl-[inherit] border-l border-t border-brand-500/30" />
    <div className="absolute bottom-0 right-0 h-10 w-10 rounded-br-[inherit] border-b border-r border-brand-500/30" />
  </div>
);

export default Backdrop;
