"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Transaction = {
  _id: string;
  amount: number;
  sender: string;
  receiver: string;
  date: string;
  time: string;
  category: string;
};

export default function Dashboard() {
  const [data, setData] = useState<Transaction[]>([]);
  const [dark, setDark] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // โหลดข้อมูล
  const loadData = async () => {
    const res = await fetch("http://localhost:5000/api/slip");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadData();
  }, []);

  // เลือกไฟล์
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // upload
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("slip", file);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/slip/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      await loadData();

      setFile(null);
      setPreview(null);
    } catch (err) {
      alert("Upload failed ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // summary
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const count = data.length;

  // chart
  const categoryMap: any = {};
  data.forEach((item) => {
    const cat = item.category || "unknown";
    categoryMap[cat] = (categoryMap[cat] || 0) + item.amount;
  });

  const chartData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="max-w-6xl mx-auto p-10">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                 Slip Reader - orapan
              </h1>
              <p className="text-gray-500">
                Analyze your transactions with AI
              </p>
            </div>

            <button
              onClick={() => setDark(!dark)}
              className="px-4 py-2 rounded-xl border dark:border-gray-600"
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          {/* 🔥 UPLOAD */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-2xl text-white mb-10 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              Upload Your Slip
            </h3>
            <p className="text-sm opacity-80 mb-4">
              AI will extract transaction data automatically
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 text-black"
            />

            {preview && (
              <img
                src={preview}
                className="w-40 rounded-lg mb-4 border"
              />
            )}

            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold"
            >
              {loading ? "Processing..." : "Upload"}
            </button>
          </div>

          {/* SUMMARY */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <p className="text-gray-500">Total</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {total} บาท
              </h3>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <p className="text-gray-500">Transactions</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {count}
              </h3>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <p className="text-gray-500">Status</p>
              <h3 className="text-2xl font-bold text-green-500">
                Active
              </h3>
            </div>
          </div>

          {/* CHART */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-10">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Expense by Category
            </h3>

            {chartData.length === 0 ? (
              <p className="text-gray-500">No data</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={chartData} dataKey="value">
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* TABLE */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Recent Transactions
            </h3>

            {data.length === 0 ? (
              <p className="text-gray-500">No data yet</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-gray-400 dark:border-gray-700">
                    <th className="py-2">Amount</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Date</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
                    >
                      <td className="py-2 font-semibold text-gray-800 dark:text-white">
                        {item.amount} บาท
                      </td>
                      <td className="text-gray-700 dark:text-gray-300">
                        {item.sender}
                      </td>
                      <td className="text-gray-700 dark:text-gray-300">
                        {item.receiver}
                      </td>
                      <td className="text-gray-700 dark:text-gray-300">
                        {item.date} {item.time}
                      </td>
                      <td>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm">
                          {item.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}