import { useAuth } from '../providers/AuthProvider';
import { Navigate } from 'react-router-dom';
import { AuthButton } from '../components/AuthButton';
import { motion } from 'framer-motion';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-900">DailyBoast</h1>
          <AuthButton />
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <h2 className="text-5xl font-bold text-purple-900">
            Welcome to DailyBoast
          </h2>
          <p className="text-xl text-purple-700">
            Track your moods, get daily tips, and boost your wellbeing
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-purple-800">Track Moods</h3>
              <p className="text-purple-600 mt-2">Monitor your emotional journey daily</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-purple-800">Get Tips</h3>
              <p className="text-purple-600 mt-2">Receive personalized wellbeing advice</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-purple-800">Track Progress</h3>
              <p className="text-purple-600 mt-2">See your growth over time</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}; 