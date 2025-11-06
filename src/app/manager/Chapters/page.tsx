// app/students/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";

export default function StudentsPage() {
  return (
    <GenericDataManager
      endpoint="classe"
      title="Chapters Management"
      columns={[
        { 
          key: 'id', 
          label: 'ID', 
          sortable: true,
          render: (item) => {
            return `STU${String(item.id).padStart(3, '0')}`;
          }
        },
        { 
          key: 'name', 
          label: 'Student Name', 
          sortable: true,
        },
        { 
          key: 'count', 
          label: 'count', 
          sortable: true,
        },
     
      ]}
      formFields={[
        { 
          name: 'name', 
          label: 'class Name', 
          type: 'text', 
          required: true,
        },
        { 
          name: 'count', 
          label: 'count', 
          type: 'number', 
          required: true,
        },
      
      ]}
      additionalData={[
        { key: 'classes', endpoint: '/classe' } // علشان نحمل قائمة الفصول
      ]}
    />
  );
}