import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { adminUser, logoutAdmin } = useAdmin();

  const menuItems = [
    { label: "Dashboard", icon: "📊", path: "/admin" },
    { label: "Orders", icon: "📦", path: "/admin/orders" },
    { label: "Products", icon: "💅", path: "/admin/products" },
    { label: "Messages", icon: "✉️", path: "/admin/messages" },
    { label: "Analytics", icon: "📈", path: "/admin/analytics" },
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white min-h-screen fixed left-0 top-0 border-r border-gray-700">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-serif font-bold text-accent-400">
          ORLEV Admin
        </h2>
        <p className="text-xs text-gray-400 mt-1">Control Panel</p>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-700 mx-4 mt-4 bg-gray-800/50 rounded">
        <p className="text-sm font-semibold">{adminUser?.username}</p>
        <p className="text-xs text-gray-400">{adminUser?.email}</p>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition text-left text-sm font-medium"
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
