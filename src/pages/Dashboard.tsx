import { Users, Calendar, FileText, Clock } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      icon: Users,
      label: 'Total Patients',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      bgColor: 'from-sky-500 to-sky-600',
    },
    {
      icon: Calendar,
      label: "Today's Appointments",
      value: '24',
      change: '+3',
      changeType: 'increase',
      bgColor: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: FileText,
      label: 'Pending Prescriptions',
      value: '8',
      change: '-2',
      changeType: 'decrease',
      bgColor: 'from-amber-500 to-amber-600',
    },
    {
      icon: Clock,
      label: 'Next Appointment',
      value: '10:30 AM',
      change: 'In 15 mins',
      changeType: 'neutral',
      bgColor: 'from-rose-500 to-rose-600',
    },
  ];

  const recentAppointments = [
    { id: 1, patient: 'Rajesh Kumar', time: '09:00 AM', doctor: 'Dr. Sharma', status: 'Completed' },
    { id: 2, patient: 'Priya Patel', time: '09:30 AM', doctor: 'Dr. Mehta', status: 'In Progress' },
    { id: 3, patient: 'Amit Singh', time: '10:00 AM', doctor: 'Dr. Sharma', status: 'Waiting' },
    { id: 4, patient: 'Sneha Reddy', time: '10:30 AM', doctor: 'Dr. Verma', status: 'Scheduled' },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="bg-gradient-to-r from-sky-500 to-emerald-500 rounded-xl p-6 mb-8 shadow-lg">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Welcome to Lotus Multispeciality Clinic
        </h1>
        <p className="text-sky-50">RyuEHR Demo Instance - Dashboard Overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className={`bg-gradient-to-r ${stat.bgColor} p-4`}>
              <stat.icon className="w-8 h-8 text-white" />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'increase'
                    ? 'text-emerald-600'
                    : stat.changeType === 'decrease'
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">Today's Appointments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{appointment.doctor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        appointment.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : appointment.status === 'In Progress'
                          ? 'bg-sky-100 text-sky-700'
                          : appointment.status === 'Waiting'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
