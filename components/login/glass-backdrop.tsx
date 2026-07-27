/**
 * The Glass concept's full-bleed photo + scrims. Shared by the login and
 * registration pages so the treatment only has to be tuned in one place.
 */
export function GlassBackdrop() {
  return (
    <>
      {/* Desktop zooms in and nudges the pelican left of the sign-in card;
          mobile keeps a calmer, un-zoomed crop that reads better in portrait.
          Adjust the lg scale / translateX pair to reframe on desktop. */}
      <img
        src="/hero-pelican-dusk.png"
        alt="A pelican perched on a power line at dusk with transmission towers"
        className="absolute inset-0 size-full object-cover object-center lg:scale-[1.2] lg:-translate-x-[12%]"
      />
      {/* Left-to-right scrim seats the desktop copy over the photo. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/15 to-transparent" />
      {/* Bottom-up navy fade (mobile only) — seats the white card cleanly under
          the calmer crop instead of clashing with a sharp slice of the bird. */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-transparent lg:hidden" />
      <div className="animate-gradient-pan absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(161,28,32,0.12),transparent_45%),radial-gradient(circle_at_82%_78%,rgba(203,162,75,0.10),transparent_45%)]" />
    </>
  )
}
