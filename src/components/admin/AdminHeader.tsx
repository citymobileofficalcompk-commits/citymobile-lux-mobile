import { Search, Bell, User, ChevronRight } from 'lucide-react';
import { useLocation } from '@tanstack/react-router';

export function AdminHeader() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  return (
    <header className="h-20 bg-slate-50/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-400 font-medium">Admin</span>
        {pathParts.map((part, index) => (
          index > 0 && (
            <div key={part} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className={index === pathParts.length - 1 ? "text-[#001C4B] font-bold capitalize" : "text-slate-400 font-medium capitalize"}>
                {part}
              </span>
            </div>
          )
        ))}
        {pathParts.length === 1 && (
          <div className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-[#001C4B] font-bold">Dashboard</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
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
