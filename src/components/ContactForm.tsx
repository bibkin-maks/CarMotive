import { motion, Variants } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

const ContactForm: React.FC = () => {
  const inputContainerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#BE5161]/50 focus:bg-white/10 focus:ring-1 focus:ring-[#BE5161]/50 transition-all duration-300 backdrop-blur-sm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-7xl mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 bg-[#0e141a] shadow-2xl flex flex-col lg:flex-row"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#BE5161]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[80px] pointer-events-none" />
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\u002260\u0022 height=\u002260\u0022 xmlns=\u0022http://www.w3.org/2000/svg\u0022%3E%3Cdefs%3E%3Cpattern id=\u0022grid\u0022 width=\u002260\u0022 height=\u002260\u0022 patternUnits=\u0022userSpaceOnUse\u0022%3E%3Cpath d=\u0022M 60 0 L 0 0 0 60\u0022 fill=\u0022none\u0022 stroke=\u0022rgba(255,255,255,0.02)\u0022 stroke-width=\u00221\u0022/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\u0022100%25\u0022 height=\u0022100%25\u0022 fill=\u0022url(%23grid)\u0022/%3E%3C/svg%3E')] opacity-30 pointer-events-none" />

      {/* Left Form Section */}
      <div className="relative z-10 lg:w-3/5 p-8 sm:p-12 lg:p-16 flex flex-col">
        <div className="mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-['Bebas_Neue'] text-5xl sm:text-7xl text-white tracking-wide mb-4 drop-shadow-lg"
          >
            Get in touch
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-[#BE5161] to-transparent h-1.5 rounded-full"
          />
        </div>

        <form className="flex flex-col space-y-5 flex-grow">
          <motion.div custom={0} variants={inputContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <input type="text" placeholder="Name" className={inputClass} />
          </motion.div>
          <motion.div custom={1} variants={inputContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <input type="text" placeholder="Phone Number" className={inputClass} />
          </motion.div>
          <motion.div custom={2} variants={inputContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <input type="email" placeholder="Email" className={inputClass} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <motion.div custom={3} variants={inputContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <input type="text" placeholder="Vehicle Make & Model" className={inputClass} />
            </motion.div>
            <motion.div custom={4} variants={inputContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <input type="text" placeholder="Service Type" className={inputClass} />
            </motion.div>
          </div>

          <motion.div custom={5} variants={inputContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <input type="date" placeholder="Preferred Date" className={`${inputClass} appearance-none`} style={{ colorScheme: 'dark' }} />
          </motion.div>
          <motion.div custom={6} variants={inputContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <textarea placeholder="Message" rows={4} className={`${inputClass} resize-none`}></textarea>
          </motion.div>

          <motion.div
            custom={7}
            variants={inputContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-gradient-to-r from-[#BE5161] to-[#e05e70] text-white font-semibold py-4 px-10 rounded-full shadow-lg shadow-[#BE5161]/30 hover:shadow-[#BE5161]/50 transition-all duration-300 w-full sm:w-auto overflow-hidden relative group"
            >
              <span className="relative z-10">Submit Request</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </motion.button>
          </motion.div>
        </form>
      </div>

      {/* Right Info Section */}
      <div className="relative lg:w-2/5 bg-[#131d27]/80 backdrop-blur-md p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5">

        {/* Shimmer Effect Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/[0.03] to-transparent rotate-45 animate-pulse" />
        </div>

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-gray-300 text-lg leading-relaxed mb-10 font-light"
          >
            Have a question or need assistance? Reach out to us regarding any of our services and we’ll get back to you as soon as possible.
          </motion.p>

          {/* Map */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="w-full h-[250px] sm:h-[300px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-10 bg-[#0a0f14] relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e141a]/80 to-transparent pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-50" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12578.54541670751!2d145.110033!3d-37.985615!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66d1adb8689b1%3A0xbb65bc7a9bd67320!2sCarmotive!5e0!3m2!1sen!2sau!4v1757586625186!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(85%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          <div className="space-y-6 text-gray-200">
            {[
              { icon: FaMapMarkerAlt, text: "292 Boundary Road, Dingley Village VIC 3172", delay: 0.9 },
              { icon: FaPhoneAlt, text: "(03) 9551 6555", delay: 1.0 },
              { icon: FaEnvelope, text: "info@carmotive.com.au", delay: 1.1 }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay }}
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-[#BE5161] group-hover:bg-[#BE5161] group-hover:text-white transition-all duration-300 shrink-0">
                  <item.icon size={18} />
                </div>
                <span className="flex-1 font-light group-hover:text-white transition-colors duration-300 mt-2">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="flex gap-4 mt-12"
        >
          {[FaInstagram, FaTwitter, FaFacebook, FaYoutube].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ y: -5, scale: 1.1 }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-[#BE5161] hover:text-white transition-all duration-300"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ContactForm;
