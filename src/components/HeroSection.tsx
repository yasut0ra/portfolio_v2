import React from 'react';
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
        <div className="absolute inset-0 bg-hero-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
        {/* Gradient Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary-400/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-400/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 backdrop-blur-sm mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Open for new opportunities</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <span className="block text-gray-900 dark:text-white mb-2">Hello, I'm</span>
            <span className="text-gradient">Yasut0ra</span>
          </h1>

          {/* Subheading / Typing Effect */}
          <div className="h-12 mb-8 flex items-center justify-center animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
            <span className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 font-light">
              <span className="typing-text">Full Stack Developer & Researcher</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            Crafting <span className="text-gray-900 dark:text-white font-medium">beautiful</span>, <span className="text-gray-900 dark:text-white font-medium">functional</span>, and <span className="text-gray-900 dark:text-white font-medium">user-centric</span> digital experiences.
            Specializing in <span className="text-primary-600 dark:text-primary-400">Bandit Algorithms</span> and <span className="text-secondary-600 dark:text-secondary-400">Recommendation Systems</span>.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mb-16 animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
            {[
              { icon: Github, href: "https://github.com/yasut0ra", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/takuma-yasuda-7a332533b/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:yastar.tkm83@gmail.com", label: "Email" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : "_blank"}
                rel={social.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                className="p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 hover:scale-110 hover:shadow-lg transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
              </a>
            ))}
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToNextSection}
            className="animate-bounce p-3 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 transition-all duration-300 animate-fade-in opacity-0"
            style={{ animationDelay: '1s' }}
            aria-label="Scroll to next section"
          >
            <ArrowDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;