import React from 'react';

const SectionTitle = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-brand-gray text-lg max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
