import React from 'react';
import { Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Header/Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          {/* Profile Section */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative -mt-20 w-40 h-40">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt="Profile"
                  className="w-full h-full rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg"
                />
              </div>
              <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Name</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">Full Stack Developer</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">your.email@example.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Tokyo, Japan</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About Me</h2>
            <p className="text-gray-700 dark:text-gray-300">
              A passionate Full Stack Developer with 5+ years of experience in building web applications.
              Specialized in React, Node.js, and modern web technologies. Always eager to learn new
              technologies and tackle challenging projects.
            </p>
          </div>

          {/* Experience */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Experience</h2>
            <div className="space-y-6">
              <div className="flex">
                <Briefcase className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Senior Developer</h3>
                  <p className="text-gray-600 dark:text-gray-400">Tech Company Inc. • 2020 - Present</p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    Led development of multiple web applications using React and Node.js.
                    Mentored junior developers and implemented best practices.
                  </p>
                </div>
              </div>
              <div className="flex">
                <Briefcase className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Full Stack Developer</h3>
                  <p className="text-gray-600 dark:text-gray-400">Web Solutions Ltd. • 2018 - 2020</p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    Developed and maintained client websites and applications.
                    Worked with various technologies including React, Vue.js, and Laravel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Education</h2>
            <div className="flex">
              <GraduationCap className="h-5 w-5 text-blue-500 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="text-gray-600 dark:text-gray-400">University Name • 2014 - 2018</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Certifications</h2>
            <div className="space-y-4">
              <div className="flex">
                <Award className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    AWS Certified Developer
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Amazon Web Services • 2022</p>
                </div>
              </div>
              <div className="flex">
                <Award className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Professional Scrum Master I
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Scrum.org • 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;