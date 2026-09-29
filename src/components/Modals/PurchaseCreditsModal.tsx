import React, { useState } from 'react';
import { ContainerSize } from '../../types';

interface PurchaseCreditsModalProps {
  onClose: () => void;
  onAddCredits: (sizeKey: string, amount: number) => void;
}

export const PurchaseCreditsModal: React.FC<PurchaseCreditsModalProps> = ({
  onClose,
  onAddCredits,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("20_std");
  const [selectedPack, setSelectedPack] = useState<number>(25);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const packs = [
    { credits: 10, price: '$49', popular: false },
    { credits: 25, price: '$99', popular: true },
    { credits: 100, price: '$349', popular: false },
  ];

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      onAddCredits(selectedSize, selectedPack);
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e2e2e7] text-[#1a1c1f]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#3d0eb4] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
            </div>
            <h2 className="text-lg font-bold">Purchase Inspection Credits</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3f3f8] hover:bg-[#e2e2e7] flex items-center justify-center text-[#494456]"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {success ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h3 className="text-xl font-bold text-emerald-800">Credits Added!</h3>
            <p className="text-sm text-[#494456]">
              +{selectedPack} credits successfully deposited to your account.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Target Container Tier */}
            <div>
              <label className="block text-xs font-bold text-[#494456] uppercase tracking-wider mb-2">
                Container Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: '20_std', label: "20' STD" },
                  { key: '40_std', label: "40' STD" },
                  { key: '40_hc', label: "40' HC" },
                  { key: '45_hc', label: "45' HC" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedSize(item.key)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      selectedSize === item.key
                        ? 'bg-[#3d0eb4] text-white border-[#3d0eb4] shadow-sm'
                        : 'bg-[#f3f3f8] text-[#1a1c1f] border-transparent hover:border-[#cbc3d9]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Credit Bundles */}
            <div>
              <label className="block text-xs font-bold text-[#494456] uppercase tracking-wider mb-2">
                Select Package
              </label>
              <div className="space-y-2">
                {packs.map((pack) => (
                  <div
                    key={pack.credits}
                    onClick={() => setSelectedPack(pack.credits)}
                    className={`relative p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedPack === pack.credits
                        ? 'border-[#3d0eb4] bg-purple-50/50 shadow-sm'
                        : 'border-[#e2e2e7] hover:border-[#cbc3d9] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPack === pack.credits
                            ? 'border-[#3d0eb4] bg-[#3d0eb4]'
                            : 'border-[#7a7488]'
                        }`}
                      >
                        {selectedPack === pack.credits && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#1a1c1f]">{pack.credits} Processing Credits</p>
                        <p className="text-xs text-[#494456]">Edge AI validation license</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-base font-extrabold text-[#3d0eb4]">{pack.price}</span>
                      {pack.popular && (
                        <span className="block text-[9px] uppercase font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                          Best Value
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill summary */}
            <div className="p-3 bg-[#f9f9fe] rounded-xl border border-[#e2e2e7] flex items-center justify-between text-xs text-[#494456]">
              <span>Billed to terminal account:</span>
              <span className="font-mono font-bold text-[#1a1c1f]">PORT-LB-8821</span>
            </div>

            {/* Purchase CTA */}
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-[#3d0eb4] to-[#5535cb] text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  <span>Authorizing Ledger...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span>Confirm Purchase (+{selectedPack} Credits)</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
