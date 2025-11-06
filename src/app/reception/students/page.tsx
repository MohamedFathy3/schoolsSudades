// app/students/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useAuth } from '@/contexts/AuthContext';
import { Eye, CreditCard } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from './PaymentModal';

// تعريف نوع الطالب (نفس الـ interface من الأعلى)
interface Student {
  id: number;
  name: string;
  age?: number;
  education_stage?: string;
  term?: string;
  previous_school?: string;
  father_name?: string;
  father_phone?: string;
  father_job?: string;
  mother_name?: string;
  mother_phone?: string;
  mother_job?: string;
  classe_id?: number;
  email?: string;
  active?: boolean;
  classroom?: string;
  father?: {
    name: string;
  };
  classe?: {
    name: string;
  };
}

export default function StudentsPage() {
  const { user } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleOpenPaymentModal = (student: Student) => {
    setSelectedStudent(student);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <>
      <GenericDataManager
        endpoint="student"
        title="Students Management"
        columns={[
          { 
            key: 'id', 
            label: 'ID', 
            sortable: true,
            render: (item: Student) => `STU${String(item.id).padStart(3, '0')}`
          },
          { 
            key: 'name', 
            label: 'Student Name', 
            sortable: true,
          },
          { 
            key: 'term', 
            label: 'Term', 
            sortable: true,
          },
          { 
            key: 'father_name', 
            label: 'Father Name', 
            sortable: true,
            render: (item: Student) => item.father?.name || item.father_name || 'N/A'
          },
          { 
            key: 'classroom', 
            label: 'Class', 
            sortable: true,
            render: (item: Student) => item.classroom || item.classe?.name || 'N/A'
          },
          {
            key: 'active',
            label: 'Status',
            sortable: true,
            render: (item: Student) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.active 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {item.active ? 'Active' : 'Inactive'}
              </span>
            )
          },
          {
            key: 'actions',
            label: 'Actions',
            sortable: false,
            render: (item: Student) => (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleOpenPaymentModal(item)}
                  className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  title="Manage Payments"
                >
                  <CreditCard className="w-4 h-4 mr-1" />
                  Payments
                </button>
              </div>
            )
          }
        ]}
        
        showAddButton={true}
        showEditButton={true}
        showDeleteButton={true}
        showActiveToggle={true} 
        showSearch={true}
        showBulkActions={true}
        showDeletedToggle={true}
        additionalData={[
          { key: 'classes', endpoint: '/classe' }
        ]}
        formFields={[
          {
            name: 'name',
            label: 'Student Name',
            type: 'text',
            required: true,
            placeholder: 'Enter student full name'
          },
          {
            name: 'age',
            label: 'Age',
            type: 'number',
            required: true,
            placeholder: 'Enter student age'
          },
          {
            name: 'education_stage',
            label: 'Education Stage',
            type: 'text',
            required: true,
            placeholder: 'Enter education stage'
          },
          {
            name: 'term',
            label: 'Term',
            type: 'text',
            required: true,
            placeholder: 'Enter academic term'
          },
          {
            name: 'previous_school',
            label: 'Previous School',
            type: 'text',
            required: false,
            placeholder: 'Enter previous school name'
          },
          {
            name: 'father_name',
            label: 'Father Name *',
            type: 'text',
            required: true,
            placeholder: 'Enter father name'
          },
          {
            name: 'father_phone',
            label: 'Father Phone *',
            type: 'tel',
            required: true,
            placeholder: 'Enter father phone number'
          },
          {
            name: 'father_job',
            label: 'Father Job',
            type: 'text',
            required: false,
            placeholder: 'Enter father job'
          },
          {
            name: 'mother_name',
            label: 'Mother Name',
            type: 'text',
            required: false,
            placeholder: 'Enter mother name'
          },
          {
            name: 'mother_phone',
            label: 'Mother Phone',
            type: 'tel',
            required: false,
            placeholder: 'Enter mother phone number'
          },
          {
            name: 'mother_job',
            label: 'Mother Job',
            type: 'text',
            required: false,
            placeholder: 'Enter mother job'
          },
          {
            name: 'classe_id',
            label: 'Class *',
            type: 'select',
            required: true,
            optionsKey: 'classes'
          },
          { 
            name: 'email', 
            label: 'Email', 
            type: 'email', 
            required: true,
            placeholder: 'Enter email address',
          },
          { 
            name: 'password', 
            label: 'Password', 
            type: 'password', 
            required: true,
            placeholder: 'Enter password',
          },
          {
            name: 'active',
            label: 'Active Status',
            type: 'switch',
            required: false
          }
        ]}
      />

      {isPaymentModalOpen && selectedStudent && (
        <PaymentModal
          student={selectedStudent}
          isOpen={isPaymentModalOpen}
          onClose={handleClosePaymentModal}
        />
      )}
    </>
  );
}