'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, Trash2, Tag } from "lucide-react";

const API = "localhost:8000/api";
const SELLER_ID = "SELLER-1023";

export default function AddProductPage() {

  const router = useRouter();

  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    status: "active",
    slug: ""
  });

  // ================= IMAGE UPLOAD =================
  const handleImages = (e: any) => {
    const files = Array.from(e.target.files) as File[];
    setImages(prev => [...prev, ...files].slice(0, 5));

    const previewUrls = files.map((file: any) =>
      URL.createObjectURL(file)
    );

    setPreview(prev => [...prev, ...previewUrls].slice(0, 5));
  };

  // ================= REMOVE IMAGE =================
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreview(prev => prev.filter((_, i) => i !== index));
  };

  // ================= FORM CHANGE =================
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
      slug:
        name === "name"
          ? value.toLowerCase().replaceAll(" ", "-")
          : prev.slug
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: any) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("description", form.description);
      formData.append("status", form.status);
      formData.append("slug", form.slug);
      formData.append("seller_id", SELLER_ID);


      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await fetch(`${API}/product/add/`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log("SUCCESS:", data);
      router.push("/seller/dashboard/products");
    } catch (error) {

      console.error("ERROR:", error);
    }
  };


  return (

    <div className="p-8 max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">


      {/* LEFT FORM */}

      <div className="lg:col-span-2 space-y-6">

        <h1 className="text-3xl font-semibold">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">


          {/* IMAGE SECTION */}

          <div className="bg-white border rounded-xl p-6 shadow-sm">

            <h2 className="font-semibold mb-4">
              Product Images (Minimum 5 angles)
            </h2>

            <div className="grid grid-cols-5 gap-4">

              {preview.map((img, i) => (
                <div key={i} className="relative">

                  <Image
                    src={img}
                    alt="preview"
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />

                  <button
                    title="Remove Image"
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-white p-1 rounded shadow"
                  >

                    <Trash2 size={14} />

                  </button>

                </div>
              ))}

              <label className="border-2 border-dashed rounded-lg h-24 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">

                <Upload size={20} />

                <input
                  title="Upload Images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImages}
                  className="hidden"
                />

              </label>

            </div>

            <p className="text-xs text-gray-400 mt-2">
              Upload at least 5 images (front, side, back, detail, lifestyle)
            </p>

          </div>

          {/* PRODUCT INFO */}

          <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">

            <h2 className="font-semibold">
              Product Information
            </h2>

            {/* Product Name */}

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            {/* Category (Seller Adds) */}

            <div className="relative">
              <Tag size={16} className="absolute left-3 top-3 text-gray-400" />

              <input
                type="text"
                name="category"
                placeholder="Enter product category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 pl-9 border rounded-lg"
              />
            </div>

            {/* Description */}

            <textarea
              name="description"
              rows={4}
              placeholder="Describe your product..."
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <p className="text-xs text-gray-400">
              {form.description.length} characters
            </p>

          </div>


          {/* PRICE */}

          <div className="bg-white border rounded-xl p-6 shadow-sm">

            <h2 className="font-semibold mb-4">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-3 gap-4">

              <input
                type="number"
                name="price"
                placeholder="Price ₹"
                value={form.price}
                onChange={handleChange}
                className="p-3 border rounded-lg"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="p-3 border rounded-lg"
              />
              <select
                title="Product Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="p-3 border rounded-lg"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* BUTTONS */}

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-100 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Upload size={18} />
              Add Product
            </button>
          </div>
        </form>
      </div>


      {/* RIGHT SIDE LIVE PREVIEW */}

      <div className="bg-white border rounded-xl p-6 shadow-sm h-fit">

        <h2 className="font-semibold mb-4">
          Live Product Preview
        </h2>
        <div className="border rounded-lg overflow-hidden">
          <div className="h-56 bg-gray-100 relative">
            {preview[0] ? (

              <Image
                src={preview[0]}
                alt="preview"
                fill
                unoptimized
                className="object-cover"
              />

            ) : (

              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No Image
              </div>

            )}

          </div>

          <div className="p-4 space-y-2">

            <h3 className="font-semibold">
              {form.name || "Product Name"}
            </h3>

            <p className="text-sm text-gray-500">
              {form.category || "Category"}
            </p>

            <p className="text-lg font-bold">
              ₹ {form.price || "0"}
            </p>

            <p className="text-xs text-gray-400">
              {form.description || "Product description will appear here"}
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}