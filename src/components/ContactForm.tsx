import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import ContactInput from "./contact/ContactInput";
import ContactTextarea from "./contact/ContactTextarea";
import FormButton from "./contact/FormButton";
import ContactInfoItem from "./contact/ContactInfoItem";
import MapWidget from "./contact/MapWidget";
import SocialLinks from "./contact/SocialLinks";
import { AnimatedBackground, LuxuryHeading } from "./ui/LuxuryElements";

const ContactForm: React.FC = () => {
  // Shared simple variants for container staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Faster stagger
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Reduced distance
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} // Trigger earlier
      transition={{ duration: 0.6, ease: "easeOut" }} // Simple ease
      className="relative w-full max-w-7xl mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 bg-[#0e141a] shadow-2xl flex flex-col lg:flex-row"
    >
      {/* Optimized Background */}
      <AnimatedBackground />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\u002260\u0022 height=\u002260\u0022 xmlns=\u0022http://www.w3.org/2000/svg\u0022%3E%3Cdefs%3E%3Cpattern id=\u0022grid\u0022 width=\u002260\u0022 height=\u002260\u0022 patternUnits=\u0022userSpaceOnUse\u0022%3E%3Cpath d=\u0022M 60 0 L 0 0 0 60\u0022 fill=\u0022none\u0022 stroke=\u0022rgba(255,255,255,0.02)\u0022 stroke-width=\u00221\u0022/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\u0022100%25\u0022 height=\u0022100%25\u0022 fill=\u0022url(%23grid)\u0022/%3E%3C/svg%3E')] opacity-30 pointer-events-none" />

      {/* Left Form Section */}
      <div className="relative z-10 lg:w-3/5 p-8 sm:p-12 lg:p-16 flex flex-col">
        <LuxuryHeading heading="Get in touch" className="mb-10 sm:mb-12" />

        <motion.form
          className="flex flex-col space-y-5 flex-grow"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ContactInput index={0} type="text" placeholder="Name" />
          <ContactInput index={1} type="text" placeholder="Phone Number" />
          <ContactInput index={2} type="email" placeholder="Email" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ContactInput index={3} type="text" placeholder="Vehicle Make & Model" />
            <ContactInput index={4} type="text" placeholder="Service Type" />
          </div>

          <ContactInput index={5} type="date" placeholder="Preferred Date" className="appearance-none" style={{ colorScheme: 'dark' }} />
          <ContactTextarea index={6} placeholder="Message" rows={4} />

          <FormButton index={7}>Submit Request</FormButton>
        </motion.form>
      </div>

      {/* Right Info Section */}
      <div className="relative lg:w-2/5 bg-[#131d27]/80 backdrop-blur-md p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5">

        {/* Shimmer Effect Background - kept but lighter */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/[0.03] to-transparent rotate-45" />
        </div>

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }} // Optimized delay
            className="text-gray-300 text-lg leading-relaxed mb-10 font-light"
          >
            Have a question or need assistance? Reach out to us regarding any of our services and we’ll get back to you as soon as possible.
          </motion.p>

          <MapWidget />

          <div className="space-y-6 text-gray-200">
            <ContactInfoItem icon={FaMapMarkerAlt} text="292 Boundary Road, Dingley Village VIC 3172" delay={0.6} />
            <ContactInfoItem icon={FaPhoneAlt} text="(03) 9551 6555" delay={0.7} />
            <ContactInfoItem icon={FaEnvelope} text="info@carmotive.com.au" delay={0.8} />
          </div>
        </div>

        <SocialLinks icons={[FaInstagram, FaTwitter, FaFacebook, FaYoutube]} />

      </div>
    </motion.div>
  );
};

export default ContactForm;
