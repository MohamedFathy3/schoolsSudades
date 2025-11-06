// app/teachers/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Eye } from 'lucide-react';

export default function TeachersPage() {
  const { user } = useAuth();

  return (
    <GenericDataManager
      endpoint="teacher"
      title="Teachers Management"
      columns={[
        { 
          key: 'id', 
          label: 'ID', 
          sortable: true,
          render: (item) => `TCH${String(item.id).padStart(3, '0')}`
        },
        { 
          key: 'name', 
          label: 'Teacher Name', 
          sortable: true 
        },
        { 
          key: 'email', 
          label: 'Email', 
          sortable: true 
        },
        { 
          key: 'phone', 
          label: 'Phone', 
          sortable: false 
        },
        { 
          key: 'address', 
          label: 'Address', 
          sortable: true 
        },
        { 
          key: 'classes', 
          label: 'Classes', 
          sortable: false,
          render: (item) => {
            if (!item.classes || !Array.isArray(item.classes)) return 'No classes';
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return item.classes.map((cls: any) => cls.name).join(', ');
          }
        },
         {
          key: 'active',
          label: 'Status',
          sortable: true,
          render: (item) => (
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
          key: 'view', 
          label: 'View', 
          sortable: false,
          render: (item) => {
            return (
              <Link href={`/manager/teacher/${item.id}`}>
                <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  <Eye size={16} />
                  <span>View</span>
                </button>
              </Link>
            );
          }
        },
       
      ]}

      additionalData={[
        { key: 'classe', endpoint: '/classe' }
      ]}

      formFields={[
        {
          name: 'name',
          label: 'Teacher Name',
          type: 'text',
          required: true,
          placeholder: 'Enter teacher name'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'Enter email address'
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          required: true,
          placeholder: 'Enter password'
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'tel',
          required: false,
          placeholder: 'Enter phone number'
        },
        {
          name: 'address',
          label: 'Address',
          type: 'text',
          required: false,
          placeholder: 'Enter address'
        },
        {
          name: 'class_ids', 
          label: 'Assigned Classes',
          type: 'custom',
          component: 'class-selector',
          required: false,
          optionsKey: "classe",
        },
        {
          name: 'active',
          label: 'Active Status',
          type: 'switch',
          required: false
        }
      ]}
     
      showActiveToggle={true}
      showAddButton={true}
      showEditButton={true}
      showDeleteButton={true}
      showSearch={true}
      showBulkActions={true}
      showDeletedToggle={true}

      initialData={{ role: 'teacher' }}
      defaultFilters={{ role: 'teacher' }} 
    />
  );
}