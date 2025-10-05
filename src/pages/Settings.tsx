import { Building2, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-4 lg:p-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="max-w-4xl space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-sky-50 to-emerald-50">
            <h2 className="text-xl font-semibold text-gray-900">Hospital Information</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-sky-600" />
                  <span>Hospital Name</span>
                </div>
              </label>
              <input
                type="text"
                defaultValue="Lotus Multispeciality Clinic"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-gray-50"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  <span>Address</span>
                </div>
              </label>
              <textarea
                defaultValue="123 Medical Plaza, Healthcare District, Mumbai, Maharashtra 400001"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-gray-50"
                rows={3}
                disabled
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-sky-600" />
                    <span>Contact Email</span>
                  </div>
                </label>
                <input
                  type="email"
                  defaultValue="contact@lotusmulti.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-sky-600" />
                    <span>Phone Number</span>
                  </div>
                </label>
                <input
                  type="tel"
                  defaultValue="+91 22 1234 5678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-gray-50"
                  disabled
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                disabled
                className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
              >
                Save Changes
              </button>
              <p className="text-xs text-gray-500 mt-2">Editing is disabled in demo mode</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-sky-50 to-emerald-50">
            <h2 className="text-xl font-semibold text-gray-900">Subscription Details</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-50 to-emerald-50 rounded-lg border border-sky-200">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <CreditCard className="w-5 h-5 text-sky-600" />
                  <span className="font-semibold text-gray-900">Current Plan</span>
                </div>
                <p className="text-2xl font-bold text-sky-600">Demo</p>
                <p className="text-sm text-gray-600 mt-1">Free demo version with limited features</p>
              </div>
              <div className="text-right">
                <span className="inline-flex px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold">
                  Active
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Features</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  <span>Unlimited patient records</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  <span>Advanced analytics and reports</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  <span>Multi-doctor support</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  <span>Email and SMS notifications</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  <span>Priority customer support</span>
                </li>
              </ul>
              <button
                disabled
                className="w-full px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-semibold"
              >
                Upgrade to Premium
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">Upgrades are disabled in demo mode</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-sky-50 to-emerald-50">
            <h2 className="text-xl font-semibold text-gray-900">About RyuEHR</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-900">Version:</span> 1.0.0 (Demo)
              </p>
              <p>
                <span className="font-semibold text-gray-900">Instance Type:</span> Demo
              </p>
              <p>
                <span className="font-semibold text-gray-900">Description:</span> RyuEHR is a modern Electronic Health Record system designed for smart hospitals. This demo showcases the core features of the platform.
              </p>
              <p className="pt-4 text-xs text-gray-500">
                Demo credentials: demo@gmail.com / Demo@1234
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
