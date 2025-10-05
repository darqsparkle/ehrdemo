import { useState } from 'react';
import { Plus, X, Calendar, Clock, User } from 'lucide-react';

interface Appointment {
  id: number;
  patientName: string;
  age: number;
  gender: string;
  date: string;
  time: string;
  doctor: string;
  purpose: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      patientName: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      date: '2025-10-05',
      time: '09:00 AM',
      doctor: 'Dr. Sharma',
      purpose: 'General Checkup',
      status: 'Completed'
    },
    {
      id: 2,
      patientName: 'Priya Patel',
      age: 32,
      gender: 'Female',
      date: '2025-10-05',
      time: '10:30 AM',
      doctor: 'Dr. Mehta',
      purpose: 'Follow-up',
      status: 'Scheduled'
    },
    {
      id: 3,
      patientName: 'Amit Singh',
      age: 28,
      gender: 'Male',
      date: '2025-10-06',
      time: '11:00 AM',
      doctor: 'Dr. Sharma',
      purpose: 'Consultation',
      status: 'Scheduled'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming'>('all');
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'Male',
    date: '',
    time: '',
    doctor: '',
    purpose: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment: Appointment = {
      id: appointments.length + 1,
      patientName: formData.patientName,
      age: parseInt(formData.age),
      gender: formData.gender,
      date: formData.date,
      time: formData.time,
      doctor: formData.doctor,
      purpose: formData.purpose,
      status: 'Scheduled'
    };
    setAppointments([...appointments, newAppointment]);
    setIsModalOpen(false);
    setFormData({
      patientName: '',
      age: '',
      gender: 'Male',
      date: '',
      time: '',
      doctor: '',
      purpose: ''
    });
  };

  const updateStatus = (id: number, status: 'Completed' | 'Cancelled') => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status } : apt
    ));
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'today') return apt.date === '2025-10-05';
    if (filter === 'upcoming') return new Date(apt.date) >= new Date('2025-10-05');
    return true;
  });

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Appointments</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-200 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Add Appointment</span>
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            filter === 'all'
              ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('today')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            filter === 'today'
              ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            filter === 'upcoming'
              ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Upcoming
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                    <div className="text-sm text-gray-500">{appointment.age}y, {appointment.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appointment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appointment.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appointment.doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      appointment.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      appointment.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-sky-100 text-sky-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {appointment.status === 'Scheduled' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(appointment.id, 'Completed')}
                          className="text-emerald-600 hover:text-emerald-800 font-medium"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => updateStatus(appointment.id, 'Cancelled')}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Appointment</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="09:00 AM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Doctor</label>
                <input
                  type="text"
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
                <textarea
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-200"
                >
                  Add Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
