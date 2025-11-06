// app/teachers/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";

export default function TeachersPage() {

  return (
    <GenericDataManager
      endpoint="expense"
      title="expense Management"
      columns={[
        { 
          key: 'id', 
          label: 'ID', 
          sortable: true,
          render: (item) => `TCH${String(item.id).padStart(3, '0')}`
        },
        { 
          key: 'title', 
          label: 'title Name', 
          sortable: true 
        },
        { 
          key: 'amount', 
          label: 'amount', 
          sortable: true 
        },
        { 
          key: 'description', 
          label: 'description', 
          sortable: false 
        },    { 
          key: 'expense_date', 
          label: 'expense_date', 
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
          name: 'title',
          label: 'title Name',
          type: 'text',
          required: true,
          placeholder: 'Enter title name'
        },
        {
          name: 'amount',
          label: 'amount',
          type: 'number',
          required: true,
          placeholder: 'Enter amount '
        },
  
        {
          name: 'phone',
          label: 'Phone',
          type: 'tel',
          required: false,
          placeholder: 'Enter phone number'
        },
        {
          name: 'description',
          label: 'description',
          type: 'text',
          required: false,
          placeholder: 'Enter description'
        },
       
        {
          name: 'expense_date',
          label: 'expense_date ',
          type: 'date',
          required: false
        }
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