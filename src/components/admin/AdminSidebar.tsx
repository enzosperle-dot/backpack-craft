"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Package,
  LayoutDashboard,
  Layers,
  Image,
  HelpCircle,
  Settings,
  LogOut,
  FileText,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Versões", href: "/admin/versoes", icon: Layers },
  { label: "Galeria", href: "/admin/galeria", icon: Image },
  { label: "Changelog", href: "/admin/changelog", icon: FileText },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Downloads", href: "/admin/downloads", icon: Download },
  { label: "Configurações", href: "/admin/configuracoes", icon: Settings },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-white/5 flex flex-col">
      <div className="p-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Package className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="font-display font-bold text-sm">
              BackpackCraft
            </span>
            <p className="text-xs text-muted">Admin</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1",
              pathname === item.href
                ? "bg-primary/15 text-primary border border-primary/25"
                : "text-muted hover:text-foreground hover:bg-white/5"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5">
        <div className="px-3 py-2 mb-2">
          <p className="text-xs text-muted truncate">{email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
