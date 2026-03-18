import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { X, Fuel, BookOpen, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'fuel-alert-contribute-popup-v2';

export function ContributePopup() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setOpen(true), 1400);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setOpen(false);
  };

  const goToGuide = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setOpen(false);
    navigate('/guide');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9000] flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

      {/* Card */}
      <div
        className={`relative w-full max-w-md rounded-3xl shadow-2xl border overflow-hidden animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300 ${
          isDark ? 'bg-[#1c1c1e] border-[#2a2a2a]' : 'bg-white border-[#dadce0]'
        }`}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors z-10 ${
            isDark ? 'hover:bg-white/10 text-gray-500' : 'hover:bg-[#f1f3f4] text-gray-400'
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero strip — uses the app primary blue #1a73e8 */}
        <div
          className={`relative px-6 pt-7 pb-6 overflow-hidden ${
            isDark
              ? 'bg-[#1a2a3a]'
              : 'bg-[#e8f0fe]'
          }`}
          style={isDark
            ? { background: 'linear-gradient(135deg, #0d1f33 0%, #0a2540 60%, #0d1b2a 100%)' }
            : { background: 'linear-gradient(135deg, #e8f0fe 0%, #d2e3fc 60%, #e8f0fe 100%)' }
          }
        >
          {/* decorative blobs */}
          <div
            className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-20"
            style={{ background: '#1a73e8' }}
          />
          <div
            className="absolute -bottom-10 -left-6 w-24 h-24 rounded-full opacity-10"
            style={{ background: '#1a73e8' }}
          />

          {/* Brand row */}
          <div className="relative flex items-center gap-3 mb-5">
            <div
              className="p-3 rounded-2xl"
              style={{ background: isDark ? 'rgba(26,115,232,0.25)' : 'rgba(26,115,232,0.15)' }}
            >
              <Fuel className="w-6 h-6" style={{ color: '#1a73e8' }} />
            </div>
            <div>
              <p className="text-base font-black tracking-tight" style={{ color: '#1a73e8' }}>
                Fuel Alert
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3" style={{ color: isDark ? '#5ba3f5' : '#1a73e8' }} />
                <span
                  className="text-[11px] font-bold"
                  style={{ color: isDark ? '#5ba3f5' : '#1558b0' }}
                >
                  Community powered
                </span>
              </div>
            </div>
          </div>

          {/* Trilingual greeting */}
          <div className="relative">
            <h2
              className="text-2xl font-black tracking-tight leading-snug"
              style={{ color: isDark ? '#f5f5f5' : '#202124' }}
            >
              Welcome!{' '}
              <span style={{ color: '#1a73e8' }}>ආයුබෝවන්!</span>
            </h2>
            <p
              className="text-sm font-bold mt-1"
              style={{ color: isDark ? '#5ba3f5' : '#1558b0' }}
            >
              வணக்கம்! — Let&apos;s build this together.
            </p>
          </div>
        </div>

        {/* Language blocks */}
        <div className="px-5 pt-4 pb-2 space-y-3">

          {/* English */}
          <div
            className="rounded-2xl p-4 border"
            style={isDark
              ? { background: 'rgba(26,115,232,0.08)', borderColor: 'rgba(26,115,232,0.2)' }
              : { background: '#e8f0fe', borderColor: '#d2e3fc' }
            }
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#1a73e8' }} />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#1a73e8' }}>
                English
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#202124]'}`}>
              You can help thousands of drivers! When you&apos;re at a fuel station, share the latest
              availability details. Your small contribution makes a huge difference for the community.
            </p>
          </div>

          {/* Sinhala */}
          <div
            className="rounded-2xl p-4 border"
            style={isDark
              ? { background: 'rgba(26,115,232,0.05)', borderColor: 'rgba(26,115,232,0.15)' }
              : { background: '#f0f4ff', borderColor: '#c5d5fb' }
            }
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#4285f4' }} />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#4285f4' }}>
                සිංහල
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#202124]'}`}>
              ඔබ ඉන්ධන පිරවුම්හලක සිටින විට, නවතම ඉන්ධන තොරතුරු දායක කරන්න. ඔබේ කුඩා
              ​උදව්ව රියදුරන් දහස් ගණනකට ප්‍රයෝජනවත් වේ!
            </p>
          </div>

          {/* Tamil */}
          <div
            className="rounded-2xl p-4 border"
            style={isDark
              ? { background: 'rgba(26,115,232,0.03)', borderColor: 'rgba(26,115,232,0.12)' }
              : { background: '#eef2ff', borderColor: '#bdc8fa' }
            }
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#669df6' }} />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#669df6' }}>
                தமிழ்
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#202124]'}`}>
              நீங்கள் எரிபொருள் நிலையத்தில் இருக்கும்போது, சமீபத்திய தகவல்களை பகிரவும். உங்கள்
              சிறிய உதவி ஆயிரக்கணக்கான ஓட்டுநர்களுக்கு பயனுள்ளதாக இருக்கும்!
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="px-5 pt-3 pb-6 flex gap-3">
          <button
            onClick={dismiss}
            className={`flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-95 ${
              isDark ? 'bg-white/8 text-gray-400 hover:bg-white/12' : 'bg-[#f1f3f4] text-[#5f6368] hover:bg-[#e8eaed]'
            }`}
          >
            Maybe Later
          </button>
          <button
            onClick={goToGuide}
            className="flex-[2] flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl text-white text-sm font-black transition-all active:scale-95"
            style={{ background: '#1a73e8', boxShadow: '0 4px 20px rgba(26,115,232,0.35)' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1558b0')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1a73e8')}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>View the Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
}
