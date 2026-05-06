'use client';

import { useState, useEffect } from 'react';
import {
  Package,
  Clock,
  Settings,
  Truck,
  CheckCircle,
  XCircle,
  Search,
  Eye
} from "lucide-react";

const API = "http://127.0.0.1:8000/api/seller";
const SELLER_ID = "SELLER-1023";

export default function OrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // =========================================
  // LOAD DATA
  // =========================================
  useEffect(() => {

    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);

    fetch(`${API}/orders/${SELLER_ID}/`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.log(err));

  }, []);

  const toggleDarkMode = () => {

    const newMode = !darkMode;

    setDarkMode(newMode);

    localStorage.setItem('darkMode', String(newMode));

  };

  // =========================================
  // FILTER ORDERS
  // =========================================
  const filteredOrders = orders.filter((order) => {

    const matchesSearch =
      order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === 'all' || order.status === selectedStatus;

    const matchesPayment =
      selectedPayment === 'all' || order.payment === selectedPayment;

    return matchesSearch && matchesStatus && matchesPayment;

  });

  // =========================================
  // STATS
  // =========================================
  const totalOrders = orders.length;

  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const processingOrders = orders.filter((o) => o.status === 'processing').length;

  const shippedOrders = orders.filter((o) => o.status === 'shipped').length;

  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;

  // =========================================
  // STATUS CONFIG
  // =========================================
  const statusConfig = {

    pending: {
      label: 'Pending',
      class: 'bg-yellow-100 text-yellow-700',
      icon: Clock,
    },

    processing: {
      label: 'Processing',
      class: 'bg-blue-100 text-blue-700',
      icon: Settings,
    },

    shipped: {
      label: 'Shipped',
      class: 'bg-purple-100 text-purple-700',
      icon: Truck,
    },

    delivered: {
      label: 'Delivered',
      class: 'bg-green-100 text-green-700',
      icon: CheckCircle,
    },

    cancelled: {
      label: 'Cancelled',
      class: 'bg-red-100 text-red-700',
      icon: XCircle,
    }

  };

  const paymentConfig = {

    paid: {
      label: 'Paid',
      class: 'bg-green-100 text-green-700'
    },

    pending: {
      label: 'Pending',
      class: 'bg-yellow-100 text-yellow-700'
    },

    refunded: {
      label: 'Refunded',
      class: 'bg-gray-100 text-gray-700'
    }

  };

  // =========================================
  // VIEW DETAILS
  // =========================================
  const handleViewDetails = (order: any) => {

    setSelectedOrder(order);

    setShowDetailsModal(true);

  };

  // =========================================
  // UPDATE STATUS
  // =========================================
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {

    try {

      await fetch(`${API}/order/update/${orderId}/`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({ status: newStatus })

      });

      setOrders(orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-transparent dark:bg-gray-900 transition-colors duration-300">
        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Orders</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track all your orders</p>
              </div>

            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <StatCard label="Total Orders" value={totalOrders} icon={Package} color="blue" />
              <StatCard label="Pending" value={pendingOrders} icon={Clock} color="yellow" />
              <StatCard label="Processing" value={processingOrders} icon={Settings} color="indigo" />
              <StatCard label="Shipped" value={shippedOrders} icon={Truck} color="purple" />
              <StatCard label="Delivered" value={deliveredOrders} icon={CheckCircle} color="green" />

            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by Order ID or Customer name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

                </div>
              </div>

              <select
              title='Filter by Status'
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
              title='Filter by Payment Status'
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Orders List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Items</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Payment</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig];
                    const payment = paymentConfig[order.payment as keyof typeof paymentConfig];

                    return (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewDetails(order)}
                            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {order.id}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{order.customer.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{order.items.length} item(s)</td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">₹{order.total.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${status.class}`}>
                            <status.icon className="w-4 h-4" />

                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${payment.class}`}>
                            {payment.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{new Date(order.date).toLocaleDateString('en-IN')}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                            title='View Details'
                              onClick={() => handleViewDetails(order)}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors"
                            >
                              <Eye className="w-5 h-5" />

                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {showDetailsModal && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setShowDetailsModal(false)}
            onUpdateStatus={handleUpdateStatus}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color = "blue",
}: {
  label: string;
  value: number;
  icon: any;
  color?: "blue" | "yellow" | "purple" | "indigo" | "green";
}) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
    yellow: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600",
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600",
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
        </div>

        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

function OrderDetailsModal({ order, onClose }: {
  order: any;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: string) => void;
  darkMode: boolean;
}) {
  const statusConfig = {
    pending: { label: 'Pending', class: '...', icon: Clock },
    processing: { label: 'Processing', class: '...', icon: Settings },
    shipped: { label: 'Shipped', class: '...', icon: Truck },
    delivered: { label: 'Delivered', class: '...', icon: CheckCircle },
    cancelled: { label: 'Cancelled', class: '...', icon: XCircle },
  };

  const status = statusConfig[order.status as keyof typeof statusConfig];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border dark:border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Order Details</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{order.id}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl">×</button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg ${status.class}`}>
                {status.label}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Date</label>
              <p className="text-gray-900 dark:text-white">{new Date(order.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Customer Information</h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><span className="w-24 inline-block opacity-70">Name:</span> <b>{order.customer.name}</b></p>
              <p><span className="w-24 inline-block opacity-70">Email:</span> {order.customer.email}</p>
              <p><span className="w-24 inline-block opacity-70">Phone:</span> {order.customer.phone}</p>
              <p><span className="w-24 inline-block opacity-70">Address:</span> {order.customer.address}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Order Items</h3>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr className="text-gray-900 dark:text-gray-100">
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">Qty</th>
                    <th className="px-4 py-3 text-left">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-300">
                  {order.items.map((item: any, i: number) => (
                    <tr key={i}>
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3">₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t dark:border-gray-700">
          <button onClick={onClose} className="flex-1 px-6 py-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg">Close</button>
          <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg">Generate Invoice</button>
        </div>
      </div>
    </div>
  );
}