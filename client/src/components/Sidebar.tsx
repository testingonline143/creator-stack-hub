import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home, 
  BookOpen, 
  Lightbulb, 
  FileText, 
  GraduationCap, 
  Trophy, 
  HelpCircle, 
  Settings 
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Creator Stories", href: "/creator-stories" },
  { icon: Lightbulb, label: "Content Ideas", href: "/content-ideas" },
  { icon: FileText, label: "Product Showcase", href: "/products" },
  { icon: GraduationCap, label: "Learning Hub", href: "/learning" },
  { icon: Trophy, label: "Success Stories", href: "/success-stories" },
];

const otherItems = [
  { icon: HelpCircle, label: "Support", href: "/support" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="text-xl font-bold">
            Creator <span className="text-orange-500">Stack</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            MAIN
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-orange-50 text-orange-700" 
                    : "text-gray-700 hover:bg-gray-100"
                )}>
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 space-y-1">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            OTHERS
          </div>
          {otherItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-orange-50 text-orange-700" 
                    : "text-gray-700 hover:bg-gray-100"
                )}>
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}