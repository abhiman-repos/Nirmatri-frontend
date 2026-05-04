"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  DollarSign,
  Tag,
  ShoppingBag,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Truck,
  RefreshCw,
  Printer,
  Download,
  Share2,
  Heart,
  Eye,
  Plus,
  Minus,
  Store,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
} from "lucide-react";

export default function ProductDetailsPage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);

  // Product Data
  const product = {
    id: "PRD-001",
    name: "iPhone 15 Pro Max",
    description: "Latest Apple iPhone with A17 Pro chip, titanium design, and advanced camera system. Features a 6.7-inch Super Retina XDR display with ProMotion technology.",
    price: 149999,
    mrp: 159999,
    discount: 6,
    stock: 45,
    sku: "IP15PM-256-GD",
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Apple",
    seller: {
      id: "SLR-001",
      name: "Tech World",
      rating: 4.8,
      totalProducts: 156,
      joinedDate: "2023-01-15",
      verified: true,
    },
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&flip=1",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&rotate=90",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&rotate=180",
    ],
    variants: [
      { color: "Natural Titanium", stock: 15 },
      { color: "Blue Titanium", stock: 8 },
      { color: "White Titanium", stock: 12 },
      { color: "Black Titanium", stock: 10 },
    ],
    specifications: [
      { label: "Processor", value: "A17 Pro" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB" },
      { label: "Display", value: "6.7-inch Super Retina XDR" },
      { label: "Camera", value: "48MP + 12MP + 12MP" },
      { label: "Battery", value: "4422 mAh" },
      { label: "OS", value: "iOS 17" },
      { label: "Weight", value: "221g" },
    ],
    reviews: [
      {
        id: 1,
        user: "Rahul Sharma",
        rating: 5,
        comment: "Amazing phone! Best camera I've ever used.",
        date: "2024-02-15",
      },
      {
        id: 2,
        user: "Priya Patel",
        rating: 4,
        comment: "Great performance but battery could be better.",
        date: "2024-02-14",
      },
    ],
    stats: {
      views: 1234,
      orders: 89,
      revenue: 13349911,
      rating: 4.5,
      returns: 2,
    },
    seo: {
      title: "iPhone 15 Pro Max 256GB - Latest Apple Phone",
      description: "Buy iPhone 15 Pro Max with A17 Pro chip, titanium design",
      keywords: "iphone, apple, smartphone, 15 pro max",
    },
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
      case 'out_of_stock': return 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400';
      case 'draft': return 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400';
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
                <h1 className="text-2xl font-bold">Product Details</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  SKU: {product.sku}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Printer size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Download size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Share2 size={20} />
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                <Edit size={18} />
                Edit Product
              </button>
              <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-6">
            {['overview', 'details', 'variants', 'reviews', 'stats', 'seo'].map((tab) => (
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
            {/* Product Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Images */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sticky top-24">
                  {/* Main Image */}
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors">
                      <Heart size={18} />
                    </button>
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? 'border-blue-500 scale-105'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Product Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">ID: {product.id}</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-3xl font-bold text-green-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.mrp)}
                    </span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-500/20 text-green-600 rounded-lg text-sm">
                      {product.discount}% OFF
                    </span>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <Package size={18} className="text-blue-500 mb-1" />
                      <p className="text-sm text-gray-500">Stock</p>
                      <p className="font-semibold">{product.stock} units</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <Eye size={18} className="text-purple-500 mb-1" />
                      <p className="text-sm text-gray-500">Views</p>
                      <p className="font-semibold">{product.stats.views}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <ShoppingBag size={18} className="text-green-500 mb-1" />
                      <p className="text-sm text-gray-500">Orders</p>
                      <p className="font-semibold">{product.stats.orders}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <Star size={18} className="text-yellow-500 mb-1" />
                      <p className="text-sm text-gray-500">Rating</p>
                      <p className="font-semibold">{product.stats.rating}/5</p>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {product.seller.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{product.seller.name}</h4>
                            {product.seller.verified && (
                              <CheckCircle size={16} className="text-blue-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Star size={14} className="text-yellow-500" />
                              {product.seller.rating}
                            </span>
                            <span>•</span>
                            <span>{product.seller.totalProducts} products</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Seller
                      </button>
                    </div>
                  </div>
                </div>

                {/* Specifications Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="text-gray-500">{spec.label}:</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Variants Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Available Variants</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.variants.map((variant, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <span className="font-medium">{variant.color}</span>
                        <span className="text-sm text-gray-500">Stock: {variant.stock}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Detailed Information</h3>
            
            <div className="space-y-6">
              {/* Product Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Product Name</label>
                    <p className="font-medium">{product.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Category</label>
                    <p className="font-medium">{product.category} → {product.subcategory}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Brand</label>
                    <p className="font-medium">{product.brand}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">SKU</label>
                    <p className="font-medium">{product.sku}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Price (MRP)</label>
                    <p className="font-medium">{formatPrice(product.mrp)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Selling Price</label>
                    <p className="font-medium text-green-600">{formatPrice(product.price)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Discount</label>
                    <p className="font-medium">{product.discount}%</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Stock Status</label>
                    <p className="font-medium">
                      {product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <label className="text-sm text-gray-500">Full Description</label>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm text-gray-500">Product Tags</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 rounded-full text-sm">iPhone</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 rounded-full text-sm">Apple</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 rounded-full text-sm">Smartphone</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 rounded-full text-sm">Premium</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'variants' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Product Variants</h3>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
                Add Variant
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3">Color</th>
                    <th className="text-left py-3">SKU</th>
                    <th className="text-left py-3">Price</th>
                    <th className="text-left py-3">Stock</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((variant, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="py-3 font-medium">{variant.color}</td>
                      <td className="py-3">{product.sku}-{index + 1}</td>
                      <td className="py-3">{formatPrice(product.price)}</td>
                      <td className="py-3">{variant.stock}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                          Active
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-700 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-700">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Customer Reviews</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-yellow-500">{product.stats.rating}</span>
                <span className="text-gray-400">/5</span>
                <span className="text-gray-500 ml-2">({product.reviews.length} reviews)</span>
              </div>
            </div>

            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.user}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <Eye className="text-blue-500 mb-2" size={24} />
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-2xl font-bold">{product.stats.views}</p>
                <span className="text-sm text-green-500">+12.5%</span>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <ShoppingBag className="text-green-500 mb-2" size={24} />
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold">{product.stats.orders}</p>
                <span className="text-sm text-green-500">+8.2%</span>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <DollarSign className="text-purple-500 mb-2" size={24} />
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-bold">{formatPrice(product.stats.revenue)}</p>
                <span className="text-sm text-green-500">+15.3%</span>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <TrendingUp className="text-yellow-500 mb-2" size={24} />
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <p className="text-2xl font-bold">7.2%</p>
                <span className="text-sm text-green-500">+2.1%</span>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Performance Overview</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <BarChart3 size={48} className="text-gray-400" />
                <span className="ml-2 text-gray-400">Chart visualization area</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">SEO Settings</h3>
            
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium mb-2">Meta Title</label>
                <input
                  type="text"
                  value={product.seo.title}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">60 characters recommended</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Meta Description</label>
                <textarea
                  rows={3}
                  value={product.seo.description}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">160 characters recommended</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Meta Keywords</label>
                <input
                  type="text"
                  value={product.seo.keywords}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                  readOnly
                />
              </div>

              {/* SEO Preview */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <h4 className="font-medium mb-2">Search Engine Preview</h4>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-blue-600 text-lg font-medium">{product.seo.title}</p>
                  <p className="text-green-600 text-sm">{window.location.origin}/product/{product.id}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{product.seo.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}