// app/schools/page.tsx
'use client';
import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";

export default function SchoolsPage() {
  return (
    <GenericDataManager
      endpoint="schools"
      title="Schools Management"
      
      columns={[
        { 
          key: 'id', 
          label: 'ID', 
          sortable: true,
          render: (item) => {
            return `SCH${String(item.id).padStart(3, '0')}`;
          }
        },
        { 
          key: 'logo', 
          label: 'Logo', 
          sortable: false,
          render: (item) => (
            <div className="flex justify-center">
              {item.logo ? (
                <img 
                  src={item.logo} 
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover border border-gray-200 hover:scale-110 transition-transform cursor-pointer"
                  onClick={() => window.open(item.logo, '_blank')}
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center border border-gray-200">
                  <span className="text-white text-xs font-medium">No Logo</span>
                </div>
              )}
            </div>
          )
        },
        { 
          key: 'name', 
          label: 'School Name', 
          sortable: true,
        },
        { 
          key: 'slug', 
          label: 'Slug', 
          sortable: true,
          render: (item) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{item.slug}</code>
          )
        },
        { 
          key: 'email', 
          label: 'Email', 
          sortable: false,
          render: (item) => item.email || 'N/A'
        },
        { 
          key: 'phone', 
          label: 'Phone', 
          sortable: false,
          render: (item) => item.phone || 'N/A'
        },
        { 
          key: 'manager_name', 
          label: 'Manager', 
          sortable: true,
          render: (item) => (
            <div>
              <div className="font-medium">{item.manager_name || 'N/A'}</div>
              {item.manager_email && (
                <div className="text-xs text-gray-500">{item.manager_email}</div>
              )}
            </div>
          )
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
        // الحقول الأساسية
      {
  name: 'logo', 
  label: 'School Logo', 
  type: 'image',
  required: false,
  accept: 'image/png, image/jpg, image/jpeg', // أنواع محددة
  // maxSize: 2 * 1024 * 1024, // 2MB (اختياري)
},
        { 
          name: 'name', 
          label: 'School Name', 
          type: 'text', 
          required: true,
          placeholder: 'Enter school name',
       
        },
        { 
          name: 'slug', 
          label: 'Slug', 
          type: 'text', 
          required: true,
          placeholder: 'school-slug',
      
        },
        { 
          name: 'address', 
          label: 'Address', 
          type: 'text', 
          required: true,
          placeholder: 'Enter full address',
       
        },
        { 
          name: 'phone', 
          label: 'Phone', 
          type: 'text', 
          required: true,
          placeholder: 'Enter phone number',
      
        },
        { 
          name: 'email', 
          label: 'Email', 
          type: 'email', 
          required: true,
          placeholder: 'Enter email address',
        },
       
        { 
          name: 'des', 
          label: 'Description', 
          type: 'textarea', 
          required: false,
          placeholder: 'Enter school description',
          rows: 4
        },
        
       
        { 
          name: 'manager_name', 
          label: 'Manager Name', 
          type: 'text', 
          required: true,
          placeholder: 'Enter manager full name',
         
        },
        { 
          name: 'manager_email', 
          label: 'Manager Email', 
          type: 'email', 
          required: true,
          placeholder: 'manager@school.com',
      
        },
        { 
          name: 'manager_password', 
          label: 'Manager Password', 
          type: 'password', 
          required: true,
          placeholder: 'Enter password for manager account',
        
        }
      ]}
      
      
      additionalData={[
        // { key: 'cities', endpoint: '/cities' },
        // { key: 'types', endpoint: '/school-types' }
      ]}
      
     
    />
  );
}