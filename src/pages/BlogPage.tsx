import React from 'react';
import { ExternalLink, BookOpen, Calendar } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  platform: 'Zenn' | 'Qiita';
  url: string;
  likes: number;
}

const BlogPage: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'React Performance Optimization Tips',
      description: 'Learn how to optimize your React applications for better performance.',
      date: '2024-03-15',
      platform: 'Zenn',
      url: 'https://zenn.dev/your-username/articles/react-performance',
      likes: 125
    },
    {
      id: 2,
      title: 'Getting Started with TypeScript',
      description: 'A comprehensive guide to TypeScript for JavaScript developers.',
      date: '2024-03-10',
      platform: 'Qiita',
      url: 'https://qiita.com/your-username/items/typescript-guide',
      likes: 89
    },
    {
      id: 3,
      title: 'Modern CSS Techniques',
      description: 'Exploring modern CSS features and best practices.',
      date: '2024-03-05',
      platform: 'Zenn',
      url: 'https://zenn.dev/your-username/articles/modern-css',
      likes: 156
    },
    {
      id: 4,
      title: 'Node.js Best Practices',
      description: 'Essential best practices for Node.js development.',
      date: '2024-02-28',
      platform: 'Qiita',
      url: 'https://qiita.com/your-username/items/nodejs-best-practices',
      likes: 234
    }
  ];

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical <span className="text-blue-600 dark:text-blue-400">Blog</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Articles and tutorials about web development, programming, and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {blogPosts.map(post => (
            <article 
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    post.platform === 'Zenn' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {post.platform}
                  </span>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {post.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{post.likes} likes</span>
                  </div>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Read More
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center space-x-6">
          <a
            href="https://zenn.dev/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2">Follow on Zenn</span>
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href="https://qiita.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <span className="mr-2">Follow on Qiita</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;