import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Trash2, AlertCircle, RefreshCw, Layers, Edit2 } from "lucide-react";

const ListItem = () => {
  const { food_list, url, fetchFoodList, showConfirm } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState({ type: "", text: "" });
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    ingredients: "",
    image: "",
    sourcing: "",
    prepTime: "",
    stock: "",
    lowStockThreshold: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    setFeedbackMsg({ type: "", text: "" });
    try {
      await fetchFoodList();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id, name) => {
    const confirmed = await showConfirm(`Are you absolutely sure you want to permanently delete "${name}" from inventory?`, "Delete Item");
    if (!confirmed) return;

    setDeletingId(id);
    setFeedbackMsg({ type: "", text: "" });

    try {
      const response = await fetch(`${url}/api/food/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });

      const data = await response.json();
      if (data.success) {
        setFeedbackMsg({ type: "success", text: `"${name}" removed successfully.` });
        await fetchFoodList(); // refresh global state
      } else {
        setFeedbackMsg({ type: "error", text: data.message || "Failed to remove item." });
      }
    } catch (error) {
      console.error("Remove item error:", error);
      setFeedbackMsg({ type: "error", text: "Connection error. Unable to delete item." });
    } finally {
      setDeletingId("");
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setEditForm({
      name: item.name,
      description: item.description || "",
      price: item.price,
      category: item.category,
      ingredients: item.ingredients || "",
      image: item.image || "",
      sourcing: item.sourcing || "",
      prepTime: item.prepTime || "",
      stock: item.stock || "",
      lowStockThreshold: item.lowStockThreshold || ""
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedbackMsg({ type: "", text: "" });

    try {
      const response = await fetch(`${url}/api/food/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: editingItem._id,
          ...editForm
        })
      });

      const data = await response.json();
      if (data.success) {
        setFeedbackMsg({ type: "success", text: `"${editForm.name}" updated successfully.` });
        await fetchFoodList();
        setEditingItem(null);
      } else {
        setFeedbackMsg({ type: "error", text: data.message || "Failed to update item." });
      }
    } catch (error) {
      console.error("Update item error:", error);
      setFeedbackMsg({ type: "error", text: "Connection error. Unable to update item." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditForm({
      name: "",
      description: "",
      price: "",
      category: "",
      ingredients: "",
      image: "",
      sourcing: "",
      prepTime: "",
      stock: "",
      lowStockThreshold: ""
    });
  };

  return (
    <div className="animate-in fade-in duration-500 text-left">
      
      {/* Header controls */}
      <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/5 pb-4">
        <div className="text-left">
          <h2 className="text-3xl font-bold text-[#1a1a1a]">Artisan Food Inventory</h2>
          <p className="text-xs text-[#1a1a1a]/50 mt-1 font-light">Inspect existing selections, audit classifications, and delete depleted menu items.</p>
        </div>
        
        <button 
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1a1a1a]/10 hover:border-[#d4af37] text-xs font-semibold text-[#1a1a1a] transition-all bg-[#fdfbf7]"
        >
          <RefreshCw size={13} className={loading ? "animate-spin text-[#d4af37]" : "text-[#1a1a1a]/60"} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Feedback Alerts */}
      {feedbackMsg.text && (
        <div className={`mb-6 p-4 rounded-xl text-xs font-semibold border flex items-center gap-2 animate-in slide-in-from-top-4 duration-300 ${
          feedbackMsg.type === "success" 
            ? "bg-green-50 text-green-800 border-green-200" 
            : "bg-red-50 text-red-800 border-red-200"
        }`}>
          <AlertCircle size={16} className={feedbackMsg.type === "success" ? "text-green-600" : "text-red-650"} />
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Table Data list */}
      <div className="bg-[#fdfbf7] border border-[#1a1a1a]/5 rounded-3xl overflow-hidden shadow-sm">
        {food_list.length === 0 ? (
          <div className="text-center py-20">
            <Layers size={40} className="text-[#1a1a1a]/20 mx-auto mb-3" />
            <p className="text-sm font-serif text-[#1a1a1a]/50 italic">No food items found in active inventory registry.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1a1a1a]/5 border-b border-[#1a1a1a]/5 text-[10px] uppercase font-extrabold tracking-widest text-[#1a1a1a]/50">
                  <th className="py-4 px-6">Preview</th>
                  <th className="py-4 px-6">Food Name</th>
                  <th className="py-4 px-6">Artisan Category</th>
                  <th className="py-4 px-6">Price (FCFA)</th>
                  <th className="py-4 px-6">Stock</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]/5 text-xs font-semibold text-[#1a1a1a]">
                {food_list.map((item) => {
                  const isDeleting = deletingId === item._id;
                  return (
                    <tr key={item._id} className="hover:bg-[#1a1a1a]/2 transition-colors">
                      {/* Image Thumbnail */}
                      <td className="py-4 px-6">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#1a1a1a]/10 bg-[#1a1a1a]/5">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800";
                            }}
                          />
                        </div>
                      </td>
                      {/* Name */}
                      <td className="py-4 px-6 font-bold text-[#1a1a1a]">
                        <p>{item.name}</p>
                        <p className="text-[10px] text-[#1a1a1a]/40 font-light mt-0.5 max-w-xs truncate leading-normal">
                          {item.description || "Artisan recipe selection."}
                        </p>
                      </td>
                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className="bg-[#1a1a1a]/5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-[#1a1a1a]/60 border border-[#1a1a1a]/5">
                          {item.category}
                        </span>
                      </td>
                      {/* Price */}
                      <td className="py-4 px-6 font-mono font-bold text-sm text-[#1a1a1a]">{item.price.toFixed(0)} FCFA</td>
                      {/* Stock */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <span className={`text-xs font-bold ${
                            item.stock <= item.lowStockThreshold 
                              ? "text-red-600" 
                              : item.stock <= item.lowStockThreshold * 2 
                                ? "text-amber-600" 
                                : "text-green-600"
                          }`}>
                            {item.stock <= 0 ? "Out of Stock" : `${item.stock} units`}
                          </span>
                          {item.stock <= item.lowStockThreshold && item.stock > 0 && (
                            <span className="text-[10px] text-red-600 font-semibold">
                              ⚠️ Low Stock
                            </span>
                          )}
                        </div>
                      </td>
                      {/* Actions */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="p-2.5 rounded-xl border border-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/10 transition-all active:scale-95"
                            title="Edit Item"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item._id, item.name)}
                            disabled={isDeleting}
                            className="p-2.5 rounded-xl border border-red-500/10 text-red-655 hover:bg-red-50 transition-all active:scale-95 disabled:opacity-50"
                            title="Delete from Menu"
                          >
                            {isDeleting ? (
                              <div className="w-4 h-4 border-2 border-red-655 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Trash2 size={15} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1a1a]/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-[#fdfbf7] rounded-3xl border border-[#1a1a1a]/10 shadow-2xl p-8 z-10 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-[#1a1a1a]/5 pb-4">
              <h3 className="text-2xl font-bold font-serif text-[#1a1a1a]">Edit Food Item</h3>
              <button
                onClick={handleCancelEdit}
                className="p-2 rounded-xl hover:bg-[#1a1a1a]/5 transition-colors"
              >
                <AlertCircle size={20} className="text-[#1a1a1a]/40" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Food Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                    className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Category</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    required
                    className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/50">Price (FCFA)</label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    required
                    className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/50">Prep Time</label>
                  <input
                    type="text"
                    value={editForm.prepTime}
                    onChange={(e) => setEditForm({ ...editForm, prepTime: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/50">Stock Quantity</label>
                  <input
                    type="number"
                    value={editForm.stock}
                    onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/50">Low Stock Threshold</label>
                  <input
                    type="number"
                    value={editForm.lowStockThreshold}
                    onChange={(e) => setEditForm({ ...editForm, lowStockThreshold: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Ingredients</label>
                <textarea
                  value={editForm.ingredients}
                  onChange={(e) => setEditForm({ ...editForm, ingredients: e.target.value })}
                  rows={2}
                  className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs resize-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Image URL</label>
                <input
                  type="text"
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Sourcing</label>
                <input
                  type="text"
                  value={editForm.sourcing}
                  onChange={(e) => setEditForm({ ...editForm, sourcing: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="flex-1 py-3 border border-[#1a1a1a]/10 text-[#1a1a1a] font-bold text-xs rounded-xl hover:bg-[#1a1a1a]/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 bg-[#d4af37] hover:bg-[#b88934] text-[#1a1a1a] font-bold text-xs rounded-xl transition-all flex justify-center items-center gap-2"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ListItem;
