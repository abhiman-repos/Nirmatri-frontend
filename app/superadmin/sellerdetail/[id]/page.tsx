"use client";
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Store,
  Mail,
  Phone,
  DollarSign,
  CheckCircle,
  XCircle,
  Download,
  Shield,

} from "lucide-react";

const API = "http://127.0.0.1:8000/api/admin";

interface Order {
  id: string
  date: string
  amount: number
  status: string
}
interface Seller {
  id: string
  name: string
  ownerName: string
  email: string
  phone: string
  status: string
  totalProducts: number
  totalOrders: number
  gstin: string
  pan: string
  totalRevenue: number
  products?: any[]
  recentOrders?: Order[]
  joinedDate?: string
  verified?: boolean
  businessType?: string
  alternatePhone?: string
  website?: string
  lastActive?: string
  yearEstablished?: string

  stats?: {
    monthlySales?: number
    monthlyOrders?: number
    returnRate?: number
    cancellationRate?: number
    avgOrderValue?: number
    topProducts?: { name: string; sales: number }[]

  }
  address?: any
  bankDetails?: any
}

export default function SellerDetailsPage() {

  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const firstLetter = seller?.name ? seller.name.charAt(0) : "?";

  useEffect(() => {
    fetch(`${API}/seller/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const s = data.seller;

        setSeller({
          ...s,
          products: s.products || [],
          recentOrders: s.recentOrders || [],
          stats: {
            topProducts: [],
            ...s.stats,
          },
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading seller:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading seller details...</div>;
  }

  if (!seller) {
    return <div className="p-10 text-center text-red-500">Seller not found</div>;
  }
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
    switch (status) {
      case 'active': return 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400';
      case 'suspended': return 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400';
      case 'inactive': return 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Get order status color
  const getOrderStatusColor = (status: string) => {
    switch (status) {
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
                title="Navigate Back"
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3">


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
                    ['Address', `${seller?.address?.street || ''}, ${seller?.address?.city || ''}, ${seller?.address?.state || ''} - ${seller?.address?.pincode || ''}`],
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
              {['overview', 'documents'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${activeTab === tab
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

          {activeTab === "overview" && (
            <div className="space-y-6">

              {/* Seller Header */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {seller.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Seller ID : {seller.id}
                    </p>
                  </div>

                  <div className="flex gap-3">

                    <div className="flex gap-3">

                      <button
                        disabled={!termsAccepted}
                        onClick={() => {
                          setLoadingAction("approve")

                          setTimeout(() => {
                            setLoadingAction(null)
                          }, 1500)

                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition
${termsAccepted
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-400 cursor-not-allowed"
                          }`}
                      >

                        {loadingAction === "approve" ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <CheckCircle size={18} />
                            Approve
                          </>
                        )}

                      </button>

                      <button
                        disabled={!termsAccepted}
                        onClick={() => {
                          setLoadingAction("reject")

                          setTimeout(() => {
                            setLoadingAction(null)
                          }, 1500)

                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition
${termsAccepted
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-gray-400 cursor-not-allowed"
                          }`}
                      >

                        {loadingAction === "reject" ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <XCircle size={18} />
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Seller Details Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 space-y-10">

                {/* Contact Information */}
                <div>

                  <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Mail size={18} className="text-blue-500" />
                    Contact Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">Email</p>

                      <div className="flex items-center gap-2 font-medium">
                        <Mail size={16} className="text-gray-400" />
                        {seller.email}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">Phone</p>

                      <div className="flex items-center gap-2 font-medium">
                        <Phone size={16} className="text-gray-400" />
                        {seller.phone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div>

                  <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Store size={18} className="text-purple-500" />
                    Business Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">ADHAAR</p>
                      <p className="font-medium">{seller.gstin}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">PAN</p>
                      <p className="font-medium">{seller.pan}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">Business Type</p>
                      <p className="font-medium">{seller.businessType}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">Established</p>
                      <p className="font-medium">{seller.yearEstablished}</p>
                    </div>

                    <div className="md:col-span-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">Last Active</p>
                      <p className="font-medium">{seller.lastActive}</p>
                    </div>

                  </div>

                </div>

                {/* Bank Details */}
                <div>
                  <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <DollarSign size={18} className="text-green-500" />
                    Bank Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">Account Name</p>
                      <p className="font-medium">{seller?.bankDetails?.accountName}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">Account Number</p>
                      <p className="font-medium">
                        XXXXXX{seller?.bankDetails?.accountNumber?.slice(-4)}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">Bank</p>
                      <p className="font-medium">{seller?.bankDetails?.bank}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">IFSC</p>
                      <p className="font-medium">{seller?.bankDetails?.ifsc}</p>
                    </div>

                    <div className="md:col-span-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">Branch</p>
                      <p className="font-medium">{seller?.bankDetails?.branch}</p>
                    </div>

                  </div>
                </div>


                {/* Terms & Conditions */}
                <div className="mt-8 p-5 rounded-xl border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-400">

                  <div className="flex items-start gap-3">

                    <div className="text-yellow-600">
                      <Shield size={20} />
                    </div>

                    <div className="flex-1">

                      <h3 className="font-semibold text-sm text-yellow-800 mb-1">
                        Verification Required
                      </h3>

                      <p className="text-sm text-yellow-700 mb-3">
                        Please confirm that you have reviewed the seller’s business details,
                        documents and bank information before approving or rejecting this seller.
                      </p>

                      <label className="flex items-center gap-2 cursor-pointer">

                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="w-4 h-4 accent-yellow-600"
                        />

                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          I confirm that I have verified all seller details and agree with marketplace policies.
                        </span>

                      </label>

                    </div>

                  </div>

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
                        <h4 className="font-medium">ADHAAR Proof</h4>
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