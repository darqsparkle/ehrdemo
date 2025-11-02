import { useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Activity,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Stethoscope,
  Building2,
  Store
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

export default function DashboardLayout({ children, onLogout }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: Activity, label: 'Vitals', path: '/vitals' },
    { icon: FileText, label: 'Prescriptions', path: '/prescriptions' },
    { icon: Store, label: 'Inventory', path: '/inventory' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-sky-500 to-emerald-500 p-2 rounded-lg">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">RyuEHR</h1>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="flex pt-16 lg:pt-0">
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200
            transform transition-transform duration-200 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-sky-500 to-emerald-500 p-2 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">RyuEHR</h1>
                  <p className="text-xs text-gray-500">Demo Instance</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-sky-50 to-emerald-50 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-sm">
                <Building2 className="w-4 h-4 text-sky-600" />
                <span className="font-medium text-gray-700">Demo Multispeciality Clinic</span>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
