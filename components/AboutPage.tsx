
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-orbitron font-bold text-cyan-400">About CodeAI</h1>
        <p className="text-gray-400 mt-2">The Future of Software Development is Here.</p>
      </div>

      <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-8 space-y-6 text-gray-300">
        <p>
          CodeAI is a conceptual, next-generation platform designed to revolutionize the way developers write, debug, and optimize code. Our mission is to provide an intelligent, seamless coding assistant that integrates directly into your development environment, starting with our flagship VS Code extension.
        </p>
        <p>
          Powered by Google's state-of-the-art Gemini models, CodeAI offers a suite of powerful tools accessible through a futuristic, intuitive interface. Whether you're generating complex algorithms from scratch, seeking clear explanations for legacy code, hunting down elusive bugs, or optimizing for peak performance, CodeAI is your ever-present partner.
        </p>
        
        <div className="pt-4">
          <h2 className="text-2xl font-orbitron text-cyan-300 mb-4">Core Philosophy</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-white">Developer-Centric Design:</span> Every feature is built with the developer's workflow in mind, aiming to reduce friction and enhance productivity.</li>
            <li><span className="font-semibold text-white">Power and Simplicity:</span> We harness the complexity of advanced AI models and present them through simple, accessible tools.</li>
            <li><span className="font-semibold text-white">Continuous Innovation:</span> The world of AI and software development is constantly evolving, and so are we. We are committed to staying at the forefront of technology to bring you the best tools possible.</li>
          </ul>
        </div>
        
        <p className="pt-4 border-t border-gray-700">
          This application serves as a comprehensive project brief and interactive mockup, showcasing the vision and core functionality of the CodeAI platform.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
