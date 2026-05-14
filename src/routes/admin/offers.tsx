import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Tag,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/offers')({
  component: AdminOffers,
});

const initialOffers = [
  {
    id: '1',
    title: 'New Arrival Special',
    subtitle: 'iPhone 15 Series Now Available',
    badge: 'New',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&h=200&fit=crop'
  },
  {
    id: '2',
    title: 'Samsung Fest',
    subtitle: 'Up to 15% off on S24 Series',
    badge: '-15%',
    status: 'active',
    image: 'https://images.unsplash.com/photo-17072314590ef6-92f58e244837?w=400&h=200&fit=crop'
  },
  {
    id: '3',
    title: 'Weekend Flash Sale',
    subtitle: 'Accessories at best prices',
    badge: 'Limited',
    status: 'disabled',
    image: 'https://images.unsplash.com/photo-1588423770674-f2855ee476e7?w=400&h=200&fit=crop'
  }
];

function AdminOffers() {
  const [offers, setOffers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch offers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('offers')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Offer ${!currentStatus ? 'activated' : 'disabled'} successfully`);
      fetchOffers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update offer');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    try {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Offer deleted successfully');
      fetchOffers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete offer');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#001C4B]">Promotional Offers</h1>
          <p className="text-slate-500 mt-1">Manage banners and special deals shown on the homepage.</p>
        </div>
        <button
          onClick={() => { setSelectedOffer(null); setIsModalOpen(true); }}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-5 h-5" />
          Create New Offer
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full py-20 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Fetching offers...</p>
          </div>
        ) : offers.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center gap-4 text-center">
            <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto">
              <ImageIcon className="w-10 h-10" />
            </div>
            <div>
              <p className="text-lg font-bold text-[#001C4B]">No active offers</p>
              <p className="text-sm text-slate-400">Click the button above to create your first promotion.</p>
            </div>
          </div>
        ) : (
          offers.map((offer) => (
            <div key={offer.id} className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-lg shadow-blue-900/5 border border-slate-100 transition-all hover:shadow-2xl hover:shadow-blue-900/10">
              {/* Image Preview */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image_url}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001C4B]/80 via-transparent to-transparent"></div>

                {offer.discount_badge && (
                  <div className="absolute top-4 left-4 bg-cyan-400 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    {offer.discount_badge}
                  </div>
                )}

                <button
                  onClick={() => handleToggleStatus(offer.id, offer.is_active)}
                  className="absolute top-4 right-4"
                >
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${offer.is_active
                      ? 'bg-emerald-500/20 text-emerald-300 backdrop-blur-md border border-emerald-500/30'
                      : 'bg-slate-500/20 text-slate-300 backdrop-blur-md border border-slate-500/30'
                    }`}>
                    {offer.is_active ? 'Active' : 'Disabled'}
                  </span>
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <h3 className="text-xl font-bold leading-tight">{offer.title}</h3>
                  <p className="text-cyan-400 text-xs font-medium mt-1 uppercase tracking-wider">{offer.subtitle}</p>
                </div>
              </div>

              <div className="p-6 flex items-center justify-between bg-white">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Target Link</span>
                  <span className="text-xs font-bold text-[#001C4B] truncate max-w-[150px]">{offer.target_link || '/'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setSelectedOffer(offer); setIsModalOpen(true); }}
                    className="p-3 bg-slate-50 text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 rounded-2xl transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(offer.id)}
                    className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <OfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offer={selectedOffer}
        onSuccess={fetchOffers}
      />
    </div>
  );
}

function OfferModal({ isOpen, onClose, offer, onSuccess }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'New Mobile',
    discount_badge: '',
    discount_text: '',
    end_date: '',
    target_link: '',
    image_url: '' as any,
    is_active: true
  });

  const categories = [
    "New Mobile", "Used Mobile", "Tablet", "iPod", "Watch",
    "Power Bank", "Hand Free", "Headphones", "Buds", "AirPods",
    "Data Cable", "Adapter", "Games", "Covers", "Glass",
    "3D Sheets", "Speakers", "Mic", "Lights", "Holders"
  ];

  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title || '',
        subtitle: offer.subtitle || '',
        category: offer.category || 'New Mobile',
        discount_badge: offer.discount_badge || '',
        discount_text: offer.discount_text || '',
        end_date: offer.end_date ? new Date(offer.end_date).toISOString().slice(0, 16) : '',
        target_link: offer.target_link || '',
        image_url: offer.image_url || '',
        is_active: offer.is_active ?? true
      });
    } else {
      setFormData({
        title: '', subtitle: '', category: 'New Mobile', discount_badge: '', discount_text: '', end_date: '', target_link: '', image_url: '', is_active: true
      });
    }
  }, [offer, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalImageUrl = formData.image_url;

      if (formData.image_url instanceof File) {
        const file = formData.image_url;
        const fileExt = file.name.split('.').pop();
        const fileName = `offer-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('shop-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('shop-images')
          .getPublicUrl(fileName);

        finalImageUrl = publicUrl;
      }

      const payload = { ...formData, image_url: finalImageUrl };

      const { error } = offer
        ? await supabase.from('offers').update(payload).eq('id', offer.id)
        : await supabase.from('offers').insert([payload]);

      if (error) throw error;

      toast.success(`Offer ${offer ? 'updated' : 'created'} successfully!`);
      onSuccess();
      onClose();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#000B29]/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95">
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-2xl font-black text-[#001C4B]">{offer ? 'Edit Offer' : 'New Offer'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl"><Plus className="w-6 h-6 rotate-45" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="space-y-4">
            <div className="relative h-40 bg-slate-50 rounded-3xl overflow-hidden group cursor-pointer border-2 border-dashed border-slate-200 hover:border-cyan-400 transition-all">
              {formData.image_url ? (
                <img
                  src={formData.image_url instanceof File ? URL.createObjectURL(formData.image_url) : formData.image_url}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300">
                  <Plus className="w-8 h-8" />
                  <span className="text-xs font-bold uppercase tracking-widest mt-2">Upload Banner</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && setFormData({ ...formData, image_url: e.target.files[0] })}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <input
              placeholder="Offer Title (e.g. Premium Smartphones)"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Discount Text (e.g. 30% OFF)"
                value={formData.discount_text}
                onChange={e => setFormData({ ...formData, discount_text: e.target.value })}
                className="px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold outline-none"
              />
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Sale End Date</label>
                <input
                  type="datetime-local"
                  value={formData.end_date}
                  onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                  className="px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Subtitle" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} className="px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium outline-none" />
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold outline-none appearance-none">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Badge (e.g. -20%)" value={formData.discount_badge} onChange={e => setFormData({ ...formData, discount_badge: e.target.value })} className="px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold outline-none" />
              <input placeholder="Target Link" value={formData.target_link} onChange={e => setFormData({ ...formData, target_link: e.target.value })} className="px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold outline-none" />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full shadow-lg flex justify-center items-center gap-2">
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : offer ? 'Update Offer' : 'Create Offer'}
          </button>
        </form>
      </div>
    </div>
  );
}
