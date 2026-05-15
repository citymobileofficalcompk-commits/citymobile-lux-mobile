import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { supabase } from '@/lib/supabase';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('admin-sidebar-collapsed') === 'true';
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin-sidebar-collapsed', String(next));
      }
      return next;
    });
  };
  
  const isLoginPage = location.pathname === '/admin/login';

  useEffect(() => {
    setIsClient(true);
    // Check authentication
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user && !isLoginPage) {
        navigate({ to: '/admin/login' });
      } else if (user && isLoginPage) {
        navigate({ to: '/admin' });
      }
      setIsAuthenticated(!!user);
    };

    checkAuth();
  }, [isLoginPage, navigate]);

  // Prevent hydration mismatch by returning a consistent shell during SSR
  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If it's the login page, just render the outlet without layout
  if (isLoginPage) {
    return <Outlet />;
  }

  // Show loading state if we haven't checked auth yet
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If authenticated (or we are on login page), show the layout
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 lg:ml-72">
        <AdminHeader />
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
