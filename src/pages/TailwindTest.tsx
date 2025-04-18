import React, { useState } from 'react';

const TailwindTest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Tailwind CSS Features Demo</h1>
      
      {/* Responsive design section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Responsive Design</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-purple-100 p-4 rounded-lg shadow">Box 1</div>
          <div className="bg-purple-200 p-4 rounded-lg shadow">Box 2</div>
          <div className="bg-purple-300 p-4 rounded-lg shadow">Box 3</div>
          <div className="bg-purple-400 p-4 rounded-lg shadow">Box 4</div>
        </div>
        <p className="mt-2 text-sm text-gray-600">Resize your browser to see how the grid adapts.</p>
      </section>
      
      {/* Hover and focus effects */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hover & Focus Effects</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300">
            Hover Me
          </button>
          <input 
            type="text" 
            placeholder="Focus me" 
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </section>
      
      {/* Transitions and animations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transitions & Animations</h2>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="px-4 py-2 bg-green-500 text-white rounded mb-2"
        >
          Toggle Panel
        </button>
        <div 
          className={`bg-green-100 rounded-lg p-6 overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p>This panel smoothly animates in and out when toggled.</p>
        </div>
      </section>
      
      {/* Flexbox layout */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Flexbox Layout</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-100 p-4 rounded-lg">
          <div className="bg-red-200 p-4 rounded">Flex Item 1</div>
          <div className="bg-red-300 p-4 rounded">Flex Item 2</div>
          <div className="bg-red-400 p-4 rounded">Flex Item 3</div>
        </div>
      </section>
      
      {/* Utility classes */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Utility Classes</h2>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium">
              Responsive text sizing
            </p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg shadow-md truncate w-64">
            <p>This text is truncated with an ellipsis if it's too long to fit in its container. Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="flex space-x-2">
            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Tag 1</span>
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">Tag 2</span>
            <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">Tag 3</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TailwindTest; 