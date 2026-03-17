import SellerRequestList from "./SellerRequestCard";

export default function SellerRequestsPage() {
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Seller Approval Requests
      </h1>

      <SellerRequestList />
    </main>
  );
}