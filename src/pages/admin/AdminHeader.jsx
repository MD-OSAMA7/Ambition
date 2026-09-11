import {
  Bell,
  LogOut,
  UserCircle,
  Menu,
} from "lucide-react";

const AdminHeader = ({ setMobileOpen }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">

      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={21} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-[10px] text-gray-500 sm:text-[11px]">
            Manage your website content
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
        >
          <Bell size={18} />
        </button>

        {/* User */}
        <div className="hidden items-center gap-2 sm:flex">
          <UserCircle
            size={30}
            className="text-gray-500"
          />

          <div>
            <p className="text-xs font-semibold text-gray-700">
              Admin
            </p>

            <p className="text-[10px] text-gray-400">
              Administrator
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-red-500 hover:bg-red-50"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;