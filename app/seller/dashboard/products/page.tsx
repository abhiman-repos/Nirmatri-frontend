'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import {
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Grid,
  List,
  Pencil,
  Trash2,
  Plus
} from "lucide-react";

const API = "http://127.0.0.1:8000/api";
const SELLER_ID = "SELLER-1023";

function ProductsPageContent() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {

    try {

      const res = await fetch(`${API}/seller/products/${SELLER_ID}/`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      }

    } catch (err) {

      console.error(err);
    }
  };

  useEffect(() => {

    fetchProducts();
  }, []);
  // ================= SELECT PRODUCT =================
  const handleSelectProduct = (id: number) => {

    if (selectedProducts.includes(id)) {

      setSelectedProducts(selectedProducts.filter(pid => pid !== id));

    } else {

      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // ================= SELECT ALL =================
  const filteredProducts = products.filter(product => {

    const matchesSearch =
      product.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;

  });

  const handleSelectAll = () => {

    if (selectedProducts.length === filteredProducts.length) {

      setSelectedProducts([]);

    } else {

      setSelectedProducts(filteredProducts.map((p: any) => p.id));

    }

  };

  const categories = [
    "all",
    ...Array.from(new Set(products.map(p => p.category)))
  ];

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === "active").length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const lowStock = products.filter(p => p.stock < 10 && p.stock > 0).length;

  return (
    <div>
      <div
        className="min-h-screen bg-transparent">
        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Products</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your handmade product catalog</p>
              </div>
              <button
                onClick={() => router.push("/seller/dashboard/products/add")}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Add New Product
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
                title="Select Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>

              <div className="flex gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                <button title="Grid View" onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}><Grid className="w-4 h-4" /></button>
                <button title="List View" onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}><List className="w-4 h-4" /></button>
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
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        title="Select all products"
                        checked={
                          selectedProducts.length === filteredProducts.length &&
                          filteredProducts.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </th>
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
// 4. SUB-COMPONENTS (Helper UI)
// ==========================================================

function StatCard({ label, value, icon: Icon, color }: any) {
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
        <div className="absolute top-3 left-3"><input title="Select Product" type="checkbox" checked={isSelected} onChange={onSelect} className="w-5 h-5 rounded border-gray-300" /></div>
        <div className="absolute top-3 right-3"><span className={`px-2 py-1 text-xs font-bold rounded-full ${status.class}`}>{status.label}</span></div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold dark:text-white">₹{product.price}</span>
          <div className="flex gap-1 text-gray-400">
            <button type="button" title="Edit Product" className="p-2 hover:text-blue-500"><Pencil className="w-4 h-4" /></button>
            <button type="button" title="Delete Product" className="p-2 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductRow({ product, isSelected, onSelect }: any) {
  return (
    <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${isSelected ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
      <td className="px-6 py-4">
        <input
          type="checkbox"
          title="Select product"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      <td className="px-6 py-4 text-sm font-medium dark:text-white">{product.name}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
      <td className="px-6 py-4 text-sm font-bold dark:text-white">₹{product.price}</td>
      <td className="px-6 py-4 text-sm dark:text-white">{product.stock}</td>
      <td className="px-6 py-4"><button title="Edit Product" className="text-blue-500 hover:underline"><Pencil className="w-4 h-4" /></button></td>
    </tr>
  );
}

function AddProductModal({ onClose }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: any) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async () => {

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("seller_id", SELLER_ID);
    images.forEach((img) => {
      formData.append("images", img);
    });

    try {

      setLoading(true);

      await fetch("http://localhost:8000/api/products/create/", {
        method: "POST",
        body: formData
      });

      setLoading(false);
      onClose();

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-8 border dark:border-gray-700">

        <h2 className="text-2xl font-bold dark:text-white mb-6 text-center">
          Add New Product
        </h2>

        <div className="space-y-4">

          {/* Product Name */}
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Description */}
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              placeholder="Price (₹)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-3 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="p-3 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Category */}
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Image Upload */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">

            <input
              title="Upload Images"
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full"
            />

            <p className="text-sm text-gray-500 mt-2">
              Upload product images
            </p>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">

          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "List Product"}
          </button>

        </div>

      </div>
    </div>
  );
}
export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}