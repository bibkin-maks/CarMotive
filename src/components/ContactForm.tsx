import React from "react";
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
  const inputClass =
    "p-3 bg-[#0D1A28] border-b border-gray-700 focus:outline-none focus:ring-0 focus:border-[#2178AD] h-[40px]";

  return (
    <div className= "grid md:grid-cols-2 rounded-2xl overflow-hidden w-[1020px] border-[#28475A] border-2">

      
      

      {/* Left Form Section */}
      <div className="bg-[#0e141a] text-white p-8 md:p-10">
        <h2 className="text-[40px] font-semibold mb-[47px]">
          Get in touch <div className="bg-[#54A0FB] w-[107px] h-[5px]"></div>
        </h2>
          <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Name" className={inputClass} />
          <input type="text" placeholder="Phone Number" className={inputClass} />
          <input type="email" placeholder="Email" className={inputClass} />
          <input type="text" placeholder="Vehicle Make, Model and Year" className={inputClass} />
          <input type="text" placeholder="Type of Service Required" className={inputClass} />
          <input type="date" placeholder="Preferred Date of Appointment" className={inputClass} style={{colorScheme: 'dark'}} />
          <textarea placeholder="Content" className={inputClass + " h-[150] resize-none"}></textarea>
          <button
            type="submit"
            className="bg-[#BE5161] text-white py-3 rounded-md font-semibold hover:bg-[#C23247] transition cursor-pointer w-[115px] mt-[25px]"
          >
            Submit
          </button>
        </form>

      </div>

      {/* Right Info Section */}
      <div className="bg-[#131d27] text-white p-8 md:p-10 flex flex-col space-y-6 relative overflow-clip">
        
        <div className="rounded-[100%] absolute bg-[#21415F] w-[63px] h-[63px] bottom-[70px] right-[-20px] "></div>
        <div className="rounded-[100%] absolute bg-[#3A709F] w-[110px] h-[110px] bottom-0 right-[-77px]"></div>


        <p className="text-gray-300 font-normal text-[17px] mt-[50px]" >
          Have a question or need assistance? Reach out to us and we’ll get back to you as soon as possible.
        </p>
        <div>
          <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12578.54541670751!2d145.110033!3d-37.985615!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66d1adb8689b1%3A0xbb65bc7a9bd67320!2sCarmotive!5e0!3m2!1sen!2sau!4v1757586625186!5m2!1sen!2sau"
          width={'100%'}
          height={350}
          className="border-[#28475A] border-2 rounded-[10px] relative z-20"
          // style={{ filter: "invert(90%) hue-rotate(180deg)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        </div>
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt color="#BE5161" /> 292 Boundary Road, Dingley Village VIC 3172
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt /> (03) 9551 6555
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> info@carmotive.com.au
          </p>
        </div>
        <div className="flex space-x-4 text-xl">
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

