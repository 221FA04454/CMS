import React from 'react';

export const Hero = ({ title, subtitle, color = 'indigo' }) => {
  const bgColors = {
    indigo: 'bg-indigo-600',
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600'
  };

  return (
    <div className={`${bgColors[color] || bgColors.indigo} py-20 text-white text-center rounded-2xl`}>
      <h2 className="text-5xl font-black mb-4">{title}</h2>
      <p className="text-xl opacity-90">{subtitle}</p>
    </div>
  );
};
