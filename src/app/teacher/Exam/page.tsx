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
      endpoint="list/exams"
      title="exams Management"
      columns={[
        { 
          key: 'id', 
          label: 'ID', 
          sortable: true,
          render: (item) => `TCH${String(item.id).padStart(3, '0')}`
        },
        { 
          key: 'exam_name', 
          label: 'exam_name ', 
          sortable: true 
        },
        { 
          key: 'total_mark', 
          label: 'total_mark', 
          sortable: true 
        },
        { 
          key: 'class', 
          label: 'class', 
          sortable: false 
        },
  
        { 
          key: 'view', 
          label: 'View', 
          sortable: false,
          render: (item) => {
            return (
              <Link href={`/teacher/Exam/${item.id}`}>
                <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  <Eye size={16} />
                  <span>View</span>
                </button>
              </Link>
            );
          }
        },
       
      ]}

    
     
      showActiveToggle={false}
      showAddButton={false}
      showEditButton={false}
      showDeleteButton={false}
      showSearch={true}
      showBulkActions={false}
      showDeletedToggle={false}

      
    />
  );
}