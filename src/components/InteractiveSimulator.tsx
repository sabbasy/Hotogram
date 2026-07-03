import { useState } from "react";

export default function InteractiveSimulator() {
  const [step, setStep] = useState(0); // 0: Scan, 1: Add items, 2: Place order / KDS Accept, 3: Prep / KDS Ready, 4: Served / Paid, 5: Receipt
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);
  const [ticketStatus, setTicketStatus] = useState<"pending" | "preparing" | "ready" | "served">("pending");

  const menuItems = [
    { id: "1", name: "Special Kashmiri Kahwa", price: 90, desc: "Saffron, almonds, and cardamom tea" },
    { id: "2", name: "Chicken Kanti", price: 280, desc: "Spiced pan-fried chicken chunks" },
  ];

  const addToCart = (item: typeof menuItems[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const getCartTotal = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const resetSimulator = () => {
    setStep(0);
    setCart([]);
    setTicketStatus("pending");
  };

  return (
    <div className="w-full rounded-3xl border border-primary/10 bg-bg p-6 md:p-8 shadow-sm">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping"></span>
          Live Tech Simulator
        </span>
        <h3 className="font-heading text-2xl font-bold text-primary mt-2">See how Hotogram connects tables to kitchens</h3>
        <p className="text-sm text-text-secondary mt-1 max-w-lg mx-auto">
          Interact with the customer phone on the left to see the instant live status route to the kitchen on the right.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Customer Phone Mock */}
        <div className="flex flex-col rounded-3xl border-4 border-slate-900 bg-slate-900 overflow-hidden shadow-2xl min-h-[500px]">
          {/* Status Bar */}
          <div className="bg-slate-950 px-5 py-2.5 flex justify-between items-center text-white/60 text-xs font-mono">
            <span>hotogram.com/table-04</span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>Online</span>
            </div>
          </div>

          {/* Screen Content */}
          <div className="flex-grow bg-bg p-4 flex flex-col justify-between overflow-y-auto">
            
            {/* Step 0: Scan QR Screen */}
            {step === 0 && (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-6 animate-fade-in">
                <div className="relative mb-6 flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-dashed border-primary-mid/30 bg-primary/5">
                  {/* Scan line animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent/70 shadow-md animate-bounce"></div>
                  <svg className="w-16 h-16 text-primary-mid/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0a2 2 0 100-4h-2m-6 4H4m0 0v4m0-8h4m0-4V4m0 4h4" />
                  </svg>
                </div>
                <h4 className="font-heading text-lg font-bold text-primary">Scan Table QR Code</h4>
                <p className="text-xs text-text-secondary mt-2 max-w-xs">
                  Your customer sits at Table 4 and scans our durable code. No app install is requested.
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="mt-6 rounded-xl bg-primary-mid px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-primary transition-colors cursor-pointer"
                >
                  Tap to scan & load menu
                </button>
              </div>
            )}

            {/* Step 1: Browse Menu & Cart */}
            {step === 1 && (
              <div className="flex-grow flex flex-col justify-between animate-fade-in">
                <div>
                  {/* Header */}
                  <div className="flex justify-between items-center border-b border-primary/10 pb-3 mb-4">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-primary">Mughal Darbar Cafe</h4>
                      <span className="text-[10px] text-text-secondary">Table 04 — Digital Order</span>
                    </div>
                    <div className="relative">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      {cart.length > 0 && (
                        <span className="absolute -top-1.5 -right-2 bg-accent text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                          {cart.reduce((sum, i) => sum + i.qty, 0)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-3">
                    {menuItems.map((item) => {
                      const cartItem = cart.find((i) => i.id === item.id);
                      return (
                        <div key={item.id} className="p-3 bg-surface rounded-xl border border-primary/5 flex justify-between items-center shadow-sm">
                          <div>
                            <h5 className="text-xs font-bold text-primary">{item.name}</h5>
                            <p className="text-[10px] text-text-secondary mt-0.5">{item.desc}</p>
                            <span className="text-xs font-bold text-primary-mid mt-1 block">₹{item.price}</span>
                          </div>
                          <button
                            onClick={() => addToCart(item)}
                            className="h-7 px-3 text-[11px] font-bold rounded-lg border border-primary-mid/20 bg-primary/5 text-primary-mid hover:bg-primary-mid hover:text-white transition-colors cursor-pointer"
                          >
                            Add {cartItem ? `(${cartItem.qty})` : "+"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cart Action */}
                <div className="border-t border-primary/10 pt-4 mt-4">
                  {cart.length === 0 ? (
                    <p className="text-[10px] text-text-secondary text-center italic py-2">Add items to place order</p>
                  ) : (
                    <div className="flex justify-between items-center gap-4">
                      <div>
                        <span className="text-[10px] text-text-secondary block">Total Price</span>
                        <span className="text-sm font-bold text-primary">₹{getCartTotal()}</span>
                      </div>
                      <button
                        onClick={() => {
                          setStep(2);
                          setTicketStatus("pending");
                        }}
                        className="rounded-xl bg-accent px-5 py-3 text-xs font-bold text-white shadow hover:bg-accent/90 transition-colors flex-grow text-center cursor-pointer"
                      >
                        Submit Order (₹{getCartTotal()})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2, 3, 4: Active Order Tracking */}
            {(step === 2 || step === 3 || step === 4) && (
              <div className="flex-grow flex flex-col justify-between animate-fade-in">
                <div>
                  {/* Status Card */}
                  <div className="rounded-2xl bg-surface p-4 border border-primary/5 shadow-sm text-center mb-6">
                    <span className="text-[10px] uppercase font-bold text-accent tracking-wider block">Order Status</span>
                    <h4 className="font-heading text-lg font-bold text-primary mt-1">
                      {step === 2 && "Awaiting Kitchen Approval"}
                      {step === 3 && "Chef is Preparing Your Meal"}
                      {step === 4 && "Order Ready & Served!"}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1">
                      {step === 2 && "Sent directly. KOT printing on kitchen display."}
                      {step === 3 && "Cooking in progress. Tracking status live."}
                      {step === 4 && "Food is served. You can checkout below."}
                    </p>
                  </div>

                  {/* Visual Tracker Timeline */}
                  <div className="space-y-4 px-2">
                    <div className="flex items-center gap-3.5">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? "bg-primary-mid text-white" : "bg-primary/5 text-text-secondary"}`}>
                        ✓
                      </div>
                      <span className={`text-xs font-semibold ${step >= 2 ? "text-primary" : "text-text-secondary"}`}>Order Placed (Table 04)</span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step > 2 ? "bg-primary-mid text-white" : step === 2 ? "bg-accent/15 text-accent border border-accent/20 animate-pulse" : "bg-primary/5 text-text-secondary"
                      }`}>
                        {step > 2 ? "✓" : "2"}
                      </div>
                      <span className={`text-xs font-semibold ${step >= 3 ? "text-primary" : "text-text-secondary"}`}>In the Kitchen</span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step > 3 ? "bg-primary-mid text-white" : step === 3 ? "bg-accent/15 text-accent border border-accent/20 animate-pulse" : "bg-primary/5 text-text-secondary"
                      }`}>
                        {step > 3 ? "✓" : "3"}
                      </div>
                      <span className={`text-xs font-semibold ${step >= 4 ? "text-primary" : "text-text-secondary"}`}>Ready & Served</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Action */}
                <div className="border-t border-primary/10 pt-4 mt-6">
                  {step === 4 ? (
                    <button
                      onClick={() => setStep(5)}
                      className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow hover:bg-emerald-700 transition-colors text-center cursor-pointer"
                    >
                      Pay Bill via UPI (₹{getCartTotal()})
                    </button>
                  ) : (
                    <div className="bg-primary/5 rounded-xl p-3 flex justify-between items-center border border-primary/5">
                      <span className="text-[10px] text-text-secondary">Subtotal to Pay</span>
                      <span className="text-xs font-bold text-primary">₹{getCartTotal()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Digital Receipt */}
            {step === 5 && (
              <div className="flex-grow flex flex-col justify-between animate-fade-in text-center">
                <div className="bg-surface rounded-2xl border border-primary/10 p-6 shadow-sm max-w-xs mx-auto">
                  <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-heading text-sm font-bold text-primary">Payment Successful</h4>
                  <p className="text-[10px] text-text-secondary mt-1">Transaction ID: TXN_880491024</p>
                  
                  {/* Bill Receipt Details */}
                  <div className="mt-4 pt-4 border-t border-dashed border-primary/10 text-left font-mono text-[10px] text-text-secondary space-y-1.5">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} x{item.qty}</span>
                        <span>₹{item.price * item.qty}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t border-dashed border-primary/10 pt-2 font-bold text-primary">
                      <span>Total Paid</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={resetSimulator}
                  className="mt-6 w-full rounded-xl bg-primary-mid py-3 text-xs font-bold text-white shadow hover:bg-primary transition-colors text-center cursor-pointer"
                >
                  Restart Simulator Tour
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Kitchen KDS Tablet Mock */}
        <div className="flex flex-col rounded-3xl border-4 border-slate-800 bg-slate-800 overflow-hidden shadow-2xl min-h-[500px]">
          {/* Header */}
          <div className="bg-slate-900 px-5 py-3.5 flex justify-between items-center text-white text-sm font-bold">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="font-heading">Kitchen KDS terminal</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Tablet ID: KITCHEN_01</span>
          </div>

          {/* Screen Content */}
          <div className="flex-grow bg-slate-950 p-4 overflow-y-auto flex flex-col justify-between">
            <div>
              {/* If no order active */}
              {step < 2 && (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <svg className="w-12 h-12 mb-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h4 className="font-heading text-xs font-bold text-slate-400">Queue Empty</h4>
                  <p className="text-[10px] text-slate-500 max-w-xs mt-1">Awaiting orders. Use the customer phone to scan and place an order.</p>
                </div>
              )}

              {/* Active Ticket */}
              {step >= 2 && step < 5 && (
                <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 text-white shadow-md animate-slide-in">
                  <div className="flex justify-between items-center border-b border-slate-700/50 pb-2 mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono">ORDER #204</span>
                      <h4 className="font-heading text-xs font-bold">Table 04 — Dine-in</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                      ticketStatus === "pending" ? "bg-amber-500/20 text-amber-400" :
                      ticketStatus === "preparing" ? "bg-cyan-500/20 text-cyan-400" : "bg-emerald-500/20 text-emerald-400"
                    }`}>
                      {ticketStatus.toUpperCase()}
                    </span>
                  </div>

                  {/* KOT items */}
                  <div className="space-y-1.5 font-mono text-xs text-slate-300">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>• {item.name}</span>
                        <span>x{item.qty}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons on Kitchen display */}
                  <div className="mt-6 pt-4 border-t border-slate-700/50 flex flex-col gap-2">
                    {ticketStatus === "pending" && (
                      <button
                        onClick={() => {
                          setStep(3);
                          setTicketStatus("preparing");
                        }}
                        className="w-full rounded-xl bg-primary-mid py-2.5 text-xs font-bold text-white hover:bg-primary transition-colors cursor-pointer text-center"
                      >
                        Accept Order & Send KOT to Chef
                      </button>
                    )}

                    {ticketStatus === "preparing" && (
                      <button
                        onClick={() => {
                          setStep(4);
                          setTicketStatus("ready");
                        }}
                        className="w-full rounded-xl bg-accent py-2.5 text-xs font-bold text-white hover:bg-accent/90 transition-colors cursor-pointer text-center"
                      >
                        Mark Meal as Prepared & Ready
                      </button>
                    )}

                    {ticketStatus === "ready" && (
                      <div className="bg-slate-800 rounded-xl p-3 text-center text-[10px] text-slate-400">
                        Meal delivered. Awaiting payment notification from customer...
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order paid and cleared */}
              {step === 5 && (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-heading text-xs font-bold text-slate-200">Table 04 Cleared</h4>
                  <p className="text-[10px] text-slate-500 max-w-xs mt-1">Order #204 paid successfully. Table is marked vacant on POS system.</p>
                </div>
              )}
            </div>

            {/* Tech stats bar */}
            <div className="border-t border-slate-800/80 pt-4 mt-6 text-slate-500 font-mono text-[9px] flex justify-between">
              <span>LATENCY: 42ms</span>
              <span>KOT PRINTER: ONLINE</span>
              <span>UPI SYNC: 100%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
