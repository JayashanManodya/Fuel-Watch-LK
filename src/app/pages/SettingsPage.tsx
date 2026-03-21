import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ArrowLeft, Moon, Sun, Globe, ChevronRight, CheckCircle2, Home, Settings, MessageSquare, Info, BookOpen, Bell, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { toast, Toaster } from 'sonner';
import { MapView } from '../components/MapView';
import { fetchFuelStations } from '../services/osmService';
import type { FuelStation } from '../types';
import { useStationWatchList } from '../hooks/useStationWatchList';
import { removeWatchedStation } from '../services/stationWatchStorage';

export function SettingsPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme, language, setLanguage, t } = useTheme();
  const [stations, setStations] = useState<FuelStation[]>([]);
  const watchedStations = useStationWatchList();

  useEffect(() => {
    fetchFuelStations().then(setStations);
  }, []);

  const languages = [
    { id: 'en', name: 'English', native: 'English' },
    { id: 'si', name: 'Sinhala', native: 'සිංහල' },
    { id: 'ta', name: 'Tamil', native: 'தமிழ்' }
  ] as const;

  return (
    <>
      <SEO
        title="Settings"
        description="Customize your Fuel Alert experience. Change language (English, Sinhala, Tamil), switch dark/light theme, and manage your preferences."
        url="/settings"
        noIndex={true}
      />
      <Toaster position="top-center" richColors />
      
      <div className={`flex flex-col lg:flex-row h-[100dvh] min-h-0 overflow-hidden ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white/50 text-gray-900'} transition-colors duration-500`}>
        {/* Settings Side Panel — flex-1 + min-h-0 so overflow-y-auto can scroll on small screens */}
        <aside className={`
          flex flex-col flex-1 min-h-0 w-full lg:flex-none lg:w-[400px] xl:w-[450px] lg:h-full border-r transition-colors duration-500 z-40
          ${theme === 'dark' ? 'bg-[#1a1a1a]/80 backdrop-blur-2xl border-[#2a2a2a]' : 'bg-white/40 backdrop-blur-2xl border-gray-200/50'}
        `}>
          <header className={`sticky top-0 z-50 backdrop-blur-xl border-b px-6 py-5 shrink-0 transition-colors duration-500
            ${theme === 'dark' ? 'bg-[#161616]/90 border-[#2a2a2a]' : 'bg-white/80 border-gray-200/50'}
          `}>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className={`p-2 rounded-xl transition-all active:scale-95 ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-black tracking-tight">{t('settings.title')}</h1>
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{t('settings.preference')}</p>
              </div>
            </div>
          </header>

          <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain">
            <div className="p-6 pb-28 lg:pb-6 space-y-8">
              {/* Appearance Section */}
              <section className="space-y-4">
                <h2 className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {t('settings.appearance')}
                </h2>
                <div className={`rounded-3xl border overflow-hidden shadow-sm transition-colors duration-500
                  ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'}
                `}>
                  <button
                    onClick={toggleTheme}
                    className={`w-full flex items-center justify-between p-5 transition-all ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl transition-colors duration-500 ${theme === 'dark' ? 'bg-white/10 text-gray-300' : 'bg-blue-50 text-blue-600'}`}>
                        {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm">{t('settings.darkMode')}</p>
                        <p className={`text-[10px] font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                          {theme === 'dark' ? t('settings.enabled') : t('settings.disabled')}
                        </p>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  </button>
                </div>
              </section>

              {/* Language Section */}
              <section className="space-y-4">
                <h2 className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {t('settings.language')}
                </h2>
                <div className={`rounded-3xl border overflow-hidden shadow-sm divide-y transition-colors duration-500
                  ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50 divide-gray-700/50' : 'bg-white border-gray-100 divide-gray-50'}
                `}>
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        setLanguage(lang.id);
                        toast.success(`${t('settings.langChanged')} ${lang.name}`);
                      }}
                      className={`w-full flex items-center justify-between p-5 transition-all ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl transition-all duration-500 ${language === lang.id ? (theme === 'dark' ? 'bg-white/10 text-gray-200' : 'bg-blue-50 text-blue-600') : theme === 'dark' ? 'bg-white/5 text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
                          <Globe className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-sm">{lang.native}</p>
                          <p className={`text-[10px] font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                            {lang.name}
                          </p>
                        </div>
                      </div>
                      {language === lang.id && (
                        <CheckCircle2 className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-blue-500'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* Fuel alerts */}
              <section className="space-y-4">
                <h2 className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {t('notify.settingsTitle')}
                </h2>
                <p className={`text-[11px] font-medium leading-relaxed px-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  {t('notify.settingsHint')}
                </p>
                <div className={`rounded-3xl border overflow-hidden shadow-sm transition-colors duration-500
                  ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'}
                `}>
                  {watchedStations.length === 0 ? (
                    <div className={`p-5 text-sm font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      {t('notify.empty')}
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-100 dark:divide-gray-700/50">
                      {watchedStations.map((s) => (
                        <li key={s.id} className="flex items-center justify-between gap-3 p-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`p-2.5 rounded-xl shrink-0 ${theme === 'dark' ? 'bg-amber-500/15 text-amber-400' : 'bg-amber-50 text-amber-700'}`}>
                              <Bell className="w-4 h-4" />
                            </div>
                            <span className={`font-semibold text-sm truncate ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                              {s.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              removeWatchedStation(s.id);
                              toast.success(t('notify.disabled'));
                            }}
                            className={`p-2.5 rounded-xl shrink-0 transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-red-50 text-red-500'}`}
                            aria-label={t('notify.remove')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>

              {/* About Section */}
              <section className="space-y-4">
                <h2 className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {t('settings.about')}
                </h2>
                <div className={`rounded-3xl border overflow-hidden shadow-sm transition-colors duration-500
                  ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'}
                `}>
                  <button
                    onClick={() => navigate('/about')}
                    className={`w-full flex items-center justify-between p-5 transition-all ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                        <Info className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm">Fuel Alert</p>
                        <p className={`text-[10px] font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>About this project</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                  </button>
                </div>
              </section>

              <p className={`text-center text-[10px] font-bold uppercase tracking-[0.3em] py-8 ${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'}`}>
                {t('settings.version')} 1.2.0 (Stable)
              </p>
            </div>
          </div>

          {/* Side Panel Footer Navigation */}
          <div className={`p-4 border-t hidden lg:block transition-colors duration-500 ${theme === 'dark' ? 'bg-[#121212] border-[#2a2a2a]' : 'bg-white/50 border-gray-100'}`}>
            <div className="flex items-center justify-between px-2">
              <Link to="/" className={`p-3 rounded-2xl transition-all hover:scale-110 ${theme === 'dark' ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}>
                <Home className="w-5 h-5" />
              </Link>
              <Link to="/feedback" className={`p-3 rounded-2xl transition-all hover:scale-110 ${theme === 'dark' ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}>
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link to="/guide" className={`p-3 rounded-2xl transition-all hover:scale-110 ${theme === 'dark' ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}>
                <BookOpen className="w-5 h-5" />
              </Link>
              <Link to="/settings" className={`p-3 rounded-2xl transition-all hover:scale-110 ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-600'}`}>
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Map Section */}
        <main className={`flex-1 relative min-h-0 h-full hidden lg:block ${theme === 'dark' ? 'bg-[#121212]' : 'bg-gray-50'}`}>
          <MapView
            stations={stations}
            onStationClick={(station) => navigate(`/station/${station.id}`, { state: { station } })}
            center={[7.8731, 80.7718]}
            zoom={8}
          />
        </main>
      </div>
    </>
  );
}
