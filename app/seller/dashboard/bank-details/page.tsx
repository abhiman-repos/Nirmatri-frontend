"use client";

import {
  CreditCard,
  Calendar,
  Pencil,
  Banknote,
  Hourglass,
  Save
} from "lucide-react";

import { useState, useEffect } from "react";
import { useTheme } from "@/app/contexts/ThemeContext";

const API = "http://127.0.0.1:8000/api/seller";
const SELLER_ID = "SELLER-1023";

export default function BankDetailsPage() {

  const { effectiveTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [bankData, setBankData] = useState({
    accountHolderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    accountType: "current",
    panNumber: "",
    gstNumber: ""
  });
    type Transaction = {
  date: string;
  reference: string;
  amount: number;
  status: string;
};


 const [transactions, setTransactions] = useState<Transaction[]>([]);

  // ===============================
  // FETCH BANK DETAILS
  // ===============================
  useEffect(() => {

    const fetchBankDetails = async () => {

      try {

        const res = await fetch(`${API}/bank-details/${SELLER_ID}/`);
        const data = await res.json();

        setBankData({
          ...data,
          confirmAccountNumber: data.accountNumber
        });

      } catch (error) {
        console.log("Error loading bank details", error);
      }

    };

    const fetchTransactions = async () => {

      try {

        const res = await fetch(`${API}/transactions/${SELLER_ID}/`);
        const data = await res.json();

        setTransactions(data);

      } catch (error) {
        console.log(error);
      }

    };

    fetchBankDetails();
    fetchTransactions();

  }, []);

  // ===============================
  // UPDATE STATE
  // ===============================
const updateBankData = (field: string, value: any) => {
  setBankData(prev => ({ ...prev, [field]: value }));
};
  // ===============================
  // SAVE DATA TO BACKEND
  // ===============================
  const handleSave = async () => {

    setIsSaving(true);

    try {

      const res = await fetch(`${API}/bank-details/${SELLER_ID}/`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(bankData)

      });

      const data = await res.json();

      if (res.ok) {

        alert("Bank details saved successfully");
        setIsEditing(false);

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);
      alert("Server error");

    }

    setIsSaving(false);

  };

  // ===============================
  // STATS
  // ===============================
  const stats = {

  totalPayouts: transactions.filter(t => t.status === "completed").length,

  totalEarned: transactions
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0),

  pendingAmount: transactions
    .filter(t => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0)

};

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">Bank Details</h1>

      {/* STATS */}

      <div className="grid grid-cols-4 gap-4 mb-6">

        <StatCard
          title="Total Payouts"
          value={stats.totalPayouts}
          icon={<Banknote />}
        />

        <StatCard
          title="Total Earned"
          value={`₹${stats.totalEarned}`}
          icon={<CreditCard />}
        />

        <StatCard
          title="Pending"
          value={`₹${stats.pendingAmount}`}
          icon={<Hourglass />}
        />

        <StatCard
          title="Next Payout"
          value="Monday"
          icon={<Calendar />}
        />

      </div>

      {/* BANK FORM */}

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex justify-between mb-4">

          <h2 className="text-xl font-bold">Account Information</h2>

          {!isEditing ? (

            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              <Pencil className="inline w-4 mr-2" />
              Edit
            </button>

          ) : (

            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              <Save className="inline w-4 mr-2" />
              Save
            </button>

          )}

        </div>

        <div className="grid grid-cols-2 gap-4">

          <input
            disabled={!isEditing}
            value={bankData.accountHolderName}
            onChange={e => updateBankData("accountHolderName", e.target.value)}
            placeholder="Account Holder Name"
            className="border p-3 rounded"
          />

          <input
            disabled={!isEditing}
            value={bankData.accountNumber}
            onChange={e => updateBankData("accountNumber", e.target.value)}
            placeholder="Account Number"
            className="border p-3 rounded"
          />

          <input
            disabled={!isEditing}
            value={bankData.ifscCode}
            onChange={e => updateBankData("ifscCode", e.target.value)}
            placeholder="IFSC Code"
            className="border p-3 rounded"
          />

          <input
            disabled={!isEditing}
            value={bankData.bankName}
            onChange={e => updateBankData("bankName", e.target.value)}
            placeholder="Bank Name"
            className="border p-3 rounded"
          />

          <input
            disabled={!isEditing}
            value={bankData.branchName}
            onChange={e => updateBankData("branchName", e.target.value)}
            placeholder="Branch Name"
            className="border p-3 rounded"
          />

        </div>

      </div>

      {/* TRANSACTIONS */}

      <div className="mt-8 bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3">Date</th>
              <th className="p-3">Reference</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>

            </tr>

          </thead>

          <tbody>

            {transactions.map((txn, i) => (

              <tr key={i} className="border-t">

                <td className="p-3">{txn.date}</td>
                <td className="p-3">{txn.reference}</td>
                <td className="p-3">₹{txn.amount}</td>
                <td className="p-3">{txn.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

function StatCard({ title, value, icon }: StatCardProps) {

  return (

    <div className="bg-white p-4 rounded-xl shadow">

      <div className="text-xl mb-2">{icon}</div>

      <p className="text-2xl font-bold">{value}</p>

      <p className="text-gray-500">{title}</p>

    </div>

  );

}