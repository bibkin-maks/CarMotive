import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaRegClock,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import ContactInfoItem from "./contact/ContactInfoItem";
import MapWidget from "./contact/MapWidget";
import SocialLinks from "./contact/SocialLinks";
import { AnimatedBackground, LuxuryHeading } from "./ui/LuxuryElements";

const ContactForm: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Reduced distance
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} // Trigger earlier
      transition={{ duration: 0.6, ease: "easeOut" }} // Simple ease
      className="relative w-full max-w-7xl mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 bg-[#0e141a] shadow-2xl"
    >
      {/* Optimized Background */}
      <AnimatedBackground />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\u002260\u0022 height=\u002260\u0022 xmlns=\u0022http://www.w3.org/2000/svg\u0022%3E%3Cdefs%3E%3Cpattern id=\u0022grid\u0022 width=\u002260\u0022 height=\u002260\u0022 patternUnits=\u0022userSpaceOnUse\u0022%3E%3Cpath d=\u0022M 60 0 L 0 0 0 60\u0022 fill=\u0022none\u0022 stroke=\u0022rgba(255,255,255,0.02)\u0022 stroke-width=\u00221\u0022/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\u0022100%25\u0022 height=\u0022100%25\u0022 fill=\u0022url(%23grid)\u0022/%3E%3C/svg%3E')] opacity-30 pointer-events-none" />

      {/* Contact details + map */}
      <div className="relative z-10 p-8 sm:p-12 lg:p-16">
        <LuxuryHeading heading="Visit Us" className="mb-10 sm:mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Map */}
          <MapWidget />

          {/* Details */}
          <div className="flex flex-col">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 font-light"
            >
              Have a question or need assistance? Reach out to us regarding any of our services and we’ll get back to you as soon as possible.
            </motion.p>

            <div className="space-y-6 text-gray-200">
              <ContactInfoItem icon={FaMapMarkerAlt} text="292B Boundary Road, Dingley Village VIC 3172" delay={0.4} />
              <ContactInfoItem icon={FaPhoneAlt} text="(03) 9551 6555" delay={0.5} />
              <ContactInfoItem icon={FaEnvelope} text="info@carmotive.com.au" delay={0.6} />
              <ContactInfoItem icon={FaRegClock} text="Monday – Friday, 8:00am – 5:00pm" delay={0.7} />
            </div>

            <SocialLinks icons={[FaInstagram, FaTwitter, FaFacebook, FaYoutube]} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
