import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { UploadCloud, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

const AddItem = () => {
  const { url, fetchFoodList } = useContext(StoreContext);

  // Form Fields State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Signature Bowls");
  const [ingredients, setIngredients] = useState("");
  
  // Image handling: supporting either File uploads or direct Image URL pasting
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageMode, setImageMode] = useState("file"); // "file" or "url"

  // Status Alerts
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (!name || !price || !category) {
      setErrorMsg("Please fill in all core descriptors (Name, Category, and Price).");
      setLoading(false);
      return;
    }

    if (imageMode === "file" && !imageFile) {
      setErrorMsg("Please choose an image file to upload.");
      setLoading(false);
      return;
    }

    try {
      // Use FormData to support binary file upload
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("category", category);
      formData.append("ingredients", ingredients);

      if (imageMode === "file" && imageFile) {
        formData.append("image", imageFile);
      } else if (imageMode === "url" && imageUrl) {
        formData.append("image", imageUrl); // URL string fallback in controllers
      }

      const response = await fetch(`${url}/api/food/add`, {
        method: "POST",
        body: formData // Content-Type header left blank for multipart/form-data boundary
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMsg(`Artisan item "${name}" has been successfully added to inventory.`);
        
        // Reset Form Fields
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Signature Bowls");
        setIngredients("");
        setImageFile(null);
        setImageUrl("");
        
        // Sync global state food list
        await fetchFoodList();
      } else {
        setErrorMsg(data.message || "Failed to add new food item.");
      }
    } catch (err) {
      console.error("Add food submit error:", err);
      setErrorMsg("Network failure. Failed to sync new item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 text-left">
      
      {/* Title */}
      <div className="mb-8 border-b border-[#1a1a1a]/5 pb-4">
        <h2 className="text-3xl font-bold text-[#1a1a1a]">Add Food Item</h2>
        <p className="text-xs text-[#1a1a1a]/50 mt-1 font-light">Introduce a new gourmet recipe or freshly-sourced artisan selection to the client menu.</p>
      </div>

      {/* Alert Boxes */}
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 text-xs font-semibold rounded-xl border border-green-200 flex items-center gap-2 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle size={16} className="text-green-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 text-xs font-semibold rounded-xl border border-red-200 flex items-center gap-2 animate-in slide-in-from-top-4 duration-300">
          <AlertCircle size={16} className="text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: General Fields */}
        <div className="lg:col-span-2 flex flex-col gap-5 bg-[#fdfbf7] border border-[#1a1a1a]/5 p-8 rounded-3xl shadow-sm">
          
          <h3 className="text-lg font-bold font-serif text-[#1a1a1a] flex items-center gap-1.5 border-b border-gray-100 pb-3">
            <Sparkles size={16} className="text-[#d4af37]" />
            Item Characteristics
          </h3>

          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/45">Food Item Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Lobster Truffle Bisque" 
              className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs bg-white"
            />
          </div>

          {/* Ingredients Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/45">Artisan Ingredients (Provenance)</label>
            <input 
              type="text" 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. Maine Lobster, Summer Black Truffles, Organic Heavy Cream" 
              className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs bg-white"
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/45">Detailed Menu Description</label>
            <textarea 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a compelling description outlining recipe notes, flavor profiles, and allergen details."
              className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs bg-white resize-none leading-relaxed"
            />
          </div>

        </div>

        {/* Right Side: Price, Category and Image */}
        <div className="flex flex-col gap-6">
          
          {/* Metadata Block */}
          <div className="bg-[#fdfbf7] border border-[#1a1a1a]/5 p-6 rounded-3xl shadow-sm flex flex-col gap-4">
            
            <h3 className="text-md font-bold font-serif text-[#1a1a1a] border-b border-gray-100 pb-2">Inventory Variables</h3>

            {/* Category Dropdown */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/45">Artisan Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3.5 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs bg-white font-semibold cursor-pointer"
              >
                <option value="Signature Bowls">Signature Bowls</option>
                <option value="Wood-Fired Rolls">Wood-Fired Rolls</option>
                <option value="Artisan Desserts">Artisan Desserts</option>
                <option value="Gourmet Sandwiches">Gourmet Sandwiches</option>
                <option value="Curated Salads">Curated Salads</option>
                <option value="Special Pasta">Special Pasta</option>
              </select>
            </div>

            {/* Price Field */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/45">Price Configuration (FCFA)</label>
              <input 
                type="number" 
                step="0.01"
                min="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="e.g. 24.50" 
                className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs bg-white font-bold"
              />
            </div>

          </div>

          {/* Image Uploader Block */}
          <div className="bg-[#fdfbf7] border border-[#1a1a1a]/5 p-6 rounded-3xl shadow-sm flex flex-col gap-4">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="text-md font-bold font-serif text-[#1a1a1a]">Visual Asset</h3>
              
              {/* Selector Mode */}
              <div className="flex bg-[#1a1a1a]/5 rounded-lg p-0.5 text-[9px] font-bold">
                <button 
                  type="button" 
                  onClick={() => setImageMode("file")} 
                  className={`px-2 py-1 rounded-md transition-colors ${imageMode === "file" ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a]/50"}`}
                >
                  File
                </button>
                <button 
                  type="button" 
                  onClick={() => setImageMode("url")} 
                  className={`px-2 py-1 rounded-md transition-colors ${imageMode === "url" ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a]/50"}`}
                >
                  Link
                </button>
              </div>
            </div>

            {imageMode === "file" ? (
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/45 text-left">Upload Binary Image</label>
                <div className="relative border-2 border-dashed border-[#1a1a1a]/15 hover:border-[#d4af37]/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <UploadCloud size={32} className="text-[#1a1a1a]/20 group-hover:text-[#d4af37] transition-colors mb-2" />
                  
                  {imageFile ? (
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-[#1a1a1a] truncate max-w-[180px]">{imageFile.name}</p>
                      <p className="text-[9px] text-[#1a1a1a]/40 mt-0.5">Size: {(imageFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  ) : (
                    <div className="text-center select-none pointer-events-none">
                      <p className="text-[10px] font-bold text-[#1a1a1a]/60">Select Image File</p>
                      <p className="text-[8px] text-[#1a1a1a]/30 mt-0.5">PNG, JPG, or WEBP up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/45">External Asset Link</label>
                <input 
                  type="url" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or similar" 
                  className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs bg-white"
                />
              </div>
            )}

          </div>

          {/* Submit Trigger */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#1a1a1a] hover:bg-[#d4af37] hover:text-[#1a1a1a] text-[#fdfbf7] text-xs font-bold uppercase tracking-wider rounded-2xl shadow-lg transition-all duration-300 flex justify-center items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#fdfbf7] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Save Artisan Item"
            )}
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddItem;
