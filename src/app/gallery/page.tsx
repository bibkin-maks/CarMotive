"use client";

import SiteNav from "@/components/TopFlyingHeader";
import ContactForm from "@/components/ContactForm";
import Gallery from "@/components/Gallery";
import Backdrop from "@/components/ui/Backdrop";
import PageHero from "@/components/ui/PageHero";
import SiteFooter from "@/components/SiteFooter";

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen">
      <Backdrop />

      <div className="relative z-10">
        <SiteNav />

        <PageHero
          eyebrow="Our work"
          title="GALLERY"
          lede="Inside the Dingley Village workshop — the jobs, the tools and the vehicles that come through our doors."
        />

        <section className="pb-20 lg:pb-28" aria-label="Photo gallery">
          <Gallery />
        </section>

        <section id="contactForm" className="scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-28">
          <ContactForm />
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
