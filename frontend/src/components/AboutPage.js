import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="about-page">
      

      {/* HERO SECTION */}
      <div className="relative h-[60vh] w-full">
        <img
          src="/images/drop2.jpg"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          alt="Water background"
        />

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4"
          >
            About AquaLink
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl max-w-2xl"
          >
            Transforming access to clean water through data, innovation, and
            community-driven technology.
          </motion.p>
        </div>
      </div>
      

      {/* MISSION & VISION */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
          Our Mission & Vision
        </h2>

        <div className="grid md:grid-cols-2 gap-10 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="p-8 bg-blue-50 rounded-xl shadow-lg border border-blue-200"
          >
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Our Mission
            </h3>
            <p className="text-default"> </p>

            <p className="text-gray-700 leading-relaxed">
              To provide communities with real-time data on water points, helping
              them find safe, accessible, and reliable water sources quickly and
              efficiently.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="p-8 bg-blue-50 rounded-xl shadow-lg border border-blue-200"
          >
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
               Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              A world where every community has transparent, smart access to clean
              water — powered by data and community collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE / JOURNEY */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
          Our Journey
        </h2>

        <div className="max-w-4xl mx-auto px-6">
          <div className="border-l-4 border-blue-600 pl-6 space-y-10">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-blue-800">
                2025  June – The Idea Was Born
              </h3>
              <p className="text-gray-700">
                AquaLink started as a simple idea: reduce wasted time and improve
                access to water resources in underserved communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-blue-800">
                2025  – Prototype & Testing
              </h3>
              <p className="text-gray-700">
                We tested early versions with communities, collecting feedback to
                improve usability and accuracy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-blue-800">
                2025 November– Public Launch
              </h3>
              <p className="text-gray-700">
                AquaLink is now fully developed, scalable, and ready to empower
                thousands of users globally.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
          Meet The Team
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">

          {[
            { name: "Beverly Chikoti", role: "Lead Developer", img: "/images/lee.jpg" },
            { name: "AquaLink AI", role: "System Intelligence", img: "/images/ai.jpg" },
            { name: "Project Mentor :Roxanne Weasely", role: "Advisor", img: "/images/bev.jpg" },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 text-center border border-blue-200"
            >
              <img
                src={member.img}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-300 object-cover"
                alt={member.name}
              />
              <h3 className="text-xl font-semibold text-blue-900">{member.name}</h3>
              <p className="text-gray-700">{member.role}</p>
            </motion.div>
          ))}

        </div>
      </section>

     
    </div>
  );
}
