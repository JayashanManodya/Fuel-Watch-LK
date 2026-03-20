import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Ghost, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';

export function NotFoundPage() {
  const navigate = useNavigate();
  const { theme, t } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <SEO 
        title="404 - Not Found" 
        description="The page you are looking for does not exist."
        url="/404"
      />
      <div className={`min-h-[80vh] flex items-center justify-center px-4 py-12 transition-colors duration-500 ${isDark ? 'bg-[#121212]' : 'bg-gray-50'}`}>
        <div className="relative w-full max-w-lg text-center">
          {/* Background Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/20 blur-[80px] rounded-full animate-pulse [animation-delay:-1s]" />

          <div className={`relative p-8 sm:p-12 rounded-[3rem] backdrop-blur-3xl border shadow-2xl transition-all duration-500 ${
            isDark ? 'bg-card/80 border-border shadow-black/40' : 'bg-white/80 border-white/50 shadow-blue-500/10'
          }`}>
            {/* 404 Illustration */}
            <div className="relative mb-8 inline-block">
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center rotate-12 shadow-2xl transition-all duration-500 ${
                isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600'
              }`}>
                <Ghost className="w-12 h-12" />
              </div>
              <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-2xl flex items-center justify-center -rotate-12 shadow-xl border-2 transition-all duration-500 ${
                isDark ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-red-50 border-white text-red-500'
              }`}>
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>

            <h1 className={`text-6xl font-black tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              4<span className="text-blue-600">0</span>4
            </h1>
            
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              Whoops! Page Not Found
            </h2>
            
            <p className={`text-sm leading-relaxed mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              The page you're looking for might have been moved, deleted, or simply doesn't exist. Let's get you back on track!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(-1)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
                  isDark ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 underline decoration-blue-600/30 underline-offset-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('app.title')}</span>
          </div>
        </div>
      </div>
    </>
  );
}
