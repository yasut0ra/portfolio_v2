import React, { useState } from 'react';
import { Mail, MapPin, Send, Phone, MessageCircle, User, FileText } from 'lucide-react';

const CONTACT_EMAIL = 'yastar.tkm83@gmail.com';
const createInitialFormState = () => ({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState(createInitialFormState());

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setFeedback(null);
  };

  const buildMailtoLink = () => {
    const subject = encodeURIComponent(`[Portfolio Contact] ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const mailtoLink = buildMailtoLink();

      if (typeof window !== 'undefined') {
        window.location.href = mailtoLink;
      } else {
        throw new Error('Mail client unavailable');
      }

      setFeedback({
        type: 'success',
        message: `メール作成画面が開きます。開かない場合は ${CONTACT_EMAIL} まで直接ご連絡ください。`
      });
      setFormData(createInitialFormState());
    } catch (error) {
      console.error('Failed to trigger mail client', error);
      setFeedback({
        type: 'error',
        message: `メールリンクを開けませんでした。${CONTACT_EMAIL} まで直接ご連絡ください。`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-7 w-7" />,
      title: 'メールアドレス',
      content: 'yastar.tkm83@gmail.com',
      link: 'mailto:yastar.tkm83@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Phone className="h-7 w-7" />,
      title: '電話番号',
      content: '非公開',
      link: '#',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <MapPin className="h-7 w-7" />,
      title: '住所',
      content: '北海道, 日本',
      link: '#',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Me</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            ご質問やご意見があれば、お気軽にご連絡ください。<br />
            新しいプロジェクトやコラボレーションの機会をお待ちしています。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <a 
              key={index} 
              href={item.link}
              className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl text-center transform hover:-translate-y-2 transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{item.content}</p>
            </a>
          ))}
        </div>
        
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                  お問い合わせ
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  プロジェクトのご相談、技術的な質問、コラボレーションのご提案など、何でもお気軽にお聞かせください。
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white backdrop-blur-sm transition-all duration-300"
                    placeholder="お名前"
                  />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white backdrop-blur-sm transition-all duration-300"
                    placeholder="メールアドレス"
                  />
                </div>
                
                <div className="relative">
                  <FileText className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white backdrop-blur-sm transition-all duration-300"
                    placeholder="件名"
                  />
                </div>
                
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    rows={6} 
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white backdrop-blur-sm transition-all duration-300 resize-none"
                    placeholder="お問い合わせ内容をご記入ください。"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group w-full inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl disabled:transform-none disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      送信中...
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      送信
                    </>
                  )}
                </button>
                {feedback && (
                  <p
                    className={`text-sm font-semibold text-center ${
                      feedback.type === 'success'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {feedback.message}
                  </p>
                )}
              </form>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 dark:from-blue-400/20 dark:to-purple-400/20"></div>
              <div className="h-full w-full bg-cover bg-center relative" style={{ backgroundImage: "url('/images/contact-bg.png')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h4 className="text-white text-2xl font-bold mb-2">Let's Work Together</h4>
                  <p className="text-gray-200">
                    新しいアイデアを現実にしましょう。あなたのプロジェクトをお聞かせください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
