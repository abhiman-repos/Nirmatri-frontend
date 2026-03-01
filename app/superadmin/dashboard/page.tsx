"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  ChevronRight,
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Calendar,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-300 overflow-hidden">
        
        {/* Mobile Menu Overlay */}
        {mobileMenu && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setMobileMenu(false)}
          />
        )}

        {/* ================= SIDEBAR ================= */}
        <aside
          className={`fixed md:static z-50 top-0 left-0 h-full w-72 
          bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl p-6 
          transform transition-all duration-300 ease-out
          ${mobileMenu ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:flex md:flex-col border-r border-gray-200 dark:border-gray-700`}
        >
          {/* Logo Area */}
          <div className="flex flex-col items-center justify-center mb-8 px-4">
            <div className="relative w-60 h-20 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Glow"
                width={800}
                height={800}
                className="absolute scale-[2] blur-md opacity-10"
              />
              <Image
                src="/logo.svg"
                alt="Nirmatri"
                width={800}
                height={800}
                className="relative z-10 scale-125"
                priority
              />
            </div>
            <button
              onClick={() => setMobileMenu(false)}
              className="md:hidden absolute top-4 right-4 p-2"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileMenu={setMobileMenu}
            />
            <SidebarItem
              icon={<Users size={20} />}
              label="Sellers"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileMenu={setMobileMenu}
            />
            <SidebarItem
              icon={<Package size={20} />}
              label="Products"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileMenu={setMobileMenu}
            />
            <SidebarItem
              icon={<BarChart3 size={20} />}
              label="Reports"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileMenu={setMobileMenu}
            />
            <SidebarItem
              icon={<Settings size={20} />}
              label="Settings"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileMenu={setMobileMenu}
            />
          </nav>

          {/* User Profile & Logout */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                SA
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Super Admin</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  ID: Admin1234
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                router.replace("/");
              }}
              className="flex items-center gap-3 text-red-500 hover:text-red-600 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 w-full transition-all group"
            >
              <LogOut size={18} className="group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <div className="flex-1 flex flex-col w-full min-h-screen overflow-hidden">
          
          {/* HEADER */}
          <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-sm px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-30 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <button
                onClick={() => setMobileMenu(true)}
                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
              >
                <Menu size={20} />
              </button>
              <div className="min-w-0">
                <h1 className="text-xl md:text-2xl font-bold capitalize bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent truncate">
                  {activeTab}
                </h1>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              {/* Search Bar - Hidden on mobile */}
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                <Search size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none px-2 text-sm w-32 lg:w-48"
                />
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative flex-shrink-0"
              >
                <div className="relative w-5 h-5">
                  <Sun
                    className={`absolute inset-0 transition-all duration-300 ${
                      darkMode ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    }`}
                    size={20}
                  />
                  <Moon
                    className={`absolute inset-0 transition-all duration-300 ${
                      darkMode ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
                    size={20}
                  />
                </div>
              </button>

              {/* Notifications */}
              <div className="relative flex-shrink-0">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
              </div>
            </div>
          </header>

          {/* CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <RefreshCw size={40} className="animate-spin text-blue-500" />
              </div>
            ) : (
              <div className="max-w-full">
                {activeTab === "Dashboard" && <DashboardOverview />}
                {activeTab === "Sellers" && <SellerManagement />}
                {activeTab === "Products" && <ProductApproval />}
                {activeTab === "Reports" && <Reports />}
                {activeTab === "Settings" && <SettingsPage />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= SIDEBAR ITEM ================= */
interface SidebarProps {
  icon: React.ReactNode;
  label: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setMobileMenu: (open: boolean) => void;
}

function SidebarItem({
  icon,
  label,
  activeTab,
  setActiveTab,
  setMobileMenu,
}: SidebarProps) {
  const isActive = activeTab === label;

  return (
    <div
      onClick={() => {
        setActiveTab(label);
        setMobileMenu(false);
      }}
      className={`
        relative flex items-center gap-3 cursor-pointer p-3 rounded-xl transition-all duration-200
        ${
          isActive
            ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 text-blue-600 dark:text-white shadow-md"
            : "hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
        }
        group overflow-hidden
      `}
    >
      {isActive && (
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-400 rounded-r-full" />
      )}
      <span
        className={`${
          isActive ? "text-blue-600 dark:text-white" : "text-gray-500 dark:text-gray-400"
        } transition-colors flex-shrink-0`}
      >
        {icon}
      </span>
      <span className="flex-1 font-medium truncate">{label}</span>
      {isActive && (
        <ChevronRight size={16} className="text-blue-600 dark:text-white flex-shrink-0" />
      )}
    </div>
  );
}

/* ================= DASHBOARD ================= */
function DashboardOverview() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹2,45,000",
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign size={20} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Total Sellers",
      value: "120",
      change: "+8.2%",
      trend: "up",
      icon: <Users size={20} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Products",
      value: "560",
      change: "+23.1%",
      trend: "up",
      icon: <Package size={20} />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Pending Approvals",
      value: "12",
      change: "-5.3%",
      trend: "down",
      icon: <Clock size={20} />,
      color: "from-orange-500 to-red-500",
    },
  ];

  const recentActivities = [
    { id: 1, action: "New seller registered", time: "5 min ago", status: "success" },
    { id: 2, action: "Product approval pending", time: "15 min ago", status: "warning" },
    { id: 3, action: "Payment processed", time: "1 hour ago", status: "success" },
    { id: 4, action: "System update completed", time: "2 hours ago", status: "info" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}
              >
                {stat.icon}
              </div>
              <div
                className={`flex items-center gap-1 text-xs md:text-sm font-medium px-2 py-1 rounded-full ${
                  stat.trend === "up"
                    ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                    : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                <span className="hidden xs:inline">{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mb-1">
              {stat.title}
            </h3>
            <p className="text-xl md:text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="font-semibold text-base md:text-lg">Revenue Overview</h3>
            <button className="text-xs md:text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Download size={16} />
              <span className="hidden xs:inline">Export</span>
            </button>
          </div>
          <div className="h-48 md:h-64 flex items-center justify-center text-gray-400">
            <BarChart3 size={32} className="md:size-48 opacity-30" />
            <span className="ml-2 text-sm md:text-base">Chart area</span>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
          <h3 className="font-semibold text-base md:text-lg mb-4 md:mb-6">Recent Activities</h3>
          <div className="space-y-3 md:space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                    activity.status === "success"
                      ? "bg-green-500"
                      : activity.status === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium truncate">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= SELLERS ================= */
function SellerManagement() {
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: "Rahul Traders",
      email: "rahul@traders.com",
      status: "approved",
      products: 45,
      revenue: "₹1,25,000",
    },
    {
      id: 2,
      name: "Tech World",
      email: "info@techworld.com",
      status: "pending",
      products: 12,
      revenue: "₹45,000",
    },
    {
      id: 3,
      name: "Fashion Hub",
      email: "contact@fashionhub.com",
      status: "approved",
      products: 89,
      revenue: "₹3,50,000",
    },
    {
      id: 4,
      name: "Home Essentials",
      email: "support@homeessentials.com",
      status: "suspended",
      products: 23,
      revenue: "₹78,000",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || seller.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400";
      case "suspended":
        return "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Seller Management</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search sellers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-auto px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {filteredSellers.map((seller) => (
          <div key={seller.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <Link href={`/superadmin/sellerdetail`}>
              <div className="cursor-pointer mb-3">
                <p className="font-semibold text-lg">{seller.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{seller.email}</p>
              </div>
            </Link>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-gray-500">Products</p>
                <p className="font-medium">{seller.products}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Revenue</p>
                <p className="font-medium">{seller.revenue}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(seller.status)}`}>
                {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
              </span>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Seller</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Products</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Revenue</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSellers.map((seller) => (
              <tr key={seller.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="py-3 px-4">
                  <Link href={`/superadmin/sellerdetail`}>
                    <div className="cursor-pointer hover:text-blue-600 transition-colors">
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{seller.email}</p>
                    </div>
                  </Link>
                </td>
                <td className="py-3 px-4">{seller.products}</td>
                <td className="py-3 px-4 font-medium">{seller.revenue}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(seller.status)}`}>
                    {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= PRODUCTS ================= */
function ProductApproval() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 15",
      seller: "Tech World",
      price: "₹79,999",
      status: "pending",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=50&h=50&fit=crop",
    },
    {
      id: 2,
      name: "Gaming Laptop",
      seller: "Tech World",
      price: "₹1,25,000",
      status: "approved",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e230b?w=50&h=50&fit=crop",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      seller: "Audio Store",
      price: "₹4,999",
      status: "pending",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&h=50&fit=crop",
    },
    {
      id: 4,
      name: "Smart Watch",
      seller: "Gadget Hub",
      price: "₹12,999",
      status: "rejected",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=50&h=50&fit=crop",
    },
  ]);

  const updateStatus = (id: number, status: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={16} className="text-green-500" />;
      case "pending":
        return <Clock size={16} className="text-yellow-500" />;
      case "rejected":
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Product Approval Queue</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Filter size={18} />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Calendar size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <Link href={`/superadmin/product`}>
                  <h3 className="font-semibold hover:text-blue-600 cursor-pointer truncate">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{product.seller}</p>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{product.price}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:ml-auto">
              <span
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  product.status === "approved"
                    ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                    : product.status === "pending"
                    ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                    : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                }`}
              >
                {getStatusIcon(product.status)}
                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
              </span>
              
              {product.status === "pending" && (
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => updateStatus(product.id, "approved")}
                    className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(product.id, "rejected")}
                    className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= REPORTS ================= */
function Reports() {
  const reports = [
    { title: "Monthly Revenue", value: "₹4,20,000", change: "+15.3%", period: "vs last month" },
    { title: "Total Orders", value: "1,234", change: "+8.7%", period: "vs last month" },
    { title: "Avg Order Value", value: "₹3,450", change: "+5.2%", period: "vs last month" },
    { title: "Conversion Rate", value: "3.2%", change: "+0.8%", period: "vs last month" },
  ];

  const topProducts = [
    { name: "iPhone 15", sales: 234, revenue: "₹1,85,00,000" },
    { name: "Gaming Laptop", sales: 89, revenue: "₹1,11,25,000" },
    { name: "Wireless Headphones", sales: 567, revenue: "₹28,35,000" },
    { name: "Smart Watch", sales: 345, revenue: "₹44,85,000" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {reports.map((report, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mb-2">{report.title}</h3>
            <p className="text-xl md:text-3xl font-bold mb-2">{report.value}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-green-500 text-xs md:text-sm font-medium">{report.change}</span>
              <span className="text-gray-400 text-xs">{report.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Top Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Top Performing Products</h3>
        
        {/* Mobile Card View */}
        <div className="block md:hidden space-y-4">
          {topProducts.map((product, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <p className="font-semibold mb-2">{product.name}</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500">Units Sold</p>
                  <p className="font-medium">{product.sales}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="font-medium">{product.revenue}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                    style={{ width: `${Math.min(100, (product.sales / 600) * 100)}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {Math.round((product.sales / 600) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Product</th>
                <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Units Sold</th>
                <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Revenue</th>
                <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Performance</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700/50">
                  <td className="py-3 font-medium">{product.name}</td>
                  <td className="py-3">{product.sales}</td>
                  <td className="py-3 font-medium">{product.revenue}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          style={{ width: `${Math.min(100, (product.sales / 600) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.round((product.sales / 600) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ================= SETTINGS ================= */
function SettingsPage() {
  const [view, setView] = useState("menu");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    autoApprove: false,
    maintenanceMode: false,
  });

  const menuItems = [
    { id: "password", label: "Change Password", icon: <Settings size={18} /> },
    { id: "admin", label: "Add Sub Admin", icon: <UserPlus size={18} /> },
    { id: "role", label: "Role Management", icon: <Users size={18} /> },
    { id: "notifications", label: "Notification Settings", icon: <Bell size={18} /> },
    { id: "security", label: "Security", icon: <AlertCircle size={18} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
        {view === "menu" && (
          <>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Settings</h2>
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors text-left"
                >
                  <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.icon}</span>
                  <span className="flex-1 font-medium text-sm md:text-base truncate">{item.label}</span>
                  <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Toggle Settings */}
            <div className="mt-6 md:mt-8 space-y-4">
              <h3 className="font-semibold text-base md:text-lg mb-4">System Preferences</h3>
              {Object.entries(settings).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-gray-700"
                >
                  <span className="text-sm md:text-base capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <button
                    onClick={() => setSettings((prev) => ({ ...prev, [key]: !value }))}
                    className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                      value ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        value ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {view !== "menu" && (
          <div>
            <button
              onClick={() => setView("menu")}
              className="mb-4 md:mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              <ChevronRight size={16} className="rotate-180" />
              <span className="text-sm md:text-base">Back to Settings</span>
            </button>
            <h3 className="text-lg md:text-xl font-semibold capitalize mb-4">
              {view.replace(/([A-Z])/g, " $1").trim()}
            </h3>
            <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-center text-gray-500 text-sm md:text-base">
              {view.replace(/([A-Z])/g, " $1").trim()} configuration interface
            </div>
          </div>
        )}
      </div>
    </div>
  );
}