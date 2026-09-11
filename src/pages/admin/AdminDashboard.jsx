import {
  Megaphone,
  Image,
  Users,
  CalendarDays,
  Newspaper,
  Images,
  ArrowRight,
  Trophy,
} from "lucide-react";

import { Link } from "react-router-dom";

const stats = [
  {
    title: "Active Offers",
    value: "5",
    icon: Megaphone,
    path: "/admin/offers",
  },
  {
    title: "Faculty Members",
    value: "9",
    icon: Users,
    path: "/admin/faculty",
  },
  {
    title: "Upcoming Events",
    value: "3",
    icon: CalendarDays,
    path: "/admin/events",
  },
  {
    title: "News Updates",
    value: "3",
    icon: Newspaper,
    path: "/admin/news",
  },
  {
    title: "Gallery Images",
    value: "12",
    icon: Images,
    path: "/admin/gallery",
  },
  {
    title: "Hero Images",
    value: "4",
    icon: Image,
    path: "/admin/hero",
  },
];

const quickActions = [
  {
    title: "Manage Offers",
    description: "Update top bar announcements.",
    icon: Megaphone,
    path: "/admin/offers",
  },
  {
    title: "Edit Hero",
    description: "Change hero slider images.",
    icon: Image,
    path: "/admin/hero",
  },
  {
    title: "Manage Faculty",
    description: "Add or edit faculty members.",
    icon: Users,
    path: "/admin/faculty",
  },
  {
    title: "Manage News",
    description: "Publish a new website update.",
    icon: Newspaper,
    path: "/admin/news",
  },
];

const AdminDashboard = () => {
  return (
    <div>
      {/* Page Heading */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Website Overview
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Manage and update Ambition Classes website content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.title}
              to={stat.path}
              className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] leading-tight text-gray-500">
                    {stat.title}
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#00563f]">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef8f5] text-[#00563f] transition group-hover:bg-[#00563f] group-hover:text-white">
                  <Icon size={19} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <section className="mt-6">
        <h3 className="text-base font-bold text-gray-800">
          Quick Actions
        </h3>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                to={action.path}
                className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    size={22}
                    className="text-[#00563f]"
                  />

                  <ArrowRight
                    size={16}
                    className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#00563f]"
                  />
                </div>

                <p className="mt-3 text-sm font-bold text-gray-800">
                  {action.title}
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;