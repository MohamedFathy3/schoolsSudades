// app/receptions/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";

export default function ReceptionsPage() {
  return (
    <GenericDataManager
      endpoint="receptions"
      title="Receptions Management"
      columns={[
        { 
          key: 'id', 
          label: 'ID', 
          sortable: true,
          render: (item) => {
            return `REC${String(item.id).padStart(3, '0')}`;
          }
        },
        { 
          key: 'name', 
          label: 'Name', 
          sortable: true,
        },
        { 
          key: 'email', 
          label: 'Email', 
          sortable: false,
        },
        { 
          key: 'phone', 
          label: 'Phone', 
          sortable: false,
          render: (item) => item.phone || 'N/A'
        },
        { 
          key: 'address', 
          label: 'Address', 
          sortable: false,
          render: (item) => (
            <div className="max-w-[200px] truncate" title={item.address}>
              {item.address || 'N/A'}
            </div>
          )
        }
      ]}
      formFields={[
        { 
          name: 'name', 
          label: 'Reception Name', 
          type: 'text', 
          required: true,
          placeholder: 'Enter reception name (e.g., Ahmed Reception)',
        },
        { 
          name: 'email', 
          label: 'Email', 
          type: 'email', 
          required: true,
          placeholder: 'Enter email address (e.g., receptsons.ahmeds@example.com)',
        },
        { 
          name: 'password', 
          label: 'Password', 
          type: 'password', 
          required: true,
          placeholder: 'Enter password (e.g., 123456)',
        },
        { 
          name: 'phone', 
          label: 'Phone', 
          type: 'text', 
          required: true,
          placeholder: 'Enter phone number (e.g., 12345678)',
        },
        { 
          name: 'address', 
          label: 'Address', 
          type: 'text', 
          required: true,
          placeholder: 'Enter full address (e.g., address address address)',
        }
      ]}
      initialData={{ role: 'reception' }} // علشان يبعت role عند الحفظ
      defaultFilters={{ role: 'reception' }} // علشان يفلتر البيانات حسب role
    />
  );
}