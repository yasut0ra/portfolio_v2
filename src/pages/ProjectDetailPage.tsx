import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Users, Code } from 'lucide-react';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // This would typically come from an API or database
  const project = {
    id: 1,
    title: 'E-Commerce Website',
    description: 'A full-featured e-commerce platform with product listings, cart functionality, and payment processing.',
    longDescription: `
      This e-commerce platform was built to provide a seamless shopping experience for users. 
      The project features a responsive design, real-time inventory management, secure payment processing, 
      and an intuitive admin dashboard for managing products and orders.
    `,
    image: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
    date: 'March 2024',
    team: ['Lead Developer', 'UI/UX Designer', 'Backend Developer'],
    features: [
      'User authentication and authorization',
      'Product catalog with search and filtering',
      'Shopping cart and wishlist functionality',
      'Secure payment processing with Stripe',
      'Order tracking and history',
      'Admin dashboard for inventory management',
      'Responsive design for all devices',
      'Real-time inventory updates'
    ],
    technologies: [
      'React for the frontend UI',
      'Node.js and Express for the backend API',
      'MongoDB for the database',
      'Redux for state management',
      'Stripe for payment processing',
      'JWT for authentication',
      'Tailwind CSS for styling'
    ],
    screenshots: [
      'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6956904/pexels-photo-6956904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6956905/pexels-photo-6956905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  };

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Project Header */}
          <div className="relative h-96">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex items-end">
              <div className="p-8">
                <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
                <p className="text-gray-200 text-lg max-w-2xl">{project.description}</p>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="p-8">
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{project.date}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{project.tags.join(', ')}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{project.team.join(', ')}</span>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live
              </a>
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <Github className="h-4 w-4 mr-2" />
                View Code
              </a>
            </div>

            {/* Project Details */}
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Overview</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">{project.longDescription}</p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-8">
                {project.features.map((feature, index) => (
                  <li key={index} className="mb-2">{feature}</li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Technologies Used</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {project.technologies.map((tech, index) => (
                  <div key={index} className="flex items-start">
                    <Code className="h-5 w-5 text-blue-500 mr-2 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Screenshots</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img 
                      src={screenshot} 
                      alt={`Screenshot ${index + 1}`} 
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailPage;