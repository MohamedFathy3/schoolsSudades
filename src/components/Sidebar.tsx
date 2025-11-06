'use client'

import { 
  Home, 
  School, 
  Users, 
  UserPlus, 
  BookOpen, 
  GraduationCap, 
  User, 
  Shield, 
  Crown,
  FileText,
  ChevronDown, 
  ChevronRight, 
  LucideIcon,
  Gauge
} from "lucide-react"
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'
import { useState } from 'react'
import '@/styles/globals.css'

type ChildItem = {
  name: string
  href: string
  icon: LucideIcon
}

type NavItem = {
  name: string
  href?: string
  icon: LucideIcon
  children?: ChildItem[]
  roles?: string[]
}

const navItems: NavItem[] = [
  // Admin Routes
  { 
    name: 'Dashboard', 
    icon: Home, 
    href: '/admin',
    roles: ['super_admin'] 
  },
  { 
    name: 'School Management', 
    icon: School, 
    href: '/admin/createSchool',
    roles: ['super_admin'] 
  },
  //director
  { 

    name: 'School Management', 
    icon: School, 
    href: '/director',
    roles: ['director','class_supervisor'] 
  },
  // Reception Routes
  { 
    name: 'Dashboard', 
    icon: Home, 
    href: '/reception',
    roles: ['reception'] 
  },
  { 
    name: 'Add Students', 
    icon: UserPlus, 
    href: '/reception/students',
    roles: ['reception'] 
  },

  // Manager Routes
  { 
    name: 'Dashboard', 
    icon: Gauge, 
    href: '/manager',
    roles: ['manager'] 
  },
  { 
    name: 'Reception Management', 
    icon: Users, 
    href: '/manager/reseption',
    roles: ['manager'] 
  },
    { 
    name: 'HR Management', 
    icon: Users, 
    href: '/manager/hr',
    roles: ['manager'] 
  },

  { 
    name: 'accountant Management', 
    icon: Users, 
    href: '/manager/accountant',
    roles: ['manager'] 
  },

  
  { 
    name: 'Chapters Management', 
    icon: BookOpen, 
    href: '/manager/Chapters',
    roles: ['manager'] 
  },
  { 
    name: 'Students Management', 
    icon: GraduationCap, 
    href: '/manager/students',
    roles: ['manager'] 
  },
  { 
    name: 'Teachers Management', 
    icon: User, 
    href: '/manager/teacher',
    roles: ['manager'] 
  },
  { 
    name: 'Supervisors Management', 
    icon: Shield, 
    href: '/manager/supervisor',
    roles: ['manager'] 
  },
  
  { 
    name: 'Directors Management', 
    icon: Crown, 
    href: '/manager/director',
    roles: ['manager'] 
  },



    { 
    name: 'attendance Management', 
    icon: Crown, 
    href: '/hr/attendance',
    roles: ['hr'] 
  },
  // Teacher Routes
  { 
    name: 'Dashboard', 
    icon: Home, 
    href: '/teacher',
    roles: ['teacher'] 
  },
  { 
    name: 'My Students', 
    icon: Users, 
    href: '/teacher/students',
    roles: ['teacher'] 
  },
  { 
    name: 'Create Exam', 
    icon: FileText, 
    href: '/teacher/AddExam',
    roles: ['teacher'] 
  },
    { 
    name: 'Exam', 
    icon: FileText, 
    href: '/teacher/Exam',
    roles: ['teacher'] 
  },


  { 
    name: 'Account', 
    icon: FileText, 
    href: '/Account/students',
    roles: ['accountant'] 
  },

    { 
    name: 'Account', 
    icon: Home, 
    href: '/Account/',
    roles: ['accountant'] 
  },

   { 
    name: 'expent', 
    icon: Home, 
    href: '/Account/expent',
    roles: ['accountant'] 
  },


/// Perant
   { 
    name: 'Perant', 
    icon: Home, 
    href: '/Perant',
    roles: ['Perant'] 
  },
]

export default function Sidebar({
  open,
  collapsed,
  onClose,
}: {
  open: boolean
  collapsed: boolean
  onClose: () => void
}) {
  const { role, hasRole } = useAuth()
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // فلترة الـ navItems بناءً على الـ role
  const filteredNavItems = navItems.filter(item => {
    if (item.roles) {
      return item.roles.some(requiredRole => hasRole(requiredRole))
    }
    return true
  })

  function toggleDropdown(name: string) {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-20"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 bg-white dark:bg-gray-900 border-r dark:border-gray-700',
          'transition-all duration-300 ease-in-out',
          collapsed ? 'w-20' : 'w-64',
          open ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:static lg:inset-auto'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            {!collapsed ? (
              <h2 className="text-xl font-bold text-gray-800 dark:text-white transition-opacity duration-300">
                ERP System
              </h2>
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                E
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-3">
              {filteredNavItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                const isOpen = openDropdown === item.name

                if (item.children) {
                  return (
                    <li key={item.name}>
                      <div
                        className={cn(
                          'flex items-center justify-between rounded-lg text-sm font-medium transition-colors',
                          collapsed && 'justify-center',
                          isActive
                            ? 'bg-green-100 text-green-700 dark:bg-green-600/20 dark:text-green-400 border border-green-200'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600'
                        )}
                      >
                        {/* اللينك الرئيسي */}
                        <Link
                          href={item.href!}
                          className="flex items-center gap-3 px-3 py-3 flex-1"
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          <span
                            className={cn(
                              'transition-opacity duration-300',
                              collapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
                            )}
                          >
                            {item.name}
                          </span>
                        </Link>

                        {/* زرار التوسيع */}
                        {!collapsed && (
                          <button
                            onClick={() => toggleDropdown(item.name)}
                            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                          >
                            {isOpen ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Submenu */}
                      {isOpen && !collapsed && (
                        <ul className="ml-6 mt-1 space-y-1 border-l-2 border-green-200 pl-3">
                          {item.children!.map((child) => {
                            const isChildActive = pathname === child.href
                            return (
                              <li key={child.name}>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                                    isChildActive
                                      ? 'bg-green-50 text-green-700 dark:bg-green-600/20 dark:text-green-400 font-medium'
                                      : 'text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600'
                                  )}
                                >
                                  <child.icon className="h-4 w-4 shrink-0" />
                                  {child.name}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                }

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href!}
                      className={cn(
                        'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors group',
                        collapsed && 'justify-center',
                        isActive
                          ? 'bg-green-500 text-white dark:bg-green-600 shadow-lg shadow-green-200 dark:shadow-green-900/30 border border-green-600'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600 border border-transparent hover:border-green-200'
                      )}
                    >
                      <Icon className={cn(
                        "h-5 w-5 shrink-0 transition-colors",
                        isActive ? "text-white" : "text-gray-400 group-hover:text-green-500"
                      )} />
                      <span
                        className={cn(
                          'transition-all duration-300',
                          collapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
                        )}
                      >
                        {item.name}
                      </span>
                      
                      {/* مؤشر النشاط */}
                      {isActive && !collapsed && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Display current role */}
          {!collapsed && role && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Role: </span>
                <span className="font-medium text-green-600 dark:text-green-400 capitalize">
                  {role}
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}