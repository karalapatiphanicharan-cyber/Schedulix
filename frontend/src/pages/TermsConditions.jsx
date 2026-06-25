import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, UserCheck, AlertTriangle, Copyright, HelpCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const TermsConditions = () => {
  const sections = [
    {
      title: "Agreement to Terms",
      content: "By accessing and using Schedulix, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.",
      icon: Scale,
      color: "text-brand-blue"
    },
    {
      title: "Educational Use",
      content: "Schedulix is an educational platform intended for students, educators, and developers. You are granted a non-exclusive, non-transferable, revocable license to access and use the platform strictly in accordance with these terms for educational and personal research purposes.",
      icon: UserCheck,
      color: "text-brand-cyan"
    },
    {
      title: "Accuracy of Simulations",
      content: "While we strive for accuracy, the simulations provided on Schedulix are for educational purposes only. They are simplified models of complex Operating System behaviors. We do not guarantee that the simulation results perfectly reflect real-world kernel performance in all edge cases.",
      icon: AlertTriangle,
      color: "text-yellow-400"
    },
    {
      title: "Intellectual Property",
      content: "The content, original features, and functionality of Schedulix are and will remain the exclusive property of Schedulix and its creators. Our open-source code is available on GitHub under the project's license, but our branding and unique educational content are protected.",
      icon: Copyright,
      color: "text-green-400"
    },
    {
      title: "User Conduct",
      content: "Users agree not to use the platform for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the platform in any way that could damage the platform or general business of Schedulix.",
      icon: FileText,
      color: "text-purple-400"
    },
    {
      title: "Modifications",
      content: "Schedulix reserves the right to revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms and Conditions.",
      icon: HelpCircle,
      color: "text-red-400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <SectionTitle
        title="Terms & Conditions"
        subtitle="The rules and guidelines for using the Schedulix platform."
      />

      <div className="space-y-6 mb-12">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass p-8 flex flex-col md:flex-row gap-6 items-start"
          >
            <div className={`p-4 rounded-2xl bg-white/5 ${section.color}`}>
              <section.icon size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">{section.title}</h3>
              <p className="text-brand-gray text-sm leading-relaxed">{section.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="glass p-8 border-brand-cyan/20 bg-brand-cyan/5 text-center"
      >
        <p className="text-brand-gray text-sm leading-relaxed">
          Last updated: January 2026. For further questions regarding our terms, please contact us via our GitHub repository.
        </p>
      </motion.div>
    </div>
  );
};

export default TermsConditions;
