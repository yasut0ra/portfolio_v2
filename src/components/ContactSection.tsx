import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageCircle, User, FileText, Sparkles } from 'lucide-react';

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
      icon: Mail,
      title: 'Email',
      content: 'yastar.tkm83@gmail.com',
      link: 'mailto:yastar.tkm83@gmail.com',
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Hokkaido, Japan',
      link: '#',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      icon: MessageCircle,
      title: 'Social',
      content: 'DM Open',
      link: 'https://twitter.com/yasut0ra',
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Contact <span className="text-gradient">Me</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            ご質問やご意見があれば、お気軽にご連絡ください。<br />
            新しいプロジェクトやコラボレーションの機会をお待ちしています。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="flex items-center p-4 rounded-xl glass-card hover:-translate-y-1 transition-transform duration-300"
              >
                <div className={`p-3 rounded-lg ${item.bg} ${item.color} mr-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.title}</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">{item.content}</p>
                </div>
              </a>
            ))}

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-lg mt-8">
              <h3 className="text-xl font-bold mb-2">Let's Work Together!</h3>
              <p className="text-primary-100 text-sm mb-4">
                新しいアイデアを現実にしましょう。あなたのプロジェクトをお聞かせください。
              </p>
              <div className="w-full h-32 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 rounded-2xl">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Send className="w-6 h-6 text-primary-500" />
                  Send Message
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  プロジェクトのご相談、技術的な質問、コラボレーションのご提案など、何でもお気軽にお聞かせください。
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="お名前"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="メールアドレス"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="件名"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      placeholder="お問い合わせ内容をご記入ください。"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>

                {feedback && (
                  <div className={`p-4 rounded-xl text-sm font-medium text-center ${feedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                    {feedback.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
