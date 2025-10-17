"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { KeyIcon } from "./icons/key";
import { LogoutIcon } from "./ui/logout";
import { TimerIcon } from "./icons/timer";
import { FoldersIcon } from "./icons/folders";
import { authClient } from "@/lib/auth/auth-client";
import { ChartScatterIcon } from "./icons/chart-scatter";
import { PoundSterlingIcon } from "./icons/pound-sterling";
import { useHasActiveSubscription } from "@/features/payments/hooks/use-payments";

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Workflows",
        icon: FoldersIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: TimerIcon,
        url: "/executions",
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link href="/" prefetch>
              <Image src="/logo.svg" alt="instrument" width={30} height={30} />
              <span className="font-semibold text-sm">Instrument</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group, i) => (
          <SidebarGroup key={i}>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={
                      item.url === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.url)
                    }
                    asChild
                    className="gap-x-4 h-10 px-4"
                  >
                    <Link href={item.url}>
                      <item.icon className="" size={16} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuItem>
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuButton
              tooltip="upgrade to pro"
              className="gap-x-4 h-10 px-4"
              onClick={() => authClient.checkout({ slug: "Instrument-Pro" })}
            >
              <PoundSterlingIcon size={16} />
              <span>Upgrade to Pro</span>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="billing portal"
            className="gap-x-4 h-10 px-4"
            onClick={() => authClient.customer.portal()}
          >
            <ChartScatterIcon size={16} />
            <span>Billing Portal</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="logout"
            className="gap-x-4 h-10 px-4"
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    window.location.href = "/login";
                  },
                },
              })
            }
          >
            <LogoutIcon size={16} />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
