import { useNavigate } from 'react-router-dom';
import { Stethoscope, FileText, Calendar, Users, Activity, MessageSquare } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: 'Appointment Management',
      description: 'Schedule and manage patient appointments efficiently with real-time updates.'
    },
    {
      icon: Users,
      title: 'Patient Health Record',
      description: 'Comprehensive digital health records accessible anytime, anywhere.'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Prescription Sharing',
      description: 'Send prescriptions directly to patients via WhatsApp instantly.'
    },
    {
      icon: Activity,
      title: 'Real-time Vitals Entry',
      description: 'Record and monitor patient vitals with easy-to-use digital forms.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-sky-500 to-emerald-500 p-2 rounded-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">RyuEHR</h1>
                <p className="text-xs text-gray-500">Smart Records. Smarter Hospitals.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-200 font-medium shadow-sm"
            >
              Login to Demo
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-sky-500 to-emerald-500 p-4 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="w-12 h-12 text-white" />
                  <FileText className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Modern EHR Solutions for
              <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent"> Smart Hospitals</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Manage appointments, patients, and prescriptions in one place. Experience the future of healthcare management with RyuEHR.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-xl hover:from-sky-600 hover:to-emerald-600 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Login to Demo
            </button>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-sky-200 group"
              >
                <div className="bg-gradient-to-br from-sky-100 to-emerald-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-7 h-7 text-sky-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-sky-500 to-emerald-500 py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to experience the future?</h3>
            <p className="text-sky-100 text-lg mb-8">Start managing your hospital records efficiently today.</p>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-white text-sky-600 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>RyuEHR © 2025. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
