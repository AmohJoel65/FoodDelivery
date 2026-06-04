import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { ClipboardList, RotateCw, Package, Truck, CheckCircle2, Clock } from "lucide-react";

const MyOrders = () => {
  const { token, url, formatPrice } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/order/userorders`, {
        method: "GET",
        headers: {
          token: token
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        console.error("Failed to load orders:", data.message);
      }
    } catch (error) {
      console.error("Error loading user orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Color mapper helper for order fulfillment statuses
  const getStatusStyle = (status) => {
    switch (status) {
      case "Food Processing":
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          icon: <Clock size={12} className="text-amber-600 animate-pulse" />
        };
      case "Out for Delivery":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <Truck size={12} className="text-blue-600" />
        };
      case "Delivered":
        return {
          bg: "bg-green-50 text-green-800 border-green-200",
          icon: <CheckCircle2 size={12} className="text-green-600" />
        };
      default:
        return {
          bg: "bg-gray-50 text-gray-800 border-gray-200",
          icon: <Package size={12} />
        };
    }
  };

  if (!token) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <ClipboardList size={48} className="text-[#1a1a1a]/25 mx-auto mb-4" />
        <h3 className="text-xl font-bold font-serif text-[#1a1a1a]">Access Required</h3>
        <p className="text-xs text-[#1a1a1a]/50 mt-1 max-w-xs mx-auto font-light">Please sign in or register to view your historical accounts and order sheets.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-[600px] animate-in fade-in duration-500">
      
      {/* Header controls */}
      <div className="flex justify-between items-center mb-10 pb-4 border-b border-[#1a1a1a]/5">
        <div className="text-left">
          <h2 className="text-3xl font-bold text-[#1a1a1a]">Order History</h2>
          <p className="text-xs text-[#1a1a1a]/50 mt-1 font-light">Track the current preparation and delivery stages of your culinary orders.</p>
        </div>
        
        <button 
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1a1a1a]/10 hover:border-[#d4af37] text-xs font-semibold text-[#1a1a1a] transition-all bg-[#fdfbf7]"
          title="Refresh orders list"
        >
          <RotateCw size={14} className={loading ? "animate-spin text-[#d4af37]" : "text-[#1a1a1a]/60"} />
          <span>Refresh</span>
        </button>
      </div>

      {loading && orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-[#1a1a1a]/45 uppercase mt-4">Syncing order logs...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-[#1a1a1a]/5 rounded-3xl border border-dashed border-[#1a1a1a]/10 max-w-2xl mx-auto flex flex-col items-center gap-4">
          <Package size={40} className="text-[#1a1a1a]/30" />
          <div>
            <h3 className="text-lg font-bold font-serif text-[#1a1a1a]">No Orders Found</h3>
            <p className="text-xs text-[#1a1a1a]/50 mt-1 max-w-xs font-light">You have not placed any gourmet orders under this profile yet.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {orders.map((order) => {
            const statusConfig = getStatusStyle(order.status);
            return (
              <div 
                key={order._id}
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#1a1a1a]/5 shadow-sm text-left flex flex-col gap-6"
              >
                
                {/* Top Info */}
                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[#1a1a1a]/5 pb-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/45">Order Reference</p>
                    <p className="text-xs font-bold text-[#1a1a1a] font-mono">{order._id}</p>
                  </div>
                  
                  <div className="flex flex-col sm:items-end gap-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/45">Placed On</p>
                    <p className="text-xs text-[#1a1a1a]/70 font-semibold">
                      {new Date(order.date).toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  {/* Status Pill Badge */}
                  <div className={`px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2 ${statusConfig.bg}`}>
                    {statusConfig.icon}
                    <span>{order.status}</span>
                  </div>
                </div>

                {/* Items & Address Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-medium text-[#1a1a1a]/70">
                  
                  {/* Items List */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/45 mb-3">Dishes Ordered</h4>
                    <div className="flex flex-col gap-2.5 max-h-40 overflow-y-auto">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-1.5 pr-2">
                          <span className="font-bold text-[#1a1a1a] truncate max-w-[80%]">
                            {item.name} <span className="text-[10px] font-semibold text-[#d4af37] ml-1">× {item.quantity}</span>
                          </span>
                          <span className="font-bold text-[#1a1a1a]">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Location info */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/45 mb-3">Delivery Coordinates</h4>
                    <div className="flex flex-col gap-1 text-[#1a1a1a]/85 font-light leading-relaxed">
                      <p className="font-semibold text-[#1a1a1a]">{order.address.firstName} {order.address.lastName}</p>
                      <p>{order.address.street}</p>
                      <p>{order.address.city}, {order.address.state} {order.address.zipCode}</p>
                      <p>{order.address.country}</p>
                      <p className="mt-1 font-semibold text-[10px] text-[#1a1a1a]/60">Tel: {order.address.phone}</p>
                    </div>
                  </div>

                </div>

                {/* Bottom Total Paid row */}
                <div className="flex justify-between items-center pt-4 border-t border-[#1a1a1a]/5 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/20"></span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-700">Payment Confirmed</span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 mr-3">Grand Total Paid</span>
                    <span className="text-xl font-bold font-serif text-[#1a1a1a]">{formatPrice(order.amount)}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default MyOrders;
