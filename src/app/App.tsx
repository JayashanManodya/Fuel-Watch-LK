import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './routes';
import { Toaster } from 'sonner';
import { ThemeProvider } from './context/ThemeContext';
import { StationWatchNotifier } from './components/StationWatchNotifier';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Toaster position="top-center" richColors />
        <StationWatchNotifier />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
