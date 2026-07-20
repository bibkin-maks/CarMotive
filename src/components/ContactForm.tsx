"use client";

import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import Field from "./contact/Field";
import ContactInfoItem from "./contact/ContactInfoItem";
import MapWidget from "./contact/MapWidget";
import SocialLinks, { type SocialLink } from "./contact/SocialLinks";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";

/* TODO: point these at the real Carmotive profiles. Any platform the
   workshop isn't on should simply be removed from this array — the
   component renders nothing for an empty list. */
const SOCIALS: SocialLink[] = [
  { icon: FaFacebook, href: "#", label: "Carmotive on Facebook" },
  { icon: FaInstagram, href: "#", label: "Carmotive on Instagram" },
];

const OPENING_HOURS = [
  { days: "Monday – Friday", hours: "8:00am – 5:30pm" },
  { days: "Saturday – Sunday", hours: "Closed" },
];

const ContactForm: React.FC = () => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="relative mx-auto grid w-full max-w-[1280px] overflow-hidden rounded-panel border border-steel-800 bg-steel-900 lg:grid-cols-[1.15fr_0.85fr]"
    aria-label="Contact"
  >
    <div className="grid-rules-fine absolute inset-0 opacity-40" aria-hidden />

    {/* ---------- Form ---------- */}
    <div className="relative p-6 sm:p-10 lg:p-14">
      <SectionHeading
        eyebrow="Book a service"
        heading="Get in touch"
        lede="Tell us about the vehicle and what it needs. We'll confirm a time that works."
      />

      <form className="mt-10 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field index={0} label="Name" name="name" autoComplete="name" />
          <Field
            index={1}
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
          />
        </div>

        <Field
          index={2}
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            index={3}
            label="Vehicle make & model"
            name="vehicle"
            placeholder="e.g. Toyota Hilux 2018"
          />
          <Field
            index={4}
            label="Service type"
            name="service"
            placeholder="e.g. Logbook service"
          />
        </div>

        <Field
          index={5}
          label="Preferred date"
          name="date"
          type="date"
          style={{ colorScheme: "dark" }}
        />

        <Field
          index={6}
          label="Message"
          name="message"
          multiline
          rows={4}
          placeholder="Anything else we should know?"
        />

        <motion.div
          custom={7}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.28, duration: 0.35 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-2"
        >
          <Button type="submit" size="lg" withArrow className="w-full sm:w-auto">
            Send request
          </Button>
        </motion.div>
      </form>
    </div>

    {/* ---------- Details ---------- */}
    <div className="relative flex flex-col gap-8 border-t border-steel-800 bg-steel-850 p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
      <MapWidget />

      <div className="space-y-4">
        <ContactInfoItem
          icon={FaMapMarkerAlt}
          text="292 Boundary Road, Dingley Village VIC 3172"
          href="https://maps.google.com/?q=292+Boundary+Road+Dingley+Village+VIC+3172"
          delay={0.05}
        />
        <ContactInfoItem
          icon={FaPhoneAlt}
          text="(03) 9551 6555"
          href="tel:+61395516555"
          delay={0.1}
        />
        <ContactInfoItem
          icon={FaEnvelope}
          text="info@carmotive.com.au"
          href="mailto:info@carmotive.com.au"
          delay={0.15}
        />
      </div>

      {/* Opening hours were previously buried inside an FAQ answer, where
          nobody checking "are they open now?" would look. */}
      <div className="border-t border-steel-800 pt-6">
        <h3 className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-steel-400">
          Opening hours
        </h3>
        <dl className="space-y-2">
          {OPENING_HOURS.map((row) => (
            <div key={row.days} className="flex justify-between gap-4 text-sm">
              <dt className="text-steel-300">{row.days}</dt>
              <dd className="font-medium text-steel-50">{row.hours}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-auto border-t border-steel-800 pt-6">
        <SocialLinks links={SOCIALS} />
      </div>
    </div>
  </motion.section>
);

export default ContactForm;
