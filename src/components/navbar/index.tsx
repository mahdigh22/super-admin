import { useNavigate } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Calendar, Home, Inbox, Search } from "lucide-react";

export default function Navbar() {
  const items = [
    {
      title: "Home",
      url: "/home",
      icon: Home,
    },
    {
      title: "Store",
      url: "/store",
      icon: Inbox,
    },
    {
      title: "Contracts",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Login",
      url: "/login",
      icon: Search,
    },
  ];
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar trigger that stays visible */}

      {/* Collapsible Sidebar */}
      <Sidebar variant="sidebar">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              {" "}
              <span className="text-sm font-bold">Super Admin</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="w-full bg-white p-5 ">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                </div>
                <div className="space-y-2">
                  {items.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="group flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 hover:shadow-md transition"
                    >
                      <SidebarMenuButton
                        onClick={() => {
                          navigate({ to: item.url });
                        }}
                      >
                        <a
                          href={item.url}
                          className="flex items-center gap-3 text-gray-600 group-hover:text-blue-400"
                        >
                          <item.icon className="text-gray-400 group-hover:text-blue-600 w-5 h-5" />
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
