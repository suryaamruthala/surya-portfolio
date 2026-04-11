import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiSend } from 'react-icons/fi';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient inline-block">Get In Touch</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out. I'm always open to new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              
              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary text-primary group-hover:text-white transition-all">
                  <FiMail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Email</p>
                  <p className="text-lg font-semibold">contact@example.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-secondary/10 rounded-2xl group-hover:bg-secondary text-secondary group-hover:text-white transition-all">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Location</p>
                  <p className="text-lg font-semibold">Andhra Pradesh, India</p>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex gap-4">
                <a href="https://github.com/suryaamruthala" target="_blank" rel="noreferrer" className="p-4 glass glass-hover rounded-2xl text-gray-400 hover:text-primary">
                  <FiGithub size={24} />
                </a>
                <a href="#" className="p-4 glass glass-hover rounded-2xl text-gray-400 hover:text-primary">
                  <FiLinkedin size={24} />
                </a>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent">
              <h4 className="text-xl font-bold mb-2">Available for Freelance</h4>
              <p className="text-gray-400">I'm currently taking on new projects and collaborations.</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="glass p-10 rounded-3xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-5 py-4 bg-white/5 border border-border rounded-2xl focus:outline-none focus:border-primary transition-colors text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 bg-white/5 border border-border rounded-2xl focus:outline-none focus:border-primary transition-colors text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Message</label>
                <textarea 
                  rows="5" 
                  placeholder="How can I help you?"
                  className="w-full px-5 py-4 bg-white/5 border border-border rounded-2xl focus:outline-none focus:border-primary transition-colors text-white resize-none"
                ></textarea>
              </div>
              <button 
                type="button"
                className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/30"
              >
                Send Message <FiSend size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
