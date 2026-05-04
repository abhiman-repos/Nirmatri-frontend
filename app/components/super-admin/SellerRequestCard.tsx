"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SellerRequestCardComponent from "./SellerRequestCardComponent";

interface SellerRequestCardProps {
  seller: any;
}

export default function SellerRequestList() {
  const [sellers, setSellers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchSellers = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/admin/sellers/pending/?page=${page}`
      );

      setSellers((prev) => [...prev, ...res.data.pending_sellers]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSellers();
  }, [page]);

  return (
    <div className="space-y-3">
      {sellers.map((seller: any) => (
        <SellerRequestCardComponent key={seller._id} seller={seller} />
      ))}

      {loading && <p className="text-center py-4">Loading...</p>}

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage(page + 1)}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          Load More
        </button>
      </div>
    </div>
  );
}