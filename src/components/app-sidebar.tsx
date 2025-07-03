'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Home,
  Send,
  Receipt,
  History,
  MessageSquare,
  UserCircle,
  LogOut,
  Wallet,
} from 'lucide-react';

const menuItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/transfer', label: 'Transfer', icon: Send },
  { href: '/bills', label: 'Bills & Recharges', icon: Receipt },
  { href: '/history', label: 'History', icon: History },
  { href: '/support', label: 'Support', icon: MessageSquare },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
          <div className="p-2.5 rounded-lg bg-primary text-primary-foreground">
            <Wallet size={24} />
          </div>
          <h1 className="text-2xl font-bold text-primary">PayMate</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                className="justify-start"
                size="lg"
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <SidebarSeparator />
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton variant="ghost" className="justify-start">
                    <UserCircle/>
                    <span>Alex Turner</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton variant="ghost" className="justify-start text-destructive hover:text-destructive">
                    <LogOut/>
                    <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
