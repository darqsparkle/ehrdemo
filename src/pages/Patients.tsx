import { useState } from 'react';
import { Search, Eye, X, Plus } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  phone: string;
  age: number;
  gender: string;
  lastVisit: string;
  doctor: string;
  medicalHistory: {
    date: string;
    symptoms: string;
    diagnosis: string;
    treatment: string;
    nextVisit: string;
  }[];
}

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: 'Rajesh Kumar',
      phone: '+91 9876543210',
      age: 45,
      gender: 'Male',
      lastVisit: '2025-10-01',
      doctor: 'Dr. Sharma',
      medicalHistory: [
        {
          date: '2025-10-01',
          symptoms: 'Fever, headache',
          diagnosis: 'Viral fever',
          treatment: 'Rest, paracetamol 500mg',
          nextVisit: '2025-10-08'
        }
      ]
    },
    {
      id: 2,
      name: 'Priya Patel',
      phone: '+91 9876543211',
      age: 32,
      gender: 'Female',
      lastVisit: '2025-09-28',
      doctor: 'Dr. Mehta',
      medicalHistory: [
        {
          date: '2025-09-28',
          symptoms: 'Back pain',
          diagnosis: 'Muscle strain',
          treatment: 'Physiotherapy, pain relief',
          nextVisit: '2025-10-12'
        }
      ]
    },
    {
      id: 3,
      name: 'Amit Singh',
      phone: '+91 9876543212',
      age: 28,
      gender: 'Male',
      lastVisit: '2025-09-25',
      doctor: 'Dr. Verma',
      medicalHistory: [
        {
          date: '2025-09-25',
          symptoms: 'Cough, cold',
          diagnosis: 'Common cold',
          treatment: 'Cough syrup, vitamin C',
          nextVisit: '2025-10-02'
        }
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [recordForm, setRecordForm] = useState({
    symptoms: '',
    diagnosis: '',
    treatment: '',
    nextVisit: ''
  });

  const filteredPatients = patients.filter(patient =>
    patient.phone.includes(searchQuery) ||
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPatient) {
      const newRecord = {
        date: new Date().toISOString().split('T')[0],
        symptoms: recordForm.symptoms,
        diagnosis: recordForm.diagnosis,
        treatment: recordForm.treatment,
        nextVisit: recordForm.nextVisit
      };

      setPatients(patients.map(p =>
        p.id === selectedPatient.id
          ? { ...p, medicalHistory: [newRecord, ...p.medicalHistory] }
          : p
      ));

      setRecordForm({ symptoms: '', diagnosis: '', treatment: '', nextVisit: '' });
      setIsAddRecordOpen(false);
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Patient Records</h1>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by phone number or name..."
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                    <div className="text-sm text-gray-500">{patient.age}y, {patient.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{patient.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{patient.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{patient.doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="flex items-center space-x-1 text-sky-600 hover:text-sky-800 font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Patient Details</h2>
              <button
                onClick={() => setSelectedPatient(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedPatient.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Age / Gender</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedPatient.age} years, {selectedPatient.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Last Visit</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedPatient.lastVisit}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Medical History</h3>
                <button
                  onClick={() => setIsAddRecordOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-200 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Record</span>
                </button>
              </div>

              <div className="space-y-4">
                {selectedPatient.medicalHistory.map((record, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-medium text-gray-900">Visit: {record.date}</span>
                      <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded">Next: {record.nextVisit}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Symptoms</p>
                        <p className="text-gray-900">{record.symptoms}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Diagnosis</p>
                        <p className="text-gray-900">{record.diagnosis}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-gray-600 mb-1">Treatment</p>
                        <p className="text-gray-900">{record.treatment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddRecordOpen && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Medical Record</h2>
              <button
                onClick={() => setIsAddRecordOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleAddRecord} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
                <textarea
                  value={recordForm.symptoms}
                  onChange={(e) => setRecordForm({ ...recordForm, symptoms: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                <input
                  type="text"
                  value={recordForm.diagnosis}
                  onChange={(e) => setRecordForm({ ...recordForm, diagnosis: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Treatment</label>
                <textarea
                  value={recordForm.treatment}
                  onChange={(e) => setRecordForm({ ...recordForm, treatment: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Next Visit Date</label>
                <input
                  type="date"
                  value={recordForm.nextVisit}
                  onChange={(e) => setRecordForm({ ...recordForm, nextVisit: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddRecordOpen(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-200"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
