'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { apiFetch } from '@/lib/api';

interface AttendanceReport {
  message: string;
  employee: {
    id: number;
    name: string;
    role: string;
  };
  attendance_report: Array<{
    month: string;
    details: Array<{
      attendance_date: string;
      status: 'present' | 'absent';
    }>;
    summary: {
      total_days: number;
      present_days: number;
      absent_days: number;
      leave_days: number;
    };
  }>;
}

export default function EmployeeAttendanceReport() {
  const params = useParams();
  const id = params.id;
  const [report, setReport] = useState<AttendanceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAttendanceReport();
  }, [id]);

  const fetchAttendanceReport = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`/employees-attendance/${id}`);
      setReport(data);
    } catch (err) {
      setError('Failed to fetch attendance report');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-green-700">Loading attendance report...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="text-center text-red-500">
        <p className="text-xl">{error}</p>
      </div>
    </div>
  );

  if (!report) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <p className="text-xl">No report found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                Attendance Report
              </h1>
              <p className="text-green-600">
                {report.employee.name} - {report.employee.role}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-600">Employee ID: EMP{report.employee.id}</p>
              <p className="text-sm text-green-600">
                Generated on: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Reports */}
        <div className="space-y-6">
          {report.attendance_report.map((monthReport, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Month Header */}
              <div className="bg-green-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                  {new Date(monthReport.month + '-01').toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </h2>
              </div>

              <div className="p-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">
                      {monthReport.summary.total_days}
                    </div>
                    <div className="text-sm text-green-600">Total Days</div>
                  </div>
                  <div className="bg-green-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-800">
                      {monthReport.summary.present_days}
                    </div>
                    <div className="text-sm text-green-700">Present Days</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-700">
                      {monthReport.summary.absent_days}
                    </div>
                    <div className="text-sm text-red-600">Absent Days</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">
                      {monthReport.summary.leave_days}
                    </div>
                    <div className="text-sm text-blue-600">Leave Days</div>
                  </div>
                </div>

                {/* Attendance Details */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Attendance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {monthReport.details.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`p-3 rounded-lg text-center ${
                        day.status === 'present'
                          ? 'bg-green-100 border border-green-300'
                          : 'bg-red-100 border border-red-300'
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-700">
                        {new Date(day.attendance_date).getDate()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(day.attendance_date).toLocaleDateString('en-US', { 
                          month: 'short' 
                        })}
                      </div>
                      <div className={`text-xs font-bold mt-1 ${
                        day.status === 'present' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {day.status.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Data Message */}
        {report.attendance_report.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Attendance Data
            </h3>
            <p className="text-gray-500">
              No attendance records found for this employee.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}