import { useState } from 'react';
import { Activity, Thermometer, Heart, Wind } from 'lucide-react';

interface VitalRecord {
  id: number;
  phone: string;
  patientName: string;
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  spo2: string;
  date: string;
  time: string;
}

export default function Vitals() {
  const [vitals, setVitals] = useState<VitalRecord[]>([
    {
      id: 1,
      phone: '+91 9876543210',
      patientName: 'Rajesh Kumar',
      temperature: '98.6°F',
      bloodPressure: '120/80',
      heartRate: '72 bpm',
      spo2: '98%',
      date: '2025-10-05',
      time: '09:15 AM'
    },
    {
      id: 2,
      phone: '+91 9876543211',
      patientName: 'Priya Patel',
      temperature: '99.1°F',
      bloodPressure: '118/78',
      heartRate: '68 bpm',
      spo2: '99%',
      date: '2025-10-05',
      time: '10:30 AM'
    }
  ]);

  const [formData, setFormData] = useState({
    phone: '',
    patientName: '',
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    spo2: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const newVital: VitalRecord = {
      id: vitals.length + 1,
      phone: formData.phone,
      patientName: formData.patientName,
      temperature: formData.temperature + '°F',
      bloodPressure: formData.bloodPressure,
      heartRate: formData.heartRate + ' bpm',
      spo2: formData.spo2 + '%',
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setVitals([newVital, ...vitals]);
    setFormData({
      phone: '',
      patientName: '',
      temperature: '',
      bloodPressure: '',
      heartRate: '',
      spo2: ''
    });
  };

  return (
    <div className="p-4 lg:p-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Vitals Entry</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Record Patient Vitals</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 9876543210"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name
              </label>
              <input
                type="text"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="Enter patient name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span>Temperature (°F)</span>
                  </div>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                  placeholder="98.6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-sky-500" />
                    <span>Blood Pressure</span>
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.bloodPressure}
                  onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                  placeholder="120/80"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Heart Rate (bpm)</span>
                  </div>
                </label>
                <input
                  type="number"
                  value={formData.heartRate}
                  onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                  placeholder="72"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-emerald-500" />
                    <span>SpO2 (%)</span>
                  </div>
                </label>
                <input
                  type="number"
                  value={formData.spo2}
                  onChange={(e) => setFormData({ ...formData, spo2: e.target.value })}
                  placeholder="98"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-200 font-semibold shadow-md"
            >
              Save Vitals
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Recent Vitals</h2>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {vitals.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No vitals recorded yet
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {vitals.map((vital) => (
                  <div key={vital.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">{vital.patientName}</p>
                        <p className="text-sm text-gray-600">{vital.phone}</p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <p>{vital.date}</p>
                        <p>{vital.time}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span className="text-gray-600">Temp:</span>
                        <span className="font-medium text-gray-900">{vital.temperature}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Activity className="w-4 h-4 text-sky-500" />
                        <span className="text-gray-600">BP:</span>
                        <span className="font-medium text-gray-900">{vital.bloodPressure}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span className="text-gray-600">HR:</span>
                        <span className="font-medium text-gray-900">{vital.heartRate}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Wind className="w-4 h-4 text-emerald-500" />
                        <span className="text-gray-600">SpO2:</span>
                        <span className="font-medium text-gray-900">{vital.spo2}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
