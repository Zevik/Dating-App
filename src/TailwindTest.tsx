import React from 'react';

const TailwindTest: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-500">Tailwind Test</h1>
      <div className="mt-4 p-4 bg-red-500 text-white">
        This should have a red background if Tailwind is working
      </div>
      <div className="mt-4 p-4 border border-gray-200">
        This should have a gray border if Tailwind is working
      </div>
    </div>
  );
};

export default TailwindTest; 