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
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Calendar,
  RefreshCw,
  UserPlus,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface Activity {
  id?: string;
  action: string;
  status: "success" | "warning" | "info";
}

interface Seller {
  _id: string
  ownerName: string
  email: string
  status: string
  products: number
  revenue: number
}



/* ================= API URL ================= */

const API = "http://127.0.0.1:8000/api/admin";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();



  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-300 overflow-hidden">

      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />


      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed z-40 top-0 left-0 h-screen w-[280px]
  bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl p-6
  transform transition-all duration-300
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  border-r border-gray-200 dark:border-gray-700`}
      >
        {/* Logo Area */}
        <div className="flex flex-col items-center justify-center mb-8 px-4">


          <div className="flex items-center gap-5 mb-5 p-4 bg-green-50 dark:bg-gray-700/50 rounded-xl">
            <button
              type="button"
              title="Toggle Mobile Menu"
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
            >
              <X size={20} />
            </button>

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
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          <SidebarItem
            icon={<LayoutDashboard size={30} />}
            label="Dashboard"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
          />
          <SidebarItem
            icon={<Users size={30} />}
            label="Sellers"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
          />
          <SidebarItem
            icon={<Package size={30} />}
            label="Products"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
          />
          <SidebarItem
            icon={<BarChart3 size={30} />}
            label="Reports"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
          />
          <SidebarItem
            icon={<Settings size={30} />}
            label="Settings"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
          />
        </nav>

        {/* User Profile & Logout */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">

          <button
            type="button"
            title="Logout"
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
      <div
        className={`flex-1 flex flex-col w-full min-h-screen overflow-hidden transition-all duration-300
  ${sidebarOpen ? "ml-[280px]" : ""}`}
      >

        {/* HEADER */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-sm px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-30 border-b border-gray-200 dark:border-gray-700">
          <button
            type="button"
            title="Toggle Mobile Menu"
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3 md:gap-4 min-w-0">

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
          <div className="relative w-60 h-20 flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Glow"
              width={800}
              height={800}
              className="absolute scale-[2] blur-md opacity-30"
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
  );
}

/* ================= SIDEBAR ITEM ================= */
interface SidebarProps {
  icon: React.ReactNode;
  label: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSidebarOpen: (open: boolean) => void;
}

function SidebarItem({
  icon,
  label,
  activeTab,
  setActiveTab,
  setSidebarOpen,
}: SidebarProps) {
  const isActive = activeTab === label;

  return (
    <div
      onClick={() => {
        setActiveTab(label);
        setSidebarOpen(false);
      }}
      className={`
        relative flex items-center gap-3 cursor-pointer p-3 rounded-xl transition-all duration-100
        ${isActive
          ? "bg-gradient-to-br from-blue-50 to-blue-300 dark:from-gray-700 dark:to-gray-600 text-blue-600 dark:text-white shadow-md"
          : "hover:bg-green-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
        }
        group overflow-hidden
      `}
    >
      {isActive && (
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-400 rounded-r-full" />
      )}

      <span
        className={`${isActive
          ? "text-blue-600 dark:text-white"
          : "text-gray-500 dark:text-gray-400"
          } transition-colors`}
      >
        {icon}
      </span>

      <span className="flex-1 font-medium">{label}</span>

      {isActive && (
        <ChevronRight size={16} className="text-blue-600 dark:text-white" />
      )}
    </div>
  );
}

/* ================= DASHBOARD ================= */

function DashboardOverview() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {

    // Dashboard stats
    fetch(`${API}/dashboard/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    })
      .then(res => res.json())
      .then(data => setStats(data))


    // Recent activities
    fetch(`${API}/activities/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    })
      .then(res => res.json())
      .then(data => setActivities(data.activities || []))

  }, [])

  const statsData = [

    {
      title: "Total Revenue",
      value: stats?.revenue || "₹0",
      icon: <DollarSign />,
      color: "from-white to-emerald-500",
      trend: "up",
      change: "+12.5%"
    },

    {
      title: "Total Sellers",
      value: stats?.total_sellers || 0,
      icon: <Users />,
      color: "from-purple-500 to-purple-600",
      trend: "up",
      change: "+8.2%"
    },

    {
      title: "Total Products",
      value: stats?.products || 0,
      icon: <Package />,
      color: "from-orange-100 to-orange-600",
      trend: "up",
      change: "+5.1%"
    },

    {
      title: "Pending Sellers",
      value: stats?.pending_sellers || 0,
      icon: <Clock />,
      color: "from-red-500 to-red-600",
      trend: "down",
      change: "-3.4%"
    },

  ]


  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 bg-gradient-to-br from-white to-in-500 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
        {statsData.map((stat: any, index: number) => (
          <div
            key={index}
            className="bg- dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}
              >
                {stat.icon}
              </div>
              <div
                className={`flex items-center gap-1 text-xs md:text-sm font-medium px-2 py-1 rounded-full ${stat.trend === "up"
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
            <button title="Export Revenue Data" className="text-xs md:text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
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
            {activities.map((activity, index) => (
              <div key={activity.id ?? index} className="flex items-start gap-3">
                <div
                  className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${activity.status === "success"
                    ? "bg-green-500"
                    : activity.status === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                    }`}
                />
                <p>{activity.action}</p>
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
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadSellers();
  }, []);

  const loadSellers = async () => {
    const res = await fetch(`${API}/sellers/`, {  //
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    const data = await res.json();

    console.log("SELLERS DATA:", data);

    setSellers(data.sellers || []);
  };
  //  const API = "http://127.0.0.1:8000/api/admin";
  const approve = async (id: string) => {

    const res = await fetch(`${API}/seller/approve/${id}/`, { //
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log("APPROVE RESPONSE:", data);

    loadSellers();
  };
  const reject = async (id: string) => {
    await fetch(`${API}/seller/reject/${id}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    loadSellers();
  };

  const filteredSellers = sellers.filter((s: any) => {

    const matchSearch =
      (s.shopName || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      filterStatus === "all" || s.status === filterStatus;

    return matchSearch && matchStatus;

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
          title="Filter by Status"
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
          <div key={seller._id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <Link href={`/superadmin/sellerdetail/${seller._id}`}>
              <div className="cursor-pointer mb-3">
                <p className="text-lg font-bold text-Black-900 dark:text-white">
                  {seller.ownerName}
                </p>
                <p className="text-lg font-bold text-sm text-black-500 dark:text-gray-400 truncate uppercase">
                  {seller.email}
                </p>
              </div>
            </Link>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-gray-500">Products</p>
                <p className="font-medium">{seller.products || 0}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Revenue</p>
                <p className="font-medium">{seller.revenue || 0}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(seller.status)}`}>
                {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
              </span>
              <button title="View seller options" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
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
              <tr key={seller._id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="py-3 px-4">
                  <Link href={`/superadmin/sellerdetail/${seller._id}`}>
                    <div className="cursor-pointer hover:text-blue-600 transition-colors">
                      <p className="font-medium">{seller.ownerName}</p>
                      <p className="text-sm font-bold text-black-500 dark:text-gray-400 uppercase">{seller.email}</p>
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
                <td className="py-3 px-4 flex gap-2">

                  <button
                    title="Approve Seller"
                    onClick={() => approve(seller._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                  >
                    Approve
                  </button>

                  <button
                    title="Reject Seller"
                    onClick={() => reject(seller._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    Reject
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
          <button title="Filter products" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Filter size={18} />
          </button>
          <button title="Filter by date" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
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
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${product.status === "approved"
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
                    title="Approve Product"
                    onClick={() => updateStatus(product.id, "approved")}
                    className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                  >
                    Approve
                  </button>
                  <button
                    title="Reject Product"
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
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
            >
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
                  //  style={{ width: `${Math.min(100, (product.sales / 600) * 100)}%` }}
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
                        //  style={{ width: `${Math.min(100, (product.sales / 600) * 100)}%` }}
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
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    autoApprove: false,
    maintenanceMode: false,
  });
  // change password function
  const changePassword = async () => {

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const res = await fetch(`${API}/change-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        },
        body: JSON.stringify({
          admin_id: localStorage.getItem("adminId"),
          old_password: oldPassword,
          new_password: newPassword
        })
      });

      const data = await res.json();

      alert(data.message || "Password updated");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.error(error);
      alert("Error updating password");
    }
  };

  // add sub admin function
  const addSubAdmin = async () => {

    try {

      const res = await fetch(`${API}/add-subadmin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })

      const data = await res.json()

      alert(data.message || "Sub admin created")

      setName("")
      setEmail("")
      setPassword("")

    } catch (err) {
      console.error(err)
    }
  }
  /* ===== LOAD SETTINGS FROM BACKEND ===== */

  useEffect(() => {

    fetch(`${API}/settings/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    })
      .then(res => res.json())
      .then(data => setSettings(data))

  }, []);

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
                  title={item.label}
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
                    title="Toggle Setting"
                    onClick={async () => {

                      const updated = { ...settings, [key]: !value }

                      setSettings(updated)

                      await fetch(`${API}/settings/update/`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
                        },
                        body: JSON.stringify(updated)
                      })

                    }}
                    className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${value ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${value ? "translate-x-6" : ""
                        }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {view === "password" && (

          <div>

            <button
              onClick={() => setView("menu")}
              className="mb-4 text-blue-600 flex items-center gap-2"
            >
              <ChevronRight size={16} className="rotate-180" />
              Back
            </button>

            <h3 className="text-xl font-semibold mb-4">Change Password</h3>

            <div className="space-y-4">

              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <button
                onClick={changePassword}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update Password
              </button>

            </div>

          </div>

        )}

        {view === "admin" && (

          <div>

            <button
              onClick={() => setView("menu")}
              className="mb-4 text-blue-600 flex items-center gap-2"
            >
              <ChevronRight size={16} className="rotate-180" />
              Back
            </button>

            <h3 className="text-xl font-semibold mb-4">Add Sub Admin</h3>

            <div className="space-y-4">

              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <button
                onClick={addSubAdmin}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Create Sub Admin
              </button>

            </div>

          </div>

        )}
        {view !== "menu" && view !== "password" && view !== "admin" && (
          <div>
            <button
              title="Back to Settings"
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