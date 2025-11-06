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
      endpoint="hr"
      title="hr Management"
      columns={[
        { 
          key: 'id', 
          label: 'ID', 
          sortable: true,
          render: (item) => `TCH${String(item.id).padStart(3, '0')}`
        },
        { 
          key: 'name', 
          label: 'hr Name', 
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

  
      formFields={[
        {
          name: 'name',
          label: 'hr Name',
          type: 'text',
          required: true,
          placeholder: 'Enter hr name'
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

      initialData={{ role: 'hr' }}
      defaultFilters={{ role: 'hr' }} 
    />
  );
}