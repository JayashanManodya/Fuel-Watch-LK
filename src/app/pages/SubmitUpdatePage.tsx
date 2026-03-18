import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle, Home, PlusCircle, Activity, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { fetchFuelStations } from '../services/osmService';
import type { FuelStation, FuelStatus, SubmitUpdateForm } from '../types';
import { toast } from 'sonner';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

export function SubmitUpdatePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { theme, t, localize } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stations, setStations] = useState<FuelStation[]>([]);
  
  const initialStationId = searchParams.get('stationId') || '';

  const [formData, setFormData] = useState<SubmitUpdateForm>({
    stationId: initialStationId,
    userName: '',
    status: 'available',
    queueLength: 0,
    waitingTime: 0,
    petrol92: 'not-available',
    petrol95: 'not-available',
    diesel: 'not-available',
    kerosene: 'not-available',
    message: '',
  });

  useEffect(() => {
    fetchFuelStations().then(setStations);
  }, []);

  const selectedStation = stations.find(s => s.id === initialStationId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.stationId || !formData.userName) {
      toast.error(t('submit.errorFields'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/stations/${formData.stationId}/updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      toast.success(t('submit.success'), {
        description: t('submit.successDesc'),
        icon: <CheckCircle className="w-5 h-5" />,
      });
      navigate('/feed');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to update station details');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StatusButton = ({ 
    value, 
    label, 
    fieldName 
  }: { 
    value: FuelStatus | 'not-available'; 
    label: string; 
    fieldName: keyof SubmitUpdateForm;
  }) => {
    const isSelected = formData[fieldName] === value;
    
    return (
      <button
        type="button"
        onClick={() => setFormData({ ...formData, [fieldName]: value })}
        className={`
          px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 border
          ${isSelected 
            ? value === 'available' 
              ? 'bg-green-500 text-white border-green-500' 
              : value === 'limited'
              ? 'bg-amber-500 text-white border-amber-500'
              : value === 'out-of-stock'
              ? 'bg-red-500 text-white border-red-500'
              : 'bg-gray-500 text-white border-gray-500'
            : theme === 'dark'
              ? 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
          }
        `}
      >
        {label === 'Available' ? t('status.available') : label === 'Limited' ? t('status.limited') : label === 'Out of Stock' ? t('status.out-of-stock') : label === 'Out' ? t('submit.out') : label === 'N/A' ? t('submit.notAvailable') : label}
      </button>
    );
  };

  return (
    <div className={`min-h-screen py-0 lg:py-12 flex justify-center transition-colors duration-500 pb-20 lg:pb-12 ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      
      {/* Centered Form Container */}
      <div className={`flex flex-col w-full max-w-2xl min-h-screen lg:min-h-0 lg:rounded-3xl backdrop-blur-2xl lg:border z-40 shadow-none lg:shadow-2xl transition-colors duration-500 ${theme === 'dark' ? 'bg-[#1a1a1a]/80 border-[#2a2a2a]' : 'bg-white/60 border-gray-200/50'}`}>
        <header className={`sticky top-0 z-50 backdrop-blur-xl lg:rounded-t-3xl border-b shadow-sm px-4 py-4 shrink-0 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#161616]/90 border-[#2a2a2a]' : 'bg-white/80 border-gray-200/50'}`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className={`p-2 rounded-xl active:scale-95 transition-all ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className={`font-semibold transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t('submit.title')}</h1>
              <p className={`text-sm transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t('submit.subtitle')}</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto w-full">
          <main className="px-4 py-6 w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selected Station (Fixed) */}
          <div className={`p-5 rounded-2xl backdrop-blur-xl border shadow-sm transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/80 border-gray-200/50'}`}>
            <Label className={`text-sm font-semibold mb-2 block transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
              {t('submit.station')}
            </Label>
            
            <div className={`w-full px-4 py-3 rounded-xl border opacity-70 cursor-not-allowed transition-colors ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`}>
              {stations.length === 0 
                ? 'Loading station...' 
                : selectedStation 
                  ? `${localize(selectedStation, 'name')} ${selectedStation.stationCode ? `(${selectedStation.stationCode})` : ''} - ${localize(selectedStation, 'address')}`
                  : 'Invalid or missing station'
              }
            </div>
            
            {!selectedStation && stations.length > 0 && (
               <p className="text-sm text-red-500 mt-3 font-medium">Please return to the map or feed and select a valid station to update.</p>
            )}
          </div>

          {/* Your Name */}
          <div className={`p-5 rounded-2xl backdrop-blur-xl border shadow-sm transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/80 border-gray-200/50'}`}>
            <Label htmlFor="userName" className={`text-sm font-semibold mb-2 block transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
              {t('submit.yourName')}
            </Label>
            <Input
              id="userName"
              type="text"
              required
              placeholder={t('submit.yourNamePlaceholder')}
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              className={`w-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-600' : ''}`}
            />
          </div>

          {/* Overall Status */}
          <div className={`p-5 rounded-2xl backdrop-blur-xl border shadow-sm transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/80 border-gray-200/50'}`}>
            <Label className={`text-sm font-semibold mb-3 block transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
              {t('submit.status')}
            </Label>
            <div className="flex gap-2 flex-wrap">
              <StatusButton value="available" label="Available" fieldName="status" />
              <StatusButton value="limited" label="Limited" fieldName="status" />
              <StatusButton value="out-of-stock" label="Out of Stock" fieldName="status" />
            </div>
          </div>

          {/* Queue & Wait Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-5 rounded-2xl backdrop-blur-xl border shadow-sm transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/80 border-gray-200/50'}`}>
              <Label htmlFor="queue" className={`text-sm font-semibold mb-2 block transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                {t('submit.queue')}
              </Label>
              <Input
                id="queue"
                type="number"
                min="0"
                value={formData.queueLength}
                onChange={(e) => setFormData({ ...formData, queueLength: parseInt(e.target.value) || 0 })}
                className={`w-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
              />
            </div>
            <div className={`p-5 rounded-2xl backdrop-blur-xl border shadow-sm transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/80 border-gray-200/50'}`}>
              <Label htmlFor="wait" className={`text-sm font-semibold mb-2 block transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                {t('submit.wait')}
              </Label>
              <Input
                id="wait"
                type="number"
                min="0"
                value={formData.waitingTime}
                onChange={(e) => setFormData({ ...formData, waitingTime: parseInt(e.target.value) || 0 })}
                className={`w-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
              />
            </div>
          </div>

          {/* Fuel Types */}
          <div className={`p-5 rounded-2xl backdrop-blur-xl border shadow-sm space-y-4 transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/80 border-gray-200/50'}`}>
            <h3 className={`text-sm font-semibold transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{t('submit.fuelAvailability')}</h3>
            
            {/* Petrol 92 */}
            <div>
              <Label className={`text-sm mb-2 block transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>{t('fuel.petrol92')}</Label>
              <div className="flex gap-2 flex-wrap">
                <StatusButton value="available" label="Available" fieldName="petrol92" />
                <StatusButton value="limited" label="Limited" fieldName="petrol92" />
                <StatusButton value="out-of-stock" label="Out" fieldName="petrol92" />
                <StatusButton value="not-available" label="N/A" fieldName="petrol92" />
              </div>
            </div>

            {/* Petrol 95 */}
            <div>
              <Label className={`text-sm mb-2 block transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>{t('fuel.petrol95')}</Label>
              <div className="flex gap-2 flex-wrap">
                <StatusButton value="available" label="Available" fieldName="petrol95" />
                <StatusButton value="limited" label="Limited" fieldName="petrol95" />
                <StatusButton value="out-of-stock" label="Out" fieldName="petrol95" />
                <StatusButton value="not-available" label="N/A" fieldName="petrol95" />
              </div>
            </div>

            {/* Diesel */}
            <div>
              <Label className={`text-sm mb-2 block transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>{t('fuel.diesel')}</Label>
              <div className="flex gap-2 flex-wrap">
                <StatusButton value="available" label="Available" fieldName="diesel" />
                <StatusButton value="limited" label="Limited" fieldName="diesel" />
                <StatusButton value="out-of-stock" label="Out" fieldName="diesel" />
                <StatusButton value="not-available" label="N/A" fieldName="diesel" />
              </div>
            </div>

            {/* Kerosene */}
            <div>
              <Label className={`text-sm mb-2 block transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>{t('fuel.kerosene')}</Label>
              <div className="flex gap-2 flex-wrap">
                <StatusButton value="available" label="Available" fieldName="kerosene" />
                <StatusButton value="limited" label="Limited" fieldName="kerosene" />
                <StatusButton value="out-of-stock" label="Out" fieldName="kerosene" />
                <StatusButton value="not-available" label="N/A" fieldName="kerosene" />
              </div>
            </div>
          </div>

          {/* Additional Message */}
          <div className={`p-5 rounded-2xl backdrop-blur-xl border shadow-sm transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/80 border-gray-200/50'}`}>
            <Label htmlFor="message" className={`text-sm font-semibold mb-2 block transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
              {t('submit.message')}
            </Label>
            <span className="text-[10px] text-gray-500 block mb-2 tracking-tight italic">{t('submit.optional')}</span>
            <Textarea
              id="message"
              placeholder={t('submit.messagePlaceholder')}
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-600' : ''}`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !selectedStation}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-[0.98] text-white font-semibold shadow-lg shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('submit.submitting')}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t('submit.button')}
              </>
            )}
          </button>
        </form>
          </main>
        </div>
      </div>
    </div>
  );
}
