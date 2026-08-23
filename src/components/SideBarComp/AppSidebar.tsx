"use client";

import {
  BookOpen,
  DoorOpen,
  GalleryVerticalEnd,
  IdCard,
  Settings2,
  SquareTerminal,
  UserCog,
  UserRoundPlus,
} from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../shadcnui/sidebar";
import Image from "next/image";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: SquareTerminal,
  },
  {
    title: "Visitor Registrations",
    url: "/user/registration",
    icon: UserRoundPlus,
  },

  {
    title: "Visitor",
    url: "/user/checkin",
    icon: IdCard,
  },
  {
    title: "Check-in",
    url: "/user",
    icon: DoorOpen,
  },
  {
    title: "ner",
    url: "#",
    icon: BookOpen,
  },
];

const mes = [
  {
    title: "Playground",
    url: "#",
    icon: SquareTerminal,
  },
];

const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  return (
    <>
      <Sidebar
        collapsible="icon"
        {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent group-data-[collapsible=icon]:justify-center">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-5" />
                </div>

                <div className="flex flex-col overflow-hidden leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">VisiFlow</span>

                  <span className="text-muted-foreground truncate text-sm">
                    Enterprise
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>

            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <item.icon className="size-4" />
                    <Link
                      href={item.url as Route}
                      className="w-full">
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>
    </>
  );
};

export default AppSidebar;
