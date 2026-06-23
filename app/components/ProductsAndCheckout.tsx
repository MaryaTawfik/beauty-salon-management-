'use client';
import { useState, useEffect } from 'react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Caviar Nourishing Hair Mask', price: 120, stock: 5, description: 'Deeply restores molecular hair health with rare black caviar extracts.', img: '🧴' },
  { id: 2, name: 'Pure Gold Radiance Serum', price: 180, stock: 3, description: 'Infused with 24k gold flakes to brighten skin complexion instantly.', img: '✨' },
];

export default function ProductsAndCheckout() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [productQty, setProductQty] = useState(1);
  
  const [checkoutType, setCheckoutType] = useState<'service' | 'product'>('service');
  const [selectedServicePrice, setSelectedServicePrice] = useState(85); 
  const [tipAmount, setTipAmount] = useState(0);

  // --- FIX 1: AUTO-SELECT PRODUCT ON TAB CHANGE TO PREVENT FROZEN CALCULATIONS ---
  useEffect(() => {
    if (checkoutType === 'product' && !selectedProduct) {
      const firstAvailable = products.find(p => p.stock > 0) || products[0];
      if (firstAvailable) {
        setSelectedProduct(firstAvailable.id);
      }
    }
  }, [checkoutType, selectedProduct, products]);

  const activeProduct = products.find(p => p.id === selectedProduct);
  
  // --- FIX 2: STRICTLY ISOLATED LINE ITEM CALCULATIONS ---
  
  // --- CALCULATE DEPOSIT MILESTONES ---
  const itemCost = checkoutType === 'product' 
    ? (activeProduct && activeProduct.stock > 0 ? activeProduct.price * productQty : 0) 
    : selectedServicePrice;

  // Services require a 50% booking deposit. Products must be paid 100% upfront.
  const depositBase = checkoutType === 'service' ? itemCost / 2 : itemCost;
  const totalDueNow = depositBase + tipAmount;
  const remainingBalance = checkoutType === 'service' ? itemCost / 2 : 0;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (checkoutType === 'product' && activeProduct) {
      if (activeProduct.stock < productQty) {
        alert("Inadequate stock available.");
        return;
      }
      setProducts(prev => prev.map(p => p.id === activeProduct.id ? { ...p, stock: p.stock - productQty } : p));
      
      alert(
        "🛍️ Product Order Placed!\n\n" +
        "Item: " + productQty + "x " + activeProduct.name + "\n" +
        "Total Due Now: $" + totalDueNow + "\n\n" +
        "Please send your payment screenshot to the Admin for immediate delivery verification!"
      );

      setSelectedProduct(null);
      setProductQty(1);
      setTipAmount(0);
    } 
    else if (checkoutType === 'service') {
      let serviceName = "Signature Precision Haircut";
      if (selectedServicePrice === 150) serviceName = "Balayage & Bespoke Colouring";
      if (selectedServicePrice === 210) serviceName = "24K Gold Refining Facial Treatment";

      alert(
        "✨ 50% Booking Deposit Initiated!\n\n" +
        "Service: " + serviceName + " ($" + selectedServicePrice + ")\n" +
        "Paid Now (50% Deposit + Tip): $" + totalDueNow + "\n" +
        "Remaining Balance (Pay at Salon): $" + remainingBalance + "\n\n" +
        "⚠️ ACTION REQUIRED:\n" +
        "Please send your transfer screenshot to the Admin. Your appointment status will stay 'PENDING' until the Admin manually approves it!"
      );

      setTipAmount(0);
    }
  };
  
      
    



  return (
    <section id="products" className="py-24 bg-[#121212] border-t border-white/5 text-white px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <div>
          <h2 className="text-3xl font-serif text-center text-[#D4AF7A] mb-2">Bespoke Products</h2>
          <p className="text-zinc-400 text-center text-sm font-light mb-12">Exquisite home care routines to sustain salon perfection</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((prod) => (
              <div key={prod.id} className="bg-zinc-950/40 border border-white/5 rounded p-6 flex flex-col justify-between hover:border-[#D4AF7A]/30 transition">
                <div>
                  <div className="text-4xl mb-4">{prod.img}</div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg text-amber-100">{prod.name}</h3>
                    <span className="text-[#D4AF7A] font-mono font-medium">${prod.price}</span>
                  </div>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed mb-4">{prod.description}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className={`text-xs ${prod.stock > 0 ? 'text-zinc-500' : 'text-rose-500 font-medium'}`}>
                    {prod.stock > 0 ? `${prod.stock} units remaining` : 'Out of Stock'}
                  </span>
                  <button
                    type="button"
                    disabled={prod.stock === 0}
                    onClick={() => {
                      setSelectedProduct(prod.id);
                      setCheckoutType('product');
                      setProductQty(1);
                    }}
                    className="bg-[#D4AF7A]/10 hover:bg-[#D4AF7A] text-[#D4AF7A] hover:text-black font-semibold uppercase text-[10px] tracking-widest px-4 py-2 rounded transition disabled:opacity-30"
                  >
                    Buy Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="payment" className="max-w-xl mx-auto bg-zinc-950/60 border border-white/5 rounded-lg p-8 shadow-xl">
          <h2 className="text-2xl font-serif text-[#D4AF7A] mb-6 text-center">Luxury Checkout Terminal</h2>
          
          <div className="grid grid-cols-2 gap-2 bg-zinc-900/50 p-1 rounded mb-6 text-xs uppercase tracking-wider">
            <button 
              type="button"
              className={`py-2.5 rounded font-medium transition ${checkoutType === 'service' ? 'bg-[#D4AF7A] text-black' : 'text-zinc-400'}`}
              onClick={() => setCheckoutType('service')}
            >
              Service Payment
            </button>
            <button 
              type="button"
              className={`py-2.5 rounded font-medium transition ${checkoutType === 'product' ? 'bg-[#D4AF7A] text-black' : 'text-zinc-400'}`}
              onClick={() => setCheckoutType('product')}
            >
              Product Purchase
            </button>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            {checkoutType === 'service' ? (
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-400">Select Treatment Service</label>
                <select 
                  className="w-full bg-zinc-900 border border-white/5 rounded p-3 text-sm text-amber-100 focus:outline-none focus:border-[#D4AF7A]"
                  value={selectedServicePrice}
                  onChange={(e) => setSelectedServicePrice(Number(e.target.value))}
                >
                  <option value={85}>Signature Precision Haircut — $85</option>
                  <option value={150}>Balayage & Bespoke Colouring — $150</option>
                  <option value={210}>24K Gold Refining Facial Treatment — $210</option>
                </select>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-zinc-400">Selected Premium Item</label>
                  <select 
                    className="w-full bg-zinc-900 border border-white/5 rounded p-3 text-sm text-amber-100 focus:outline-none focus:border-[#D4AF7A]"
                    value={selectedProduct || ''}
                    onChange={(e) => {
                      setSelectedProduct(Number(e.target.value));
                      setProductQty(1);
                    }}
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id} disabled={p.stock === 0}>
                        {p.name} (${p.price}) {p.stock === 0 ? '- OUT OF STOCK' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {activeProduct && activeProduct.stock > 0 && (
                  <div className="flex items-center justify-between bg-zinc-900 border border-white/5 rounded p-3">
                    <span className="text-xs tracking-wide text-zinc-400">Select Quantity</span>
                    <div className="flex items-center space-x-3">
                      <button 
                        type="button" 
                        disabled={productQty <= 1}
                        onClick={() => handleQtyChange(-1, activeProduct.stock)}
                        className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 font-bold disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm w-4 text-center">{productQty}</span>
                      <button 
                        type="button" 
                        disabled={productQty >= activeProduct.stock}
                        onClick={() => handleQtyChange(1, activeProduct.stock)}
                        className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 font-bold disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-zinc-400">Add Complementary Stylist Tip</label>
              <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                {[0, 15, 25, 50].map((tip) => (
                  <button
                    key={tip}
                    type="button"
                    onClick={() => setTipAmount(tip)}
                    className={`py-2 rounded border transition ${tipAmount === tip ? 'border-[#D4AF7A] bg-[#D4AF7A]/10 text-[#D4AF7A]' : 'border-white/5 text-zinc-400 hover:border-zinc-700'}`}
                  >
                    {tip === 0 ? 'No Tip' : `$${tip}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/40 rounded p-4 text-xs space-y-2 font-light border border-white/5">
              <div className="flex justify-between text-zinc-400">
                <span>Base Line Items:</span>
                <span className="font-mono">${itemCost}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Gratuity / Tip:</span>
                <span className="font-mono">${tipAmount}</span>
              </div>
              <div className="h-[1px] bg-white/5 my-2" />
              <div className="flex justify-between text-sm font-medium text-[#D4AF7A]">
                <span>Total Assessment:</span>
                <span className="font-mono font-bold">${totalDueNow}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={checkoutType === 'product' && (!activeProduct || activeProduct.stock === 0)}
              className="w-full bg-gradient-to-r from-[#D4AF7A] to-amber-600 text-black font-bold uppercase text-xs tracking-widest py-4 rounded transition shadow-lg disabled:opacity-40"
            >
              Authorize Transaction
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}