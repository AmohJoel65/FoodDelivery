import React, { useContext, useEffect, useState } from "react";
import { formatDeliveryAddress } from "../utils/apiErrors";
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
        <ClipboardList size={48} className="text-brand-charcoal/25 mx-auto mb-4" />
        <h3 className="text-xl font-bold font-serif text-brand-charcoal">Access Required</h3>
        <p className="text-xs text-brand-charcoal/50 mt-1 max-w-xs mx-auto font-light">Please sign in or register to view your historical accounts and order sheets.</p>
      </div>
    );
  }

  return (
    <div className="page-container py-8 sm:py-12 min-h-[50vh] animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 pb-4 border-b border-brand-charcoal/5">
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal">Order history</h2>
          <p className="text-sm text-brand-charcoal/50 mt-1">Track preparation and delivery status.</p>
        </div>
        
        <button 
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-brand-charcoal/10 hover:border-brand-gold text-sm font-semibold text-brand-charcoal transition-all bg-brand-cream min-h-[44px] shrink-0 self-start sm:self-auto"
          title="Refresh orders list"
        >
          <RotateCw size={14} className={loading ? "animate-spin text-brand-gold" : "text-brand-charcoal/60"} />
          <span>Refresh</span>
        </button>
      </div>

      {loading && orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-brand-charcoal/45 uppercase mt-4">Syncing order logs...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-brand-charcoal/5 rounded-3xl border border-dashed border-brand-charcoal/10 max-w-2xl mx-auto flex flex-col items-center gap-4">
          <Package size={40} className="text-brand-charcoal/30" />
          <div>
            <h3 className="text-lg font-bold font-serif text-brand-charcoal">No Orders Found</h3>
            <p className="text-xs text-brand-charcoal/50 mt-1 max-w-xs font-light">You have not placed any gourmet orders under this profile yet.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {orders.map((order) => {
            const statusConfig = getStatusStyle(order.status);
            return (
              <div 
                key={order._id}
                className="brand-card p-6 sm:p-8 rounded-2xl border border-brand-charcoal/5 shadow-sm text-left flex flex-col gap-6"
              >
                
                {/* Top Info */}
                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-brand-charcoal/5 pb-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/45">Order Reference</p>
                    <p className="text-xs font-bold text-brand-charcoal font-mono">{order._id}</p>
                  </div>
                  
                  <div className="flex flex-col sm:items-end gap-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/45">Placed On</p>
                    <p className="text-xs text-brand-charcoal/70 font-semibold">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-medium text-brand-charcoal/70">
                  
                  {/* Items List */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/45 mb-3">Dishes Ordered</h4>
                    <div className="flex flex-col gap-2.5 max-h-40 overflow-y-auto">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-1.5 pr-2">
                          <span className="font-bold text-brand-charcoal truncate max-w-[80%]">
                            {item.name} <span className="text-[10px] font-semibold text-brand-gold ml-1">× {item.quantity}</span>
                          </span>
                          <span className="font-bold text-brand-charcoal">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Location info */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/45 mb-3">Delivery address</h4>
                    <div className="flex flex-col gap-1 text-brand-charcoal/85 font-light leading-relaxed">
                      {(() => {
                        const { name, lines } = formatDeliveryAddress(order.address);
                        return (
                          <>
                            <p className="font-semibold text-brand-charcoal">{name}</p>
                            {lines.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </>
                        );
                      })()}
                    </div>
                  </div>

                </div>

                {/* Bottom Total Paid row */}
                <div className="flex justify-between items-center pt-4 border-t border-brand-charcoal/5 mt-2">
                  <div className="flex items-center gap-2">
                    {order.paymentStatus === "Pending Verification" && order.status !== "Delivered" && order.status !== "Out for Delivery" ? (
                      <>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/20"></span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Payment Verification Pending</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/20"></span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-700">Payment Confirmed</span>
                      </>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 mr-3">Grand Total Paid</span>
                    <span className="text-xl font-bold font-serif text-brand-charcoal">{formatPrice(order.amount)}</span>
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
