import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ArrowUpRight, Globe, Mail, Loader2, CheckCircle2, MapPin, Phone, ShieldCheck, Zap, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const flat = data.data.flatMap(cat => [cat, ...(cat.children || [])]);
          const unique = Array.from(new Map(flat.map(item => [item.slug, item])).values())
            .filter(cat => 
              !cat.name.toLowerCase().includes('laptop') && 
              !cat.slug.toLowerCase().includes('laptop') &&
              !cat.name.toLowerCase().includes('chromebook')
            )
            .slice(0, 6);
          setCategories(unique);
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white text-slate-900 pt-24 pb-12 font-urbanist relative overflow-hidden border-t border-slate-100">
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- TOP ROW: BRAND & NEWSLETTER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5 space-y-10">
            <Link to="/" className="flex items-center gap-6 group">
              <img src="/logo/MYPRINTERMAN.png" alt="MYPRINTERMAN" className="h-16 w-auto object-contain" />
              
             
            </Link>
            
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-md border-l-2 border-slate-100 pl-8">
              We provide the best printing tools and professional help to make your workplace run perfectly every day.
            </p>

           
          </div>

          <div className="lg:col-span-7 flex items-center">
            <div className="w-full bg-slate-900 p-8 relative overflow-hidden">
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-[9px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2">Newsletter</h4>
                    <h3 className="text-2xl font-black text-white leading-tight tracking-tight flex flex-col">
                      <span className="capitalize">Join Our</span>
                      <span className="italic text-blue-400 capitalize">Updates.</span>
                    </h3>
                  </div>
                  <form onSubmit={handleSubscribe} className="relative">
                    <input
                      required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email Address"
                      className="w-full bg-white/10 border border-white/10 rounded-none py-3.5 px-6 text-xs focus:outline-none focus:bg-white focus:text-slate-900 transition-all font-bold placeholder:text-white/30"
                    />
                    <button
                      disabled={loading}
                      className="w-full mt-3 py-3 bg-blue-600 text-white transition-all font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-slate-900 shadow-xl"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16} /> : "Subscribe"}
                    </button>
                  </form>
               </div>
            </div>
          </div>
        </div>

        {/* --- LINKS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 mb-24 py-20 border-t border-slate-100">
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10">Collections</h4>
            <ul className="space-y-5">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 hover:text-blue-600 transition-colors text-[14px] font-black capitalize tracking-tight flex items-center gap-4 group">
                    <div className="h-1 w-1 bg-slate-200 group-hover:bg-blue-600" />
                    {cat.name.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10">Support</h4>
            <ul className="space-y-5">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Track Orders', path: '/orders' },
                { name: 'FAQs', path: '/faq' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-blue-600 transition-colors text-[14px] font-black capitalize tracking-tight flex items-center gap-4 group">
                    <div className="h-1 w-1 bg-slate-200 group-hover:bg-blue-600" />
                    {item.name.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10">Policies</h4>
            <ul className="space-y-5">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                { name: 'Return Policy', path: '/return-policy' },
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Cookie Policy', path: '/cookie-policy' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-blue-600 transition-colors text-[14px] font-black capitalize tracking-tight flex items-center gap-4 group">
                    <div className="h-1 w-1 bg-slate-200 group-hover:bg-blue-600" />
                    {item.name.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10">Contact</h4>
            <div className="space-y-8">
               <div className="flex items-start gap-5">
                  <div className="h-12 w-12 bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <span className="text-[14px] font-black text-slate-500 leading-relaxed capitalize tracking-tight">
                    4664 Cleveland Ave <br /> Columbus, OH 43231, USA
                  </span>
               </div>
               <div className="flex items-center gap-5">
                  <div className="h-12 w-12 bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                    <Mail size={20} className="text-blue-600" />
                  </div>
                  <span className="text-[14px] font-black text-slate-500 tracking-tight lowercase">info@myprinterman.com</span>
               </div>
            </div>
          </div>
        </div>

        {/* --- MAP --- */}
        <div className="w-full h-[300px] mb-16 grayscale border border-slate-100">
           <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3055.6728464654876!2d-82.952952423455!3d40.051515971499895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8838890252554e8b%3A0xe75868c2217c2a7e!2s4664%20Cleveland%20Ave%2C%20Columbus%2C%20OH%2043231%2C%20USA!5e0!3m2!1sen!2sin!4v1709664000000!5m2!1sen!2sin" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">
            <span>© 2026 MYPRINTERMAN | ALL RIGHTS RESERVED.</span>
            <span className="hidden md:block h-4 w-px bg-slate-100" />
          
          </div>

          <div className="flex items-center gap-10 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Verified Merchant</span>
             </div>
             <div className="text-blue-600 italic font-black text-2xl">PayPal</div>
          </div>
        </div>

        {/* --- DISCLAIMER --- */}
        <div className="mt-12 pt-8 text-center border-t border-slate-100">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            Disclaimer - For Informational only. No software installation or distribution.
          </p>
        </div>

      </div>
    </footer>
  );
}
