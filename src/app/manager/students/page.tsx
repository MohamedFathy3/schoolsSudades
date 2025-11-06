// app/students/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useAuth } from '@/contexts/AuthContext';

export default function StudentsPage() {
  const { user } = useAuth();

  return (
    <GenericDataManager
      endpoint="student"
      title="Students Management"
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
          key: 'age', 
          label: 'Age', 
          sortable: true,
        },
        { 
          key: 'education_stage', 
          label: 'Education Stage', 
          sortable: true,
        },
        { 
          key: 'term', 
          label: 'Term', 
          sortable: true,
        },
        { 
          key: 'father.name', 
          label: 'Father Name', 
          sortable: true,
        },
        { 
          key: 'father.phone', 
          label: 'Father Phone', 
          sortable: false,
        },
        { 
          key: 'classroom', 
          label: 'Class', 
          sortable: true,
         
        }
      ]}
      showAddButton={false}
      showEditButton={false}
      showDeleteButton={false}
  
      // إضافة user_id تلقائياً في البيانات المرسلة
//      initialData={{ 
//   "X-School-ID": user?.id // إضافة user_id من الـ AuthContext
// }}


    />
  );
}