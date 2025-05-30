import React from 'react';
import { BookOpen, Users, Calendar, FileText, ExternalLink, Award } from 'lucide-react';

interface Publication {
  id: number;
  title: string;
  authors: string[];
  conference: string;
  year: string;
  abstract: string;
  doi: string;
  pdf?: string;
  citations: number;
}

interface ResearchInterest {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ResearchPage: React.FC = () => {
  const publications: Publication[] = [
    {
      id: 1,
      title: "Deep Learning Approaches for Natural Language Processing in Japanese Text Analysis",
      authors: ["Your Name", "Co-author One", "Co-author Two"],
      conference: "International Conference on Natural Language Processing (ICNLP 2023)",
      year: "2023",
      abstract: "This paper presents novel deep learning approaches for processing Japanese text, introducing innovative methods for tokenization and semantic analysis...",
      doi: "10.1000/example.2023.1234",
      pdf: "https://example.com/paper.pdf",
      citations: 12
    },
    {
      id: 2,
      title: "Efficient Neural Network Architectures for Real-time Language Processing",
      authors: ["Your Name", "Co-author Three"],
      conference: "ACM Conference on Artificial Intelligence (ACM AI 2022)",
      year: "2022",
      abstract: "We propose a new neural network architecture optimized for real-time language processing, achieving state-of-the-art performance while maintaining low latency...",
      doi: "10.1000/example.2022.5678",
      citations: 25
    }
  ];

  const researchInterests: ResearchInterest[] = [
    {
      title: "Natural Language Processing",
      description: "Focus on developing efficient algorithms for processing and understanding human language, particularly Japanese text analysis.",
      icon: <BookOpen className="h-8 w-8 text-blue-500" />
    },
    {
      title: "Deep Learning",
      description: "Research on neural network architectures and their applications in real-world problems.",
      icon: <Users className="h-8 w-8 text-blue-500" />
    },
    {
      title: "Machine Learning",
      description: "Exploring novel approaches to machine learning with applications in natural language processing and computer vision.",
      icon: <Award className="h-8 w-8 text-blue-500" />
    }
  ];

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Research <span className="text-blue-600 dark:text-blue-400">Work</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Exploring the frontiers of Natural Language Processing and Machine Learning
          </p>
        </div>

        {/* Research Interests */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Research Interests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchInterests.map((interest, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="mb-4">{interest.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {interest.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Publications
          </h2>
          <div className="space-y-6">
            {publications.map(pub => (
              <article key={pub.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {pub.title}
                </h3>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {pub.authors.join(", ")}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pub.year}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {pub.citations} citations
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong className="text-gray-900 dark:text-white">Conference:</strong> {pub.conference}
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {pub.abstract}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    DOI
                  </a>
                  {pub.pdf && (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      PDF
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResearchPage;