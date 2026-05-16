import { User, ChevronRight, Menu } from 'lucide-react';
import { useLocation } from '@tanstack/react-router';

interface AdminHeaderProps {
  onMobileMenuClick?: () => void;
}

export function AdminHeader({ onMobileMenuClick }: AdminHeaderProps) {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  return (
    <header className="h-20 bg-slate-50/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        <button
          onClick={onMobileMenuClick}
          aria-label="Open menu"
          className="lg:hidden w-10 h-10 shrink-0 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#001C4B] hover:bg-slate-100 active:scale-95 transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm min-w-0 overflow-hidden">
          <span className="text-slate-400 font-medium shrink-0">Admin</span>
          {pathParts.map((part, index) => (
            index > 0 && (
              <div key={part} className="flex items-center gap-2 min-w-0">
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                <span className={`truncate ${index === pathParts.length - 1 ? "text-[#001C4B] font-bold capitalize" : "text-slate-400 font-medium capitalize"}`}>
                  {part}
                </span>
              </div>
            )
          ))}
          {pathParts.length === 1 && (
            <div className="flex items-center gap-2 min-w-0">
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              <span className="text-[#001C4B] font-bold truncate">Dashboard</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-[#001C4B]">Super Admin</p>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Owner</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#001C4B] to-[#000B29] flex items-center justify-center border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform">
            <User className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
