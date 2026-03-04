"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RyuzaStore() {
  const [user, setUser] = useState(null); // Simulasi Login
  const [showPay, setShowPay] = useState(false);
  const [showPtero, setShowPtero] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: 1, name: 'Paket Bronze', price: 10000, ram: '1GB' },
    { id: 2, name: 'Paket Silver', price: 25000, ram: '3GB' },
    { id: 3, name: 'Paket Gold', price: 50000, ram: '8GB' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      {/* NAVBAR */}
      <nav className="p-6 flex justify-between items-center border-b border-gray-800 bg-[#0a0f1e]/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-black text-blue-500 tracking-tighter">RYUZA STORE</h1>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#" className="hover:text-blue-400">Home</a>
          <a href="#" className="hover:text-blue-400">Product</a>
          <a href="#" className="hover:text-blue-400">Riwayat Order</a>
          <a href="#" className="text-red-400">Expired</a>
        </div>
        <div>
          {user ? (
            <div className="text-right">
              <p className="text-sm font-bold">{user.name}</p>
              <button onClick={() => setUser(null)} className="text-xs text-red-500">Logout</button>
            </div>
          ) : (
            <button onClick={() => setUser({name: 'Ryuza User', id: 'RYZ01'})} className="bg-blue-600 px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-500 shadow-lg shadow-blue-500/20">Login</button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="py-20 text-center px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-extrabold mb-4">Store Hosting <span className="text-blue-500">Otomatis</span></motion.h2>
        <p className="text-gray-400 text-lg">Bayar Terlebih Dahulu, Panel Langsung Aktif.</p>
      </section>

      {/* PRODUCTS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 p-6">
        {plans.map((plan) => (
          <motion.div whileHover={{ y: -10 }} key={plan.id} className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800 hover:border-blue-500 transition-all">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-4xl font-black text-blue-400 mb-6">Rp {plan.price.toLocaleString()}</p>
            <ul className="text-gray-400 mb-8 space-y-3">
              <li>✅ RAM {plan.ram}</li>
              <li>✅ CPU High Performance</li>
              <li>✅ Anti DDoS</li>
            </ul>
            <button onClick={() => {setSelectedPlan(plan); setShowPay(true)}} className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:bg-blue-500 hover:text-white transition">Beli Sekarang</button>
          </motion.div>
        ))}
      </div>

      {/* OVERLAY PEMBAYARAN (STEP 1) */}
      <AnimatePresence>
        {showPay && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4">
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-700 w-full max-w-md text-center">
              <h2 className="text-2xl font-bold mb-2">Pembayaran Ryuza Store</h2>
              <p className="text-blue-400 font-bold text-xl mb-4">Total: Rp {selectedPlan?.price.toLocaleString()}</p>
              
              <div className="bg-white p-4 rounded-2xl mb-4">
                <img src="https://i.ibb.co/3mN0FzL/qr-code.jpg" alt="QRIS" className="w-48 mx-auto" />
              </div>
              
              <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">Scan QRIS / Dana / Gopay</p>
              
              <div className="text-left space-y-4">
                <label className="text-sm text-gray-400">Upload Bukti Transfer:</label>
                <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500" />
              </div>

              <button onClick={() => {setShowPay(false); setShowPtero(true)}} className="w-full mt-6 py-4 bg-blue-600 rounded-2xl font-bold">Saya Sudah Bayar</button>
              <button onClick={() => setShowPay(false)} className="mt-4 text-gray-500">Batal</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY PEMBUATAN HOSTING (STEP 2 - SETELAH BAYAR) */}
      <AnimatePresence>
        {showPtero && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 bg-blue-600/20 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
            <div className="bg-gray-900 p-8 rounded-3xl border-2 border-green-500 w-full max-w-md text-center">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50">
                    <span className="text-3xl">✓</span>
                </div>
              <h2 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h2>
              <p className="text-gray-400 mb-6">Silahkan buat akun panel Pterodactyl Anda.</p>
              
              <input type="text" placeholder="Masukkan Username Panel" className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 mb-4 focus:border-blue-500 outline-none" />
              <button onClick={() => alert('Server Sedang Dibuat!')} className="w-full py-4 bg-green-600 rounded-xl font-bold hover:bg-green-500">Aktifkan Hosting Sekarang</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
