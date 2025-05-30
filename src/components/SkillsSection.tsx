import React from 'react';

interface Skill {
  name: string;
  percentage: number;
  color: string;
}

const SkillsSection: React.FC = () => {
  const technicalSkills: Skill[] = [
    { name: 'JavaScript/TypeScript', percentage: 90, color: 'bg-blue-600 dark:bg-blue-500' },
    { name: 'React', percentage: 85, color: 'bg-blue-500 dark:bg-blue-400' },
    { name: 'Node.js', percentage: 80, color: 'bg-teal-600 dark:bg-teal-500' },
    { name: 'HTML/CSS', percentage: 95, color: 'bg-purple-600 dark:bg-purple-500' },
    { name: 'Database Design', percentage: 75, color: 'bg-indigo-600 dark:bg-indigo-500' },
    { name: 'UI/UX Design', percentage: 70, color: 'bg-pink-600 dark:bg-pink-500' },
  ];

  const softSkills: Skill[] = [
    { name: 'Problem Solving', percentage: 95, color: 'bg-orange-600 dark:bg-orange-500' },
    { name: 'Communication', percentage: 85, color: 'bg-green-600 dark:bg-green-500' },
    { name: 'Team Collaboration', percentage: 90, color: 'bg-yellow-600 dark:bg-yellow-500' },
    { name: 'Project Management', percentage: 80, color: 'bg-red-600 dark:bg-red-500' },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Here are my skills and areas of expertise that I've developed over the years
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Technical Skills
            </h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
                    <span className="text-gray-800 dark:text-gray-200">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`${skill.color} h-2.5 rounded-full skill-progress`} 
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Soft Skills
            </h3>
            <div className="space-y-6">
              {softSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
                    <span className="text-gray-800 dark:text-gray-200">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`${skill.color} h-2.5 rounded-full skill-progress`} 
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {['JavaScript', 'TypeScript', 'React', 'Node.js', 'HTML5', 'CSS3', 'Git', 'MongoDB', 'GraphQL', 'AWS', 'Docker', 'Figma'].map((tech, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md flex items-center justify-center text-center transform hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="text-gray-800 dark:text-gray-200 font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;