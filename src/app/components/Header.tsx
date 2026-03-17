import { MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTheme } from '../context/ThemeContext';

export function Header() {
  const { theme, t } = useTheme();

  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b shadow-sm transition-colors duration-500 ${theme === 'dark' ? 'bg-[#161616]/90 border-[#2a2a2a]' : 'bg-white/70 border-gray-200/50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col gap-4">
          {/* Title and Location */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t('app.title')}</h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t('app.subtitle')}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              <Select defaultValue="ratnapura">
                <SelectTrigger className={`w-[140px] h-9 transition-colors ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500/50' : 'bg-white/80 border-gray-200 focus:ring-blue-400'}`}>
                  <SelectValue placeholder={t('app.location')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ratnapura">{t('location.ratnapura')}</SelectItem>
                  <SelectItem value="colombo">{t('location.colombo')}</SelectItem>
                  <SelectItem value="kandy">{t('location.kandy')}</SelectItem>
                  <SelectItem value="galle">{t('location.galle')}</SelectItem>
                  <SelectItem value="jaffna">{t('location.jaffna')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
