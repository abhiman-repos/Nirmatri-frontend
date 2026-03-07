'use client';

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from 'react'; // 1. Added Suspense import
import {
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Grid,
  List,
  Eye,
  Pencil,
  Trash2,
  Plus
} from "lucide-react";

// ==========================================================
// 1. DATA (Mock products data)
// ==========================================================
const mockProducts = [
  { id: 1, name: 'Handmade Terracotta Vase', category: 'Home Decor', price: 1200, stock: 45, status: 'active', image : '/products/terracotta-vase.png', sales: 342, rating: 4.8 },
  { id: 2, name: 'Hand-painted Ceramic Plates', category: 'Kitchenware', price: 1800, stock: 28, status: 'active', image : '/products/terracotta-vase.png', sales: 289, rating: 4.9 },
  { id: 3, name: 'Wooden Wall Art', category: 'Home Decor', price: 980, stock: 15, status: 'active', image : '/products/terracotta-vase.png', sales: 267, rating: 4.7 },
  { id: 4, name: 'Handwoven Jute Basket', category: 'Storage', price: 675, stock: 0, status: 'out_of_stock', image : '/products/terracotta-vase.png', sales: 198, rating: 4.6 },
  { id: 5, name: 'Ceramic Dinner Set', category: 'Kitchenware', price: 3200, stock: 12, status: 'active', image : '/products/terracotta-vase.png', sales: 156, rating: 4.9 },
  { id: 6, name: 'Handcrafted Clay Pot Set', category: 'Kitchenware', price: 2450, stock: 8, status: 'low_stock', image : '/products/terracotta-vase.png', sales: 145, rating: 4.5 },
  { id: 7, name: 'Bamboo Serving Tray', category: 'Kitchenware', price: 850, stock: 34, status: 'active', image : '/products/terracotta-vase.png', sales: 98, rating: 4.4 },
  { id: 8, name: 'Embroidered Wall Hanging', category: 'Home Decor', price: 1500, stock: 0, status: 'inactive', image : '/products/terracotta-vase.png', sales: 76, rating: 4.3 },
];

// ==========================================================
// 2. CONTENT COMPONENT
// Moved all hook-dependent logic here.
// ==========================================================
function ProductsPageContent() {
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [darkMode, setDarkMode] = useState(false);

  // Auto-open modal if URL is ?mode=add
  useEffect(() => {
    if (searchParams.get("mode") === "add") {
      setShowAddModal(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const handleSelectProduct = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pid => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const outOfStock = products.filter(p => p.status === 'out_of_stock').length;
  const lowStock = products.filter(p => p.status === 'low_stock').length;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-transparent dark:bg-gray-900 transition-colors duration-300">
        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Products</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your handmade product catalog</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatCard label="Total Products" value={totalProducts} icon={Package} color="blue" />
              <StatCard label="Active" value={activeProducts} icon={CheckCircle} color="green" />
              <StatCard label="Low Stock" value={lowStock} icon={AlertTriangle} color="yellow" />
              <StatCard label="Out of Stock" value={outOfStock} icon={XCircle} color="red" />
            </div>
          </div>

          {/* Search/Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>

              <div className="flex gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}><Grid className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}><List className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* List/Grid View */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} isSelected={selectedProducts.includes(product.id)} onSelect={() => handleSelectProduct(product.id)} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left"><input type="checkbox" checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0} onChange={handleSelectAll} /></th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  {filteredProducts.map((product) => (
                    <ProductRow key={product.id} product={product} isSelected={selectedProducts.includes(product.id)} onSelect={() => handleSelectProduct(product.id)} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
        {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} />}
      </div>
    </div>
  );
}

// ==========================================================
// 3. MAIN EXPORT (Wraps Content in Suspense)
// ==========================================================
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}

// ==========================================================
// 4. SUB-COMPONENTS (Helper UI)
// ==========================================================

function StatCard({ label, value, icon : Icon, color }: any) {
  const colorClasses: any = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
  };
  return (
    <div className={`${colorClasses[color]} border rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </div>
  );
}

function ProductCard({ product, isSelected, onSelect }: any) {
  const statusConfig: any = {
    active: { label: 'Active', class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
    low_stock: { label: 'Low Stock', class: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
    out_of_stock: { label: 'Out of Stock', class: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
    inactive: { label: 'Inactive', class: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' },
  };
  const status = statusConfig[product.status];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 transition-all ${isSelected ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900' : 'border-gray-200 dark:border-gray-700'}`}>
      <div className="relative bg-gray-100 dark:bg-gray-900 h-48 flex items-center justify-center rounded-t-lg overflow-hidden">
        <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
        <div className="absolute top-3 left-3"><input type="checkbox" checked={isSelected} onChange={onSelect} className="w-5 h-5 rounded border-gray-300" /></div>
        <div className="absolute top-3 right-3"><span className={`px-2 py-1 text-xs font-bold rounded-full ${status.class}`}>{status.label}</span></div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold dark:text-white">₹{product.price}</span>
          <div className="flex gap-1 text-gray-400">
            <button className="p-2 hover:text-blue-500"><Pencil className="w-4 h-4" /></button>
            <button className="p-2 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductRow({ product, isSelected, onSelect }: any) {
  return (
    <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${isSelected ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
      <td className="px-6 py-4"><input type="checkbox" checked={isSelected} onChange={onSelect} /></td>
      <td className="px-6 py-4 text-sm font-medium dark:text-white">{product.name}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
      <td className="px-6 py-4 text-sm font-bold dark:text-white">₹{product.price}</td>
      <td className="px-6 py-4 text-sm dark:text-white">{product.stock}</td>
      <td className="px-6 py-4"><button className="text-blue-500 hover:underline"><Pencil className="w-4 h-4" /></button></td>
    </tr>
  );
}

function AddProductModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-8 border dark:border-gray-700">
        <h2 className="text-2xl font-bold dark:text-white mb-6 text-center">Add New Product</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Product Name" className="w-full p-3 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price (₹)" className="p-3 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="number" placeholder="Stock" className="p-3 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <button onClick={onClose} className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg">Cancel</button>
          <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold">List Product</button>
        </div>
      </div>
    </div>
  );
}