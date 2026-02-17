'use client';

import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// ------------------ DATA ------------------
const monthlyData = [
  { month: 'Jan', revenue: 42400 },
  { month: 'Feb', revenue: 48800 },
  { month: 'Mar', revenue: 56200 },
  { month: 'Apr', revenue: 61500 },
  { month: 'May', revenue: 72800 },
  { month: 'Jun', revenue: 84560 },
];

const recentTransactions = [
  { id: 'ORD-1091', product: 'Handmade Vase', amount: 1200, status: 'Delivered' },
  { id: 'ORD-1090', product: 'Clay Pot Set', amount: 2450, status: 'Shipped' },
  { id: 'ORD-1089', product: 'Wooden Wall Art', amount: 980, status: 'Pending' },
];

const topProducts = [
  { name: 'Terracotta Vase', sales: 342, revenue: 410400 },
  { name: 'Ceramic Plates', sales: 289, revenue: 346800 },
  { name: 'Wooden Wall Art', sales: 267, revenue: 261660 },
];

// ------------------ PAGE ------------------
export default function EarningsPage() {
  const [loaded, setLoaded] = useState(false);
  const [period, setPeriod] = useState('6m');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setLoaded(true);
    // Initialize from localStorage
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);

    // Sync if changed in another tab/page
    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Earnings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Nirmatri Crafts · Seller Dashboard</p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Withdraw Funds
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Balance" value="₹84,560" change="+18.2%" positive />
          <StatCard label="This Month" value="₹28,945" change="+24.5%" positive />
          <StatCard label="Pending" value="₹4,245" change="6 orders" positive={null} />
          <StatCard label="Avg Order" value="₹883" change="+3.8%" positive />
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8 border border-transparent dark:border-gray-700">
          <div className="flex justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h2>
            <div className="flex gap-2">
              {['1m', '3m', '6m', '1y'].map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded transition-colors ${
                    period === p 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="month" 
                stroke={darkMode ? '#9ca3af' : '#4b5563'}
                fontSize={12}
              />
              <YAxis 
                stroke={darkMode ? '#9ca3af' : '#4b5563'}
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  borderColor: darkMode ? '#374151' : '#e5e7eb',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
                itemStyle={{ color: darkMode ? '#ffffff' : '#000000' }}
                formatter={(v?: number) => (v ?? 0).toString()}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#2563eb" 
                fill={darkMode ? '#1d4ed880' : '#93c5fd'} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Transactions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-transparent dark:border-gray-700">
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Recent Transactions</h3>
            {recentTransactions.map(tx => (
              <div key={tx.id} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <span className="text-gray-700 dark:text-gray-300">{tx.product}</span>
                <span className="font-semibold text-gray-900 dark:text-white">₹{tx.amount}</span>
              </div>
            ))}
          </div>

          {/* Top Products */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-transparent dark:border-gray-700">
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Top Products</h3>
            {topProducts.map(p => (
              <div key={p.name} className="flex justify-between py-2">
                <span className="text-gray-700 dark:text-gray-300">{p.name}</span>
                <span className="font-semibold text-gray-900 dark:text-white">₹{p.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ------------------ CARD ------------------
function StatCard({ label, value, change, positive }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-transparent dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className={`text-sm mt-1 ${
        positive === null 
          ? 'text-gray-500 dark:text-gray-400' 
          : positive 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-red-600 dark:text-red-400'
      }`}>
        {change}
      </p>
    </div>
  );
}