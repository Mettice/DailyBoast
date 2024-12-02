import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAuth } from '../providers/AuthProvider';
import { Heart, Sparkles, TrendingUp, ArrowRight, Star, Users, Shield, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await login();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const faqs = [
    {
      question: "How does mood tracking work?",
      answer: "Our intuitive system lets you log your daily moods with just a few clicks. You can track multiple aspects of your emotional state and add notes for context."
    },
    {
      question: "Are the tips personalized?",
      answer: "Yes! We analyze your mood patterns to provide tailored wellbeing advice that's relevant to your emotional journey."
    },
    {
      question: "Is my data private?",
      answer: "Absolutely. Your privacy is our priority. All your data is encrypted and securely stored, and we never share your personal information."
    },
    {
      question: "Can I track my progress over time?",
      answer: "Yes! You can view detailed insights about your emotional wellbeing journey through charts, trends, and progress reports."
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold text-purple-700">DailyBoast</h1>
          <button
            onClick={handleSignIn}
            className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
          >
            Sign in
          </button>
        </header>

        {/* Add this after the header */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full blur-3xl" />

        {/* Hero Section */}
        <main className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-12"
          >
            <motion.h2 
              className="text-6xl font-bold text-purple-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Welcome to DailyBoast
            </motion.h2>
            <motion.p 
              className="text-xl text-purple-700 max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Track your moods, get daily tips, and boost your wellbeing
            </motion.p>

            {/* Primary CTA */}
            <motion.div className="flex gap-6 justify-center items-center">
              <button
                onClick={handleSignIn}
                className="px-8 py-3 bg-purple-600 text-white rounded-full text-lg font-medium hover:bg-purple-700 transition-all flex items-center gap-2 group"
              >
                Get Started 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {/* Add demo/tour functionality */}}
                className="px-8 py-3 text-purple-600 rounded-full text-lg font-medium hover:bg-purple-50 transition-all"
              >
                See Demo
              </button>
            </motion.div>

            {/* How it Works */}
            <section className="py-32 relative">
              <h3 className="text-3xl font-bold text-purple-900 mb-20">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {[
                  {
                    icon: Heart,
                    title: "Track Moods",
                    description: "Monitor your emotional journey daily with our intuitive mood tracking system"
                  },
                  {
                    icon: Sparkles,
                    title: "Get Tips",
                    description: "Receive personalized wellbeing advice based on your mood patterns"
                  },
                  {
                    icon: TrendingUp,
                    title: "Track Progress",
                    description: "Visualize your growth and celebrate your wellbeing journey"
                  }
                ].map((feature) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                    className="text-center cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="mb-6"
                    >
                      <feature.icon className="w-12 h-12 text-purple-600 mx-auto" />
                    </motion.div>
                    <h4 className="text-xl font-semibold text-purple-900 mb-4">{feature.title}</h4>
                    <p className="text-purple-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Social Proof */}
            <section className="py-24">
              <h3 className="text-3xl font-bold text-purple-900 mb-16">Trusted by Users</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    quote: "DailyBoast has transformed how I understand my emotions. Highly recommended!",
                    author: "Sarah K.",
                    role: "Daily User"
                  },
                  {
                    quote: "The personalized tips are incredibly helpful. It's like having a wellness coach in your pocket.",
                    author: "Michael R.",
                    role: "Premium Member"
                  },
                  {
                    quote: "Simple yet powerful. Love tracking my progress and seeing the positive changes.",
                    author: "Emma L.",
                    role: "Active User"
                  }
                ].map((testimonial) => (
                  <motion.div
                    key={testimonial.author}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="text-center px-4 relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <div className="flex gap-1 justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.quote}</p>
                    <div>
                      <p className="font-semibold text-purple-900">{testimonial.author}</p>
                      <p className="text-purple-600">{testimonial.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24">
              <h3 className="text-3xl font-bold text-purple-900 mb-12">Frequently Asked Questions</h3>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="border-b border-purple-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full py-6 flex justify-between items-center text-left"
                    >
                      <span className="text-lg font-medium text-purple-900">{faq.question}</span>
                      {openFaq === index ? (
                        <Minus className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Plus className="w-5 h-5 text-purple-600" />
                      )}
                    </button>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: openFaq === index ? 'auto' : 0,
                        opacity: openFaq === index ? 1 : 0
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-purple-600">{faq.answer}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-16">
              <div className="bg-purple-700 text-white rounded-3xl p-16 text-center">
                <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
                <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of users who are already improving their wellbeing with DailyBoast
                </p>
                <button
                  onClick={handleSignIn}
                  className="px-8 py-4 bg-white text-purple-700 rounded-full text-lg font-medium hover:bg-purple-50 transition-all"
                >
                  Get Started Now
                </button>
              </div>
            </section>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="py-16 border-t border-purple-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-4">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-purple-900">DailyBoast</h4>
              <p className="text-purple-600">Empowering your emotional wellbeing journey</p>
              <div className="flex gap-4">
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-purple-900 mb-4">Product</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-purple-600 hover:text-purple-700">Features</a></li>
                <li><a href="#" className="text-purple-600 hover:text-purple-700">Pricing</a></li>
                <li><a href="#" className="text-purple-600 hover:text-purple-700">Demo</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-purple-900 mb-4">Support</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-purple-600 hover:text-purple-700">Help Center</a></li>
                <li><a href="#" className="text-purple-600 hover:text-purple-700">Contact Us</a></li>
                <li><a href="#" className="text-purple-600 hover:text-purple-700">Privacy</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-purple-900 mb-4">Company</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-purple-600 hover:text-purple-700">About</a></li>
                <li><a href="#" className="text-purple-600 hover:text-purple-700">Blog</a></li>
                <li><a href="#" className="text-purple-600 hover:text-purple-700">Careers</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center text-purple-600">
            <p>© 2024 DailyBoast. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}; 