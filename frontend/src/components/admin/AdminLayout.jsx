import AdminSidebar from "../admin/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#080E1A' }}>
      <AdminSidebar />
      <main className="flex-1 ml-64" style={{ backgroundColor: '#080E1A' }}>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
