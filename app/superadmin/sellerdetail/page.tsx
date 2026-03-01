"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Store,
  Mail,
  Phone,
  MapPin,
  Globe,
  Star,
  Package,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  ShoppingBag,
  TrendingUp,
  BarChart3,
  Download,
  Share2,
  Printer,
  MessageCircle,
  Shield,
  Award,
  X,
  Save,
  Copy,
  Check,
} from "lucide-react";

export default function SellerDetailsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // Seller Data
  const initialSellerData = {
    id: "SLR-001",
    name: "Tech World",
    ownerName: "Rahul Sharma",
    email: "rahul@techworld.com",
    phone: "+91 98765 43210",
    alternatePhone: "+91 98765 43211",
    address: {
      street: "123, Tech Park",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India",
    },
    gstin: "27ABCDE1234F1Z5",
    pan: "ABCDE1234F",
    businessType: "Private Limited",
    yearEstablished: "2018",
    website: "www.techworld.com",
    status: "active",
    verified: true,
    rating: 4.8,
    totalProducts: 156,
    totalOrders: 2345,
    totalRevenue: 45678900,
    joinedDate: "2023-01-15",
    lastActive: "2024-02-22 10:30 AM",
    bankDetails: {
      accountName: "Tech World Pvt Ltd",
      accountNumber: "12345678901",
      bank: "HDFC Bank",
      ifsc: "HDFC0001234",
      branch: "Andheri East",
    },
    stats: {
      monthlySales: 4567890,
      monthlyOrders: 234,
      avgOrderValue: 19500,
      returnRate: 2.5,
      cancellationRate: 1.2,
      topProducts: [
        { name: "iPhone 15", sales: 89 },
        { name: "Gaming Laptop", sales: 45 },
        { name: "Wireless Headphones", sales: 234 },
      ],
    },
    recentOrders: [
      { id: "ORD-001", date: "2024-02-22", amount: 79999, status: "delivered" },
      { id: "ORD-002", date: "2024-02-21", amount: 45999, status: "processing" },
      { id: "ORD-003", date: "2024-02-20", amount: 12999, status: "pending" },
      { id: "ORD-004", date: "2024-02-19", amount: 89999, status: "delivered" },
    ],
    products: [
      { id: "PRD-001", name: "iPhone 15", price: 79999, stock: 45, status: "active" },
      { id: "PRD-002", name: "Gaming Laptop", price: 125000, stock: 12, status: "active" },
      { id: "PRD-003", name: "Wireless Headphones", price: 4999, stock: 89, status: "active" },
      { id: "PRD-004", name: "Smart Watch", price: 12999, stock: 0, status: "out_of_stock" },
    ],
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400';
      case 'suspended': return 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400';
      case 'inactive': return 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Add these states in your component
const [showShareModal, setShowShareModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [showBlockModal, setShowBlockModal] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [copied, setCopied] = useState(false);
const [seller, setSeller] = useState(initialSellerData); // Initialize with the seller data
  // Get order status color
  const getOrderStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-600';
      case 'processing': return 'bg-blue-100 text-blue-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Seller Details</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Seller ID: {seller.id}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
  {/* Print Button */}
  <button 
    onClick={() => window.print()}
    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative group"
    title="Print Seller Details"
  >
    <Printer size={20} />
    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      Print
    </span>
  </button>

  {/* Download Button */}
  <button 
    onClick={() => {
      // Create CSV data
      const sellerData = [
        ['Field', 'Value'],
        ['Seller ID', seller.id],
        ['Business Name', seller.name],
        ['Owner Name', seller.ownerName],
        ['Email', seller.email],
        ['Phone', seller.phone],
        ['Address', `${seller.address.street}, ${seller.address.city}, ${seller.address.state} - ${seller.address.pincode}`],
        ['GSTIN', seller.gstin],
        ['PAN', seller.pan],
        ['Status', seller.status],
        ['Total Products', seller.totalProducts],
        ['Total Orders', seller.totalOrders],
        ['Total Revenue', seller.totalRevenue],
        ['Joined Date', seller.joinedDate],
      ];

      // Convert to CSV
      const csvContent = sellerData.map(row => row.join(',')).join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `seller-${seller.id}-${seller.name}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }}
    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative group"
    title="Download Seller Data"
  >
    <Download size={20} />
    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      Download CSV
    </span>
  </button>

  {/* Share Button */}
  <button 
    onClick={() => setShowShareModal(true)}
    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative group"
    title="Share Seller Profile"
  >
    <Share2 size={20} />
    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      Share
    </span>
  </button>


 <button 
  onClick={() => {
    if (seller.status === 'blocked') {
      // Unblock - direct
      setSeller(prev => ({ ...prev, status: 'active' }));
      alert('Seller unblocked successfully!');
    } else {
      // Block - modal ke saath
      setShowBlockModal(true);
    }
  }}
  className={`px-4 py-2 border rounded-lg transition-all flex items-center gap-2 ${
    seller.status === 'blocked' 
      ? 'border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10' 
      : 'border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10'
  }`}
>
  {seller.status === 'blocked' ? (
    <>
      <span>Unblock Seller</span>
    </>
  ) : (
    <>
      <span>Block Seller</span>
    </>
  )}
</button>
{/* Share Modal */}
{showShareModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Share Seller Profile</h3>
        <button 
          onClick={() => setShowShareModal(false)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      {/* Share Options */}
      <div className="space-y-4">
        {/* Copy Link */}
        <div>
          <label className="text-sm text-gray-500 mb-2 block">Share Link</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={`${window.location.origin}/super-admin/sellers/${seller.id}`}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/super-admin/sellers/${seller.id}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        {/* Share via Email */}
        <button
          onClick={() => {
            const subject = encodeURIComponent(`Seller Profile: ${seller.name}`);
            const body = encodeURIComponent(
              `Check out seller profile:\n\n` +
              `Name: ${seller.name}\n` +
              `Owner: ${seller.ownerName}\n` +
              `Email: ${seller.email}\n` +
              `Phone: ${seller.phone}\n` +
              `Products: ${seller.totalProducts}\n` +
              `Revenue: ₹${seller.totalRevenue}\n\n` +
              `View full profile: ${window.location.origin}/super-admin/sellers/${seller.id}`
            );
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
          }}
          className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Mail size={18} className="text-blue-500" />
          <span>Share via Email</span>
        </button>

        {/* Share via WhatsApp */}
        <button
          onClick={() => {
            const text = encodeURIComponent(
              `*Seller Profile: ${seller.name}*\n\n` +
              `Owner: ${seller.ownerName}\n` +
              `📧 ${seller.email}\n` +
              `📞 ${seller.phone}\n` +
              `📦 Products: ${seller.totalProducts}\n` +
              `💰 Revenue: ₹${seller.totalRevenue}\n\n` +
              `View details: ${window.location.origin}/super-admin/sellers/${seller.id}`
            );
            window.open(`https://wa.me/?text=${text}`, '_blank');
          }}
          className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <MessageCircle size={18} className="text-green-500" />
          <span>Share via WhatsApp</span>
        </button>
      </div>
    </div>
  </div>
)}
{/* Block/Unblock Modal */}
{showBlockModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          seller.status === 'blocked' 
            ? 'bg-green-100 dark:bg-green-500/20' 
            : 'bg-orange-100 dark:bg-orange-500/20'
        }`}>
          {seller.status === 'blocked' ? (
            <CheckCircle className="text-green-500" size={24} />
          ) : (
            <XCircle className="text-orange-500" size={24} />
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold">
            {seller.status === 'blocked' ? 'Unblock Seller' : 'Block Seller'}
          </h3>
          <p className="text-sm text-gray-500">
            {seller.status === 'blocked' 
              ? 'Seller will be able to access their account again' 
              : 'This action can be undone later'}
          </p>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {seller.status === 'blocked' ? (
          <>Are you sure you want to unblock <span className="font-semibold">{seller.name}</span>? 
          They will be able to sell products and access their account again.</>
        ) : (
          <>Are you sure you want to block <span className="font-semibold">{seller.name}</span>? 
          They won't be able to sell products or access their account.</>
        )}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => setShowBlockModal(false)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (seller.status === 'blocked') {
              // Unblock logic
              setSeller(prev => ({ ...prev, status: 'active' }));
              alert(`${seller.name} unblocked successfully!`);
            } else {
              // Block logic
              setSeller(prev => ({ ...prev, status: 'blocked' }));
              alert(`${seller.name} blocked successfully!`);
            }
            setShowBlockModal(false);
          }}
          className={`flex-1 px-4 py-2 text-white rounded-lg hover:shadow-lg transition-all ${
            seller.status === 'blocked'
              ? 'bg-gradient-to-r from-green-500 to-green-600'
              : 'bg-gradient-to-r from-orange-500 to-orange-600'
          }`}
        >
          {seller.status === 'blocked' ? 'Yes, Unblock' : 'Yes, Block'}
        </button>
      </div>
    </div>
  </div>
)}

{/* Add these styles to your global CSS */}
<style jsx>{`
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }
  
  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
  
  @media print {
    body * {
      visibility: hidden;
    }
    .print-section, .print-section * {
      visibility: visible;
    }
    .print-section {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
  }
`}</style>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-6">
            {['overview', 'products', 'orders', 'stats', 'documents'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Seller Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      {seller.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold">{seller.name}</h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(seller.status)}`}>
                          {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                        </span>
                        {seller.verified && (
                          <span className="flex items-center gap-1 text-blue-600 bg-blue-100 dark:bg-blue-500/20 px-2 py-1 rounded-full text-xs">
                            <CheckCircle size={14} />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {seller.ownerName} • {seller.businessType}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{seller.rating}</span>
                          <span className="text-gray-400 text-sm">(234 reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar size={16} />
                          <span className="text-sm">Joined {seller.joinedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2">
                      <button className="p-2 bg-green-100 dark:bg-green-500/20 text-green-600 rounded-lg hover:bg-green-200 dark:hover:bg-green-500/30 transition-colors">
                        <MessageCircle size={18} />
                      </button>
                      <button className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-colors">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 bg-purple-100 dark:bg-purple-500/20 text-purple-600 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-colors">
                        <Phone size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                    <Package className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Products</p>
                    <p className="text-xl font-bold">{seller.totalProducts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 dark:bg-green-500/20 rounded-lg">
                    <ShoppingBag className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-xl font-bold">{seller.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-lg">
                    <DollarSign className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-xl font-bold">{formatPrice(seller.totalRevenue)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-500/20 rounded-lg">
                    <TrendingUp className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg Order Value</p>
                    <p className="text-xl font-bold">{formatPrice(seller.stats.avgOrderValue)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{seller.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{seller.phone}</p>
                        {seller.alternatePhone && (
                          <p className="text-sm text-gray-500">{seller.alternatePhone} (Alt)</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{seller.address.street}</p>
                        <p>{seller.address.city}, {seller.address.state} - {seller.address.pincode}</p>
                        <p>{seller.address.country}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Globe size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <a href={`https://${seller.website}`} target="_blank" className="text-blue-600 hover:underline">
                          {seller.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Business Details</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">GSTIN:</span>
                      <span className="font-medium">{seller.gstin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">PAN:</span>
                      <span className="font-medium">{seller.pan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Business Type:</span>
                      <span className="font-medium">{seller.businessType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Established:</span>
                      <span className="font-medium">{seller.yearEstablished}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Active:</span>
                      <span className="font-medium">{seller.lastActive}</span>
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Bank Details</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Account Name:</span>
                      <span className="font-medium">{seller.bankDetails.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Account No:</span>
                      <span className="font-medium">XXXXXX{ seller.bankDetails.accountNumber.slice(-4) }</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bank:</span>
                      <span className="font-medium">{seller.bankDetails.bank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">IFSC:</span>
                      <span className="font-medium">{seller.bankDetails.ifsc}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Branch:</span>
                      <span className="font-medium">{seller.bankDetails.branch}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Recent Activity */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Orders */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Recent Orders</h3>
                    <button className="text-blue-600 text-sm hover:underline">View All</button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 text-sm font-medium text-gray-500">Order ID</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-500">Date</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-500">Amount</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {seller.recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700/50">
                            <td className="py-3 font-medium">{order.id}</td>
                            <td className="py-3">{order.date}</td>
                            <td className="py-3">{formatPrice(order.amount)}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Top Selling Products</h3>
                  
                  <div className="space-y-4">
                    {seller.stats.topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{product.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">{product.sales} units</span>
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              style={{ width: `${(product.sales / 250) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Performance Metrics</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="text-sm text-gray-500">Monthly Sales</p>
                      <p className="text-xl font-bold">{formatPrice(seller.stats.monthlySales)}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="text-sm text-gray-500">Monthly Orders</p>
                      <p className="text-xl font-bold">{seller.stats.monthlyOrders}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="text-sm text-gray-500">Return Rate</p>
                      <p className="text-xl font-bold">{seller.stats.returnRate}%</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="text-sm text-gray-500">Cancellation Rate</p>
                      <p className="text-xl font-bold">{seller.stats.cancellationRate}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Seller Products</h3>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
                View All Products
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3">Product Name</th>
                    <th className="text-left py-3">Price</th>
                    <th className="text-left py-3">Stock</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {seller.products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="py-3 font-medium">{product.name}</td>
                      <td className="py-3">{formatPrice(product.price)}</td>
                      <td className="py-3">
                        <span className={product.stock === 0 ? 'text-red-500' : ''}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-700 mr-3">View</button>
                        <button className="text-red-600 hover:text-red-700">Block</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Order History</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3">Order ID</th>
                    <th className="text-left py-3">Date</th>
                    <th className="text-left py-3">Customer</th>
                    <th className="text-left py-3">Amount</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {seller.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="py-3 font-medium">{order.id}</td>
                      <td className="py-3">{order.date}</td>
                      <td className="py-3">Customer Name</td>
                      <td className="py-3">{formatPrice(order.amount)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-700">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <BarChart3 className="text-blue-500 mb-2" size={24} />
                <p className="text-sm text-gray-500">This Month Revenue</p>
                <p className="text-2xl font-bold">{formatPrice(seller.stats.monthlySales)}</p>
                <span className="text-sm text-green-500">+8.2% from last month</span>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <TrendingUp className="text-green-500 mb-2" size={24} />
                <p className="text-sm text-gray-500">Growth Rate</p>
                <p className="text-2xl font-bold">15.3%</p>
                <span className="text-sm text-green-500">+2.1% vs target</span>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <Award className="text-yellow-500 mb-2" size={24} />
                <p className="text-sm text-gray-500">Seller Rank</p>
                <p className="text-2xl font-bold">#12</p>
                <span className="text-sm text-gray-500">Top 5% sellers</span>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Sales Performance</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <BarChart3 size={48} className="text-gray-400" />
                <span className="ml-2 text-gray-400">Chart visualization area</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Seller Documents</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield size={24} className="text-blue-500" />
                    <div>
                      <h4 className="font-medium">GST Certificate</h4>
                      <p className="text-sm text-gray-500">Uploaded on 15 Jan 2023</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield size={24} className="text-green-500" />
                    <div>
                      <h4 className="font-medium">PAN Card</h4>
                      <p className="text-sm text-gray-500">Uploaded on 15 Jan 2023</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield size={24} className="text-purple-500" />
                    <div>
                      <h4 className="font-medium">Business Registration</h4>
                      <p className="text-sm text-gray-500">Uploaded on 15 Jan 2023</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield size={24} className="text-yellow-500" />
                    <div>
                      <h4 className="font-medium">Bank Proof</h4>
                      <p className="text-sm text-gray-500">Uploaded on 15 Jan 2023</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
   </div> 
  );
}