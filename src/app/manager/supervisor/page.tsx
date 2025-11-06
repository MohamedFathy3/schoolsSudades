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
      endpoint="class-supervisor"
      title="supervisor Management"
      columns={[
        { 
          key: 'id', 
          label: 'ID', 
          sortable: true,
          render: (item) => `TCH${String(item.id).padStart(3, '0')}`
        },
        { 
          key: 'name', 
          label: 'director Name', 
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
          key: 'classes', 
          label: 'Classes', 
          sortable: false,
          render: (item) => {
            if (!item.classes || !Array.isArray(item.classes)) return 'No classes';
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
        
       
      ]}

      additionalData={[
        { key: 'classe', endpoint: '/classe' }
      ]}

      formFields={[
        {
          name: 'name',
          label: 'director Name',
          type: 'text',
          required: true,
          placeholder: 'Enter director name'
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

      initialData={{ role: 'class_superviso' }}
      defaultFilters={{ role: 'class_superviso' }} 
    />
  );
}