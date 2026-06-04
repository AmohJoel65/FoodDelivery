import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Package, RefreshCw, AlertCircle, ShoppingBag, Truck, CheckCircle2, Clock } from "lucide-react";

const ManageOrders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const fetchAllOrders = async () => {
    setLoading(true);
    setFeedback({ type: "", text: "" });
    try {
      const response = await fetch(`${url}/api/order/list`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        console.error("Failed to load admin orders:", data.message);
      }
    } catch (error) {
      console.error("Error loading admin orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    setFeedback({ type: "", text: "" });
    
    try {
      const response = await fetch(`${url}/api/order/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId,
          status: newStatus
        })
      });

      const data = await response.json();
      if (data.success) {
        setFeedback({ type: "success", text: `Order status updated to "${newStatus}"` });
        
        // Optimistic local state update to prevent flashing refresh spinner
        setOrders((prev) => 
          prev.map((o) => o._id === orderId ? { ...o, status: newStatus } : o)
        );
      } else {
        setFeedback({ type: "error", text: data.message || "Failed to update status." });
      }
    } catch (error) {
      console.error("Update status error:", error);
      setFeedback({ type: "error", text: "Connection error. Status change aborted." });
    } finally {
      setUpdatingId("");
    }
  };

  // Status visual configurations
  const getStatusVisuals = (status) => {
    switch (status) {
      case "Food Processing":
        return {
          border: "border-amber-200 bg-amber-50/50",
          icon: <Clock size={16} className="text-amber-500 animate-pulse" />,
          pill: "bg-amber-100 text-amber-900 border-amber-300"
        };
      case "Out for Delivery":
        return {
          border: "border-blue-200 bg-blue-50/50",
          icon: <Truck size={16} className="text-blue-500" />,
          pill: "bg-blue-100 text-blue-900 border-blue-300"
        };
      case "Delivered":
        return {
          border: "border-green-200 bg-green-50/30",
          icon: <CheckCircle2 size={16} className="text-green-500" />,
          pill: "bg-green-100 text-green-905 border-green-300"
        };
      default:
        return {
          border: "border-gray-200 bg-gray-50/50",
          icon: <Package size={16} />,
          pill: "bg-gray-100 text-gray-900 border-gray-300"
        };
    }
  };

  return (
    <div className="animate-in fade-in duration-500 text-left">
      
      {/* Header controls */}
      <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/5 pb-4">
        <div className="text-left">
          <h2 className="text-3xl font-bold text-[#1a1a1a]">Fulfillment Dashboard</h2>
          <p className="text-xs text-[#1a1a1a]/50 mt-1 font-light">Monitor placed order records, dispatch details, and adjust active preparation/delivery flags.</p>
        </div>
        
        <button 
          onClick={fetchAllOrders}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1a1a1a]/10 hover:border-[#d4af37] text-xs font-semibold text-[#1a1a1a] transition-all bg-[#fdfbf7]"
        >
          <RefreshCw size={13} className={loading ? "animate-spin text-[#d4af37]" : "text-[#1a1a1a]/60"} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Feedback Alert box */}
      {feedback.text && (
        <div className={`mb-6 p-4 rounded-xl text-xs font-semibold border flex items-center gap-2 animate-in slide-in-from-top-4 duration-300 ${
          feedback.type === "success" 
            ? "bg-green-50 text-green-800 border-green-200" 
            : "bg-red-50 text-red-800 border-red-200"
        }`}>
          <AlertCircle size={16} className={feedback.type === "success" ? "text-green-600" : "text-red-650"} />
          <span>{feedback.text}</span>
        </div>
      )}

      {loading && orders.length === 0 ? (
        <div className="text-center py-20 bg-white/40 border border-[#1a1a1a]/5 rounded-3xl">
          <div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-[#1a1a1a]/45 uppercase mt-4">Syncing full orders deck...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-[#1a1a1a]/5 rounded-3xl border border-dashed border-[#1a1a1a]/10 max-w-2xl mx-auto flex flex-col items-center gap-4">
          <ShoppingBag size={40} className="text-[#1a1a1a]/20" />
          <div>
            <h3 className="text-lg font-bold font-serif text-[#1a1a1a]">No Active Tickets</h3>
            <p className="text-xs text-[#1a1a1a]/50 mt-1 max-w-xs font-light">Client order history is empty. Rest assured, placed orders show up here instantly.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => {
            const visualConfig = getStatusVisuals(order.status);
            const isUpdating = updatingId === order._id;

            return (
              <div 
                key={order._id}
                className={`p-6 sm:p-8 rounded-3xl border shadow-sm transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8 ${visualConfig.border}`}
              >
                
                {/* Left Side: Package Icon and Dish mapping */}
                <div className="flex items-start gap-4 flex-grow max-w-lg">
                  <div className="w-12 h-12 rounded-2xl bg-[#1a1a1a]/5 flex items-center justify-center shrink-0 text-[#ebdcae] border border-[#1a1a1a]/5 shadow-inner">
                    <Package size={22} className="text-[#d4af37]" />
                  </div>
                  
                  <div className="flex flex-col gap-2.5 text-left">
                    {/* Items text breakdown */}
                    <div>
                      <p className="text-xs font-bold text-[#1a1a1a] leading-relaxed">
                        {order.items.map((item, idx) => (
                          <span key={idx}>
                            {item.name} <b className="text-[#d4af37]">({item.quantity})</b>
                            {idx < order.items.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>

                    {/* Client billing coordinates details */}
                    <div className="text-[11px] text-[#1a1a1a]/65 leading-relaxed font-light">
                      <p className="font-bold text-[#1a1a1a] text-xs">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p>{order.address.street}, {order.address.city}, {order.address.state} {order.address.zipCode}, {order.address.country}</p>
                      <p className="mt-1 font-semibold text-[10px] text-[#1a1a1a]/50">Tel: {order.address.phone} | Email: {order.address.email}</p>
                    </div>
                  </div>
                </div>

                {/* Center Side: Finances and quantities */}
                <div className="flex flex-row lg:flex-col lg:items-end justify-between lg:justify-center gap-6 shrink-0 lg:text-right border-t lg:border-t-0 border-[#1a1a1a]/5 pt-4 lg:pt-0">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#1a1a1a]/45">Grand Total</p>
                    <p className="text-lg font-bold font-serif text-[#1a1a1a]">FCFA {order.amount.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#1a1a1a]/45">Reference ID</p>
                    <p className="text-[11px] font-semibold text-[#1a1a1a]/60 font-mono">{order._id}</p>
                  </div>
                </div>

                {/* Right Side: fulfillment update dropmenu selector */}
                <div className="flex sm:items-center justify-between lg:justify-center gap-6 shrink-0 border-t lg:border-t-0 border-[#1a1a1a]/5 pt-4 lg:pt-0">
                  
                  {/* Dropdown status update */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-[#1a1a1a]/45">Fulfillment Dispatch</label>
                    <div className="relative">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        disabled={isUpdating}
                        className={`pl-3.5 pr-8 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider cursor-pointer outline-none transition-colors bg-white ${visualConfig.pill}`}
                      >
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      
                      {isUpdating && (
                        <div className="absolute right-3.5 top-3 w-4 h-4 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </div>
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

export default ManageOrders;
