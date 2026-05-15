import { Link, useLocation } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Package,
  Tag,
  MessageSquare,
  LogOut,
  Smartphone,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: Tag, label: 'Offers', href: '/admin/offers' },
  { icon: MessageSquare, label: 'Reviews', href: '/admin/reviews' },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    window.location.href = '/admin/login';
  };

  return (
    <div
      className={cn(
        'h-screen bg-gradient-to-b from-[#001C4B] to-[#000B29] flex flex-col text-white fixed left-0 top-0 z-50 transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-20' : 'w-72'
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-3 top-10 w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform z-50 ring-2 ring-[#001C4B]"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Brand */}
      <div className={cn('mb-4 transition-all duration-300', collapsed ? 'p-4' : 'p-8')}>
        <Link to="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 whitespace-nowrap',
              collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
            )}
          >
            <h1 className="text-xl font-bold tracking-tight">City Mobile</h1>
            <p className="text-[10px] text-cyan-400 uppercase tracking-[0.2em] font-semibold">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className={cn('flex-1 space-y-2', collapsed ? 'px-3' : 'px-4')}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center rounded-2xl transition-all duration-300 group',
                collapsed ? 'justify-center px-0 py-3.5' : 'justify-between px-4 py-3.5',
                isActive
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <div className={cn('flex items-center', collapsed ? 'gap-0' : 'gap-3')}>
                <item.icon
                  className={cn(
                    'w-5 h-5 shrink-0',
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'
                  )}
                />
                <span
                  className={cn(
                    'font-medium overflow-hidden transition-all duration-300 whitespace-nowrap',
                    collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                  )}
                >
                  {item.label}
                </span>
              </div>
              {isActive && !collapsed && <ChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className={cn('border-t border-white/5', collapsed ? 'p-3' : 'p-6')}>
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          className={cn(
            'flex items-center w-full rounded-2xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group',
            collapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-4'
          )}
        >
          <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
            <LogOut className="w-5 h-5" />
          </div>
          <span
            className={cn(
              'font-semibold overflow-hidden transition-all duration-300 whitespace-nowrap',
              collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
            )}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
