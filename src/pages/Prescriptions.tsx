import { useState } from 'react';
import { Plus, X, MessageCircle, FileText } from 'lucide-react';

interface Prescription {
  id: number;
  patientPhone: string;
  patientName: string;
  diagnosis: string;
  medicines: string;
  notes: string;
  date: string;
  doctor: string;
}

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: 1,
      patientPhone: '+91 9876543210',
      patientName: 'Rajesh Kumar',
      diagnosis: 'Viral Fever',
      medicines: 'Paracetamol 500mg - 1 tablet 3 times daily\nVitamin C - 1 tablet daily',
      notes: 'Take rest, drink plenty of fluids',
      date: '2025-10-05',
      doctor: 'Dr. Sharma'
    },
    {
      id: 2,
      patientPhone: '+91 9876543211',
      patientName: 'Priya Patel',
      diagnosis: 'Back Pain',
      medicines: 'Ibuprofen 400mg - 1 tablet 2 times daily\nMuscle relaxant - 1 tablet at night',
      notes: 'Apply hot compress, avoid heavy lifting',
      date: '2025-10-04',
      doctor: 'Dr. Mehta'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [formData, setFormData] = useState({
    patientPhone: '',
    patientName: '',
    diagnosis: '',
    medicines: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPrescription: Prescription = {
      id: prescriptions.length + 1,
      patientPhone: formData.patientPhone,
      patientName: formData.patientName,
      diagnosis: formData.diagnosis,
      medicines: formData.medicines,
      notes: formData.notes,
      date: new Date().toISOString().split('T')[0],
      doctor: 'Dr. Sharma'
    };
    setPrescriptions([newPrescription, ...prescriptions]);
    setIsModalOpen(false);
    setFormData({
      patientPhone: '',
      patientName: '',
      diagnosis: '',
      medicines: '',
      notes: ''
    });
    showToast('Prescription created successfully!');
  };

  const handleGeneratePDF = (prescription: Prescription) => {
    showToast('Prescription sent to WhatsApp!');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Prescriptions</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-200 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Create Prescription</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{prescription.patientName}</h3>
                <p className="text-sm text-gray-600">{prescription.patientPhone}</p>
              </div>
              <span className="text-xs text-gray-500">{prescription.date}</span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Diagnosis</p>
                <p className="text-sm text-gray-900 bg-sky-50 px-3 py-2 rounded-lg">{prescription.diagnosis}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Medicines</p>
                <div className="text-sm text-gray-900 bg-emerald-50 px-3 py-2 rounded-lg whitespace-pre-line">
                  {prescription.medicines}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
                <p className="text-sm text-gray-900 bg-amber-50 px-3 py-2 rounded-lg">{prescription.notes}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Prescribed by: {prescription.doctor}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleGeneratePDF(prescription)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to WhatsApp</span>
              </button>
              <button
                onClick={() => showToast('Prescription sent to WhatsApp!')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Create Prescription</h2>
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
                    Patient Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnosis
                </label>
                <input
                  type="text"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  placeholder="Enter diagnosis"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medicines
                </label>
                <textarea
                  value={formData.medicines}
                  onChange={(e) => setFormData({ ...formData, medicines: e.target.value })}
                  placeholder="Enter medicines (one per line)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  rows={5}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional instructions"
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
                  Create Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in z-50">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
