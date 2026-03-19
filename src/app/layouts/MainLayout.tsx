import { Outlet } from 'react-router-dom';
import { BottomNavigation } from '../components/BottomNavigation';
import { ContributePopup } from '../components/ContributePopup';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <Outlet />
      <BottomNavigation />
      <ContributePopup />
    </div>
  );
}
