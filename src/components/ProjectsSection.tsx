import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Website',
      description: 'A full-featured e-commerce platform with product listings, cart functionality, and payment processing.',
      image: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['React', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A productivity app for managing tasks, setting deadlines, and tracking progress.',
      image: 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['React', 'Firebase'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Real-time weather information with forecasts, maps, and location-based data.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['JavaScript', 'API'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'A professional portfolio website to showcase skills and projects.',
      image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['React', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for tracking social media performance across platforms.',
      image: 'https://images.pexels.com/photos/35550/ipad-tablet-technology-touch.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['React', 'Chart.js', 'API'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Recipe Finder App',
      description: 'Search for recipes based on ingredients, dietary preferences, and meal types.',
      image: 'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['JavaScript', 'API'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  const filters = ['all', 'React', 'JavaScript', 'Node.js', 'API', 'Firebase'];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one was built to solve a specific problem or learn new technologies.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            >
              <Link to={`/project/${project.id}`} className="block">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
              
              <div className="p-6">
                <Link to={`/project/${project.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live Demo
                  </a>
                  
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:underline"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;