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
          label: ' Name', 
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
        },
        { 
          key: 'expense_date', 
          label: 'expense_date', 
          sortable: false 
        },
      
       
      ]}

    

      formFields={[
        {
          name: 'title',
          label: 'title ',
          type: 'text',
          required: true,
          placeholder: 'Enter  title'
        },
        {
          name: 'amount',
          label: 'amount',
          type: 'number',
          required: true,
          placeholder: 'Enter  amount'
        },
        {
          name: 'description',
          label: 'description',
          type: 'textarea',
          required: true,
          placeholder: 'Enter description'
        },
        {
          name: 'expense_date',
          label: 'expense_date',
          type: 'date',
          required: false,
          placeholder: 'Enter  expense_date'
        },
   
      ]}
     
      showActiveToggle={true}
      showAddButton={true}
      showEditButton={true}
      showDeleteButton={true}
      showSearch={true}
      showBulkActions={true}
      showDeletedToggle={true}

 
    />
  );
}