import { useState } from "react";
import { Plus, X, MessageCircle, Upload, User } from "lucide-react";

interface Patient {
  id: number;
  name: string;
  phone: string;
  age: number;
  gender: string;
  isChronic: boolean;
  chronicCondition?: string;
  medicineReminder?: {
    medicineName: string;
    frequency: "weekly" | "biweekly" | "monthly";
    lastPurchaseDate: string;
    nextReminderDate: string;
    notes?: string;
  };
}

interface Prescription {
  id: number;
  patientPhone: string;
  patientName: string;
  diagnosis: string;
  prescriptionFile: File | null;
  prescriptionFileName: string;
  date: string;
  doctor: string;
}

export default function Prescriptions() {
  
  const patients: Patient[] = [
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 9940025603",
      age: 45,
      gender: "Male",
      isChronic: true,
      chronicCondition: "Diabetes Type 2",
      medicineReminder: {
        medicineName: "Insulin, Metformin",
        frequency: "monthly",
        lastPurchaseDate: "2025-10-01",
        nextReminderDate: "2025-11-01",
        notes: "Purchase from Apollo Pharmacy",
      },
    },
    {
      id: 2,
      name: "Priya",
      phone: "+91 9876543211",
      age: 32,
      gender: "Female",
      isChronic: false,
    },
    {
      id: 3,
      name: "Amit Singh",
      phone: "+91 9876543212",
      age: 28,
      gender: "Male",
      isChronic: false,
    },
    {
      id: 4,
      name: "Roopan Vishnu",
      phone: "+91 9677055602",
      age: 21,
      gender: "Male",
      isChronic: true,
      chronicCondition: "Hypertension",
      medicineReminder: {
        medicineName: "Amlodipine, Losartan",
        frequency: "weekly",
        lastPurchaseDate: "2025-10-01",
        nextReminderDate: "2025-11-01",
        notes: "Check BP before purchase",
      },
    },
  ];

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: 1,
      patientPhone: "+91 9940025603",
      patientName: "Rajesh Kumar",
      diagnosis: "Viral Fever",
      prescriptionFile: null,
      prescriptionFileName: "prescription_rajesh_oct05.pdf",
      date: "2025-10-05",
      doctor: "Dr. Sharma",
    },
    {
      id: 2,
      patientPhone: "+91 9876543211",
      patientName: "Priya",
      diagnosis: "Back Pain",
      prescriptionFile: null,
      prescriptionFileName: "prescription_priya_oct04.pdf",
      date: "2025-10-04",
      doctor: "Dr. Mehta",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    diagnosis: "",
    prescriptionFile: null as File | null,
  });
  const handleSendMedicineReminder = (prescription: Prescription) => {
    const patient = patients.find((p) => p.phone === prescription.patientPhone);
    if (!patient?.medicineReminder) return;

    const phone = prescription.patientPhone.replace(/\D/g, "");
    const message = `Hello ${
      prescription.patientName
    }, this is a reminder to purchase your medicines: ${
      patient.medicineReminder.medicineName
    }. Next refill due: ${patient.medicineReminder.nextReminderDate}. ${
      patient.medicineReminder.notes || ""
    }`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    showToast("Medicine reminder sent via WhatsApp!");
  };
  const handlePatientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const patientId = parseInt(e.target.value);
    const patient = patients.find((p) => p.id === patientId);
    setSelectedPatient(patient || null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, prescriptionFile: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !formData.prescriptionFile) return;

    const newPrescription: Prescription = {
      id: prescriptions.length + 1,
      patientPhone: selectedPatient.phone,
      patientName: selectedPatient.name,
      diagnosis: formData.diagnosis,
      prescriptionFile: formData.prescriptionFile,
      prescriptionFileName: formData.prescriptionFile.name,
      date: new Date().toISOString().split("T")[0],
      doctor: "Dr. Sharma",
    };
    setPrescriptions([newPrescription, ...prescriptions]);
    setIsModalOpen(false);
    setSelectedPatient(null);
    setFormData({
      diagnosis: "",
      prescriptionFile: null,
    });
    showToast("Prescription uploaded successfully!");
  };

  const handleSendToWhatsApp = (prescription: Prescription) => {
    const phone = prescription.patientPhone.replace(/\D/g, "");
    const message = `Hello ${prescription.patientName}, your prescription for ${prescription.diagnosis} dated ${prescription.date} is ready. File: ${prescription.prescriptionFileName}`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    showToast("Opening WhatsApp...");
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Prescriptions
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-200 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Upload Prescription</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-sky-100 to-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {prescription.patientName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {prescription.patientPhone}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{prescription.date}</span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Diagnosis
                </p>
                <p className="text-sm text-gray-900 bg-sky-50 px-3 py-2 rounded-lg">
                  {prescription.diagnosis}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Prescription Document
                </p>
                <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-2 rounded-lg">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-900 truncate">
                    {prescription.prescriptionFileName}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Prescribed by: {prescription.doctor}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleSendToWhatsApp(prescription)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send to WhatsApp</span>
            </button>
            {patients.find((p) => p.phone === prescription.patientPhone)
              ?.isChronic && (
              <button
                onClick={() => handleSendMedicineReminder(prescription)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 text-sm font-medium mt-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Medicine Reminder</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                Upload Prescription
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Patient
                </label>
                <select
                  onChange={handlePatientSelect}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                >
                  <option value="">Choose a patient...</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.phone} ({patient.age}y,{" "}
                      {patient.gender})
                    </option>
                  ))}
                </select>
              </div>

              {selectedPatient && (
                <div className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Selected Patient:
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {selectedPatient.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedPatient.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnosis
                </label>
                <input
                  type="text"
                  value={formData.diagnosis}
                  onChange={(e) =>
                    setFormData({ ...formData, diagnosis: e.target.value })
                  }
                  placeholder="Enter diagnosis"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>
              {selectedPatient?.isChronic && (
  <div>
    <p className="text-sm font-medium text-gray-700 mb-1">
      Chronic Condition Reminder
    </p>
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
      <div className="flex items-center space-x-2">
        <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded">
          CHRONIC
        </span>
        <span className="text-sm font-medium text-gray-900">
          {selectedPatient.chronicCondition}
        </span>
      </div>
      {selectedPatient.medicineReminder && (
        <>
          <div className="text-xs text-gray-700">
            <span className="font-medium">Medicine:</span>{" "}
            {selectedPatient.medicineReminder.medicineName}
          </div>
          <div className="text-xs text-gray-700">
            <span className="font-medium">Next Reminder:</span>{" "}
            {selectedPatient.medicineReminder.nextReminderDate}{" "}
            ({selectedPatient.medicineReminder.frequency})
          </div>
        </>
      )}
    </div>
  </div>
)}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Prescription (Scanned Document)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-sky-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    PDF, JPG, PNG up to 10MB
                  </p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Choose File
                  </label>
                  {formData.prescriptionFile && (
                    <p className="mt-3 text-sm text-emerald-600 font-medium">
                      Selected: {formData.prescriptionFile.name}
                    </p>
                  )}
                </div>
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
                  Upload Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 z-50">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
