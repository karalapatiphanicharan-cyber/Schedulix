import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Bell, Globe } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Introduction",
      content: "At Schedulix, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our educational platform. By using Schedulix, you agree to the terms outlined in this policy.",
      icon: Shield,
      color: "text-brand-blue"
    },
    {
      title: "Data Collection & Storage",
      content: "Schedulix is designed as a client-side educational tool. We do not require account registration or collect personal identification information. We use browser Local Storage to save your simulation processes and preferences locally on your device for a better user experience. This data never leaves your computer and is not transmitted to our servers.",
      icon: Lock,
      color: "text-brand-cyan"
    },
    {
      title: "Google AdSense & Cookies",
      content: "We may use Google AdSense to serve advertisements on Schedulix. Google uses cookies to serve ads based on your previous visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting Ads Settings.",
      icon: Eye,
      color: "text-yellow-400"
    },
    {
      title: "Log Files",
      content: "Like most standard website servers, we use log files. This includes internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, platform type, date/time stamp, and number of clicks to analyze trends, administer the site, and track user's movement in the aggregate.",
      icon: FileText,
      color: "text-green-400"
    },
    {
      title: "Third-Party Links",
      content: "Schedulix contains links to other websites, such as our GitHub repository. Please be aware that we are not responsible for the privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of each and every website that collects personally identifiable information.",
      icon: Globe,
      color: "text-purple-400"
    },
    {
      title: "Policy Updates",
      content: "We may update our Privacy Policy from time to time. Any changes will be posted on this page. We encourage you to periodically review this Privacy Policy to stay informed about how we are protecting the information we collect.",
      icon: Bell,
      color: "text-red-400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <SectionTitle
        title="Privacy Policy"
        subtitle="Transparent information about your data and privacy on Schedulix."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass p-8"
          >
            <div className="flex items-center space-x-4 mb-6">
              <section.icon size={28} className={section.color} />
              <h3 className="text-xl font-bold">{section.title}</h3>
            </div>
            <p className="text-brand-gray text-sm leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="glass p-8 border-brand-blue/20 bg-brand-blue/5"
      >
        <h3 className="text-xl font-bold mb-4">Contact Information</h3>
        <p className="text-brand-gray text-sm leading-relaxed">
          If you have any questions or concerns regarding our Privacy Policy, please feel free to reach out to us through our GitHub repository or the contact information provided on our website.
        </p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
