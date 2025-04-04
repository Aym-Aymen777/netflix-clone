import React from 'react';
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

const Footer = ({ companyInfo }) => {
  const socialLinks = [
    { url: 'https://github.com/Aym-Aymen777', icon: <FaGithub className="h-6 w-6" /> },
    { url: 'https://www.linkedin.com/in/c-aymen/', icon: <FaLinkedin className="h-6 w-6" /> },
    { url: 'https://www.upwork.com/freelancers/~01248982caa9938fcc', icon: <SiUpwork className="h-6 w-6" /> }
  ];

  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold tracking-wide mb-6">
              About Us
            </h4>
            <p className="text-gray-400 leading-relaxed">
              {companyInfo}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold tracking-wide mb-6">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-red-500 transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/projects" className="hover:text-red-500 transition-colors duration-300">
                  Projects
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-red-500 transition-colors duration-300">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-red-500 transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold tracking-wide mb-6">
              Connect With Us
            </h4>
            <div className="flex space-x-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 hover:scale-110"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  companyInfo: PropTypes.string,
};

Footer.defaultProps = {
  companyInfo: 'Specializing in cutting-edge web development and innovative digital solutions. Transforming ideas into exceptional digital experiences.',
};

export default Footer;