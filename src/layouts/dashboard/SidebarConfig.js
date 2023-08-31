/* eslint-disable no-unused-vars */
import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import settingsFill from "@iconify/icons-eva/settings-fill";
import clipboardTaskListLtr20Filled from "@iconify/icons-fluent/clipboard-task-list-ltr-20-filled";
import awardIcon from "@iconify/icons-fa-solid/award";
import umbrellaBeach from "@iconify/icons-fa-solid/umbrella-beach";
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/dashboard/home",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "associates",
    // path: "/dashboard/associates",
    icon: getIcon(peopleFill),
    children: [
      {
        title: "All Employees",
        path: "/dashboard/associates",
      },
      {
        title: "New Employee",
        path: "/dashboard/associates/new/employee",
      },
    ],
  },
  // {
  //   title: "login",
  //   path: "/login",
  //   icon: getIcon(lockFill),
  // },
  {
    title: "Projects",
    // path: "/dashboard/projects",
    icon: getIcon(clipboardTaskListLtr20Filled),
    children: [
      {
        title: "All Projects",
        path: "/dashboard/projects",
      },
      {
        title: "Assigned Projects",
        path: "/dashboard/assigned/projects",
      },
      {
        title: "Mark Attendance",
        path: "/dashboard/assigned/projects/attendance",
      },
    ],
  },
  // {
  //   title: "Holidays",
  //   path: "/holidays",
  //   icon: getIcon(umbrellaBeach),
  // },
  {
    title: "Settings",
    path: "/thanks",
    icon: getIcon(awardIcon),
    children: [
      {
        title: "All Settings",
        path: "/dashboard/settings/sites",
      },
    ],
  },
  // {
  //   title: "register",
  //   path: "/dashboard/register",
  //   icon: getIcon(personAddFill),
  // },
  // {
  //   title: "admin",
  //   path: "/admin",
  //   icon: getIcon(settingsFill),
  //   children: [
  //     {
  //       title: "Database",
  //       path: "/admin/database",
  //     },
  //     {
  //       title: "Import Data",
  //       path: "/admin/import",
  //     },
  //   ],
  // },
  // {
  //   title: "Not found",
  //   path: "/dashboard/error",
  //   icon: getIcon(alertTriangleFill),
  // },
];

export default sidebarConfig;
