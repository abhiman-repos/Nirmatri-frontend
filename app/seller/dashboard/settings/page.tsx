'use client';

import { useState, useEffect } from 'react';

export default function SellerSettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    orders: true,
    inventory: true,
  });
  const [storeStatus, setStoreStatus] = useState({
    vacationMode: false,
    autoAccept: true,
  });

  // Sync dark mode from localStorage
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);

    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Store Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your store preferences and operational status</p>
          </header>

          <div className="space-y-6">
            {/* Notifications Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Control your alerts and communication preferences</p>
              </div>
              <div className="p-6 space-y-6">
                <ToggleRow 
                  label="New Order Alerts" 
                  description="Get notified immediately when a customer places an order"
                  enabled={notifications.orders}
                  onChange={() => setNotifications({...notifications, orders: !notifications.orders})}
                />
                <ToggleRow 
                  label="Stock Alerts" 
                  description="Notifications when your products are low or out of stock"
                  enabled={notifications.inventory}
                  onChange={() => setNotifications({...notifications, inventory: !notifications.inventory})}
                />
                <ToggleRow 
                  label="Email Digest" 
                  description="Receive a weekly summary of your sales and earnings"
                  enabled={notifications.email}
                  onChange={() => setNotifications({...notifications, email: !notifications.email})}
                />
              </div>
            </section>

            {/* Store Operations */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Store Operations</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage how your store handles orders</p>
              </div>
              <div className="p-6 space-y-6">
                <ToggleRow 
                  label="Auto-Accept Orders" 
                  description="Automatically move new orders to 'Processing' status"
                  enabled={storeStatus.autoAccept}
                  onChange={() => setStoreStatus({...storeStatus, autoAccept: !storeStatus.autoAccept})}
                />
                
                <div className="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-lg">
                  <ToggleRow 
                    label="Vacation Mode" 
                    description="Temporarily hide products from customers while you are away"
                    enabled={storeStatus.vacationMode}
                    onChange={() => setStoreStatus({...storeStatus, vacationMode: !storeStatus.vacationMode})}
                    variant="orange"
                  />
                </div>
              </div>
            </section>

            {/* Shipping & Tax */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Regional Preferences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                  <select className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
                  <select className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white">
                    <option>(GMT+05:30) Mumbai, Kolkata</option>
                  </select>
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-3 mt-8">
              <button className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Discard Changes
              </button>
              <button className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ToggleRow({ label, description, enabled, onChange, variant = 'blue' }: any) {
  const activeColor = variant === 'orange' ? 'bg-orange-500' : 'bg-blue-600';
  
  return (
    <div className="flex items-center justify-between">
      <div className="pr-4">
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none ${
          enabled ? activeColor : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}