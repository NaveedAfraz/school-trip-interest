'use client';

import { useState, useTransition } from 'react';
import { loginAction } from '@/features/admin/actions/authActions';
import {
  Loader2,
  AlertCircle,
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  BarChart3,
  Users,
  Compass,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function LoginForm() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleFillDemo() {
    setEmail('admin@mblearning.com');
    setPassword('AdminSecurePass2026!');
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    startTransition(async () => {
      const res = await loginAction(formData);
      if (!res.success) {
        setError(res.message);
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071e19] p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md lg:max-w-4xl bg-white lg:bg-[#0c2b24] border border-[#1a4239] rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#0c2b24] via-[#08221c] to-[#041713] p-8 sm:p-10 text-white flex-col justify-between border-r border-[#1a4239]">
          <div>
            
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-900 via-teal-800 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-teal-950/40 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 text-emerald-200" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">MB Learning</span>
            </Link>

            <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full mt-5 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Coordinator & Admin Suite</span>
            </div>

            <h1 className="text-2xl font-extrabold mt-6 leading-snug text-white">
              Trip Registrations Management
            </h1>
            <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
              Restricted portal for MB Learning founders, trip directors, and educational travel coordinators.
            </p>

            <div className="space-y-3.5 mt-8">
              {[
                { icon: BarChart3, text: 'Live KPI stats & total student aggregations' },
                { icon: Compass, text: 'Filter submissions across 3 global trip themes' },
                { icon: Users, text: 'Instant search across teacher names & schools' },
                { icon: CheckCircle, text: 'One-click CSV export for offline planning' },
              ].map(({ icon: Icon, text }, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-emerald-100/90">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-200/60">
            <span>Founders' Office • Gachibowli</span>
            <span>Secured with RLS</span>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            
            <div className="lg:hidden flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-[#0f766e] flex items-center justify-center text-white shadow-xs">
                  <GraduationCap className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 text-base leading-tight block">
                    MB Learning
                  </span>
                  <span className="text-[10px] text-[#0f766e] font-bold block leading-none">
                    Admin Portal
                  </span>
                </div>
              </Link>

              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0f766e] bg-[#f0fdfa] border border-[#ccfbf1] px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3 h-3 text-[#0f766e]" />
                <span>Restricted</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Sign In</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter authorized staff credentials to enter.
                </p>
              </div>

              <button
                type="button"
                onClick={handleFillDemo}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#0f766e] hover:text-[#115e59] bg-[#f0fdfa] hover:bg-[#ccfbf1] active:bg-[#99f6e4] px-3 py-1.5 rounded-xl transition-all border border-[#ccfbf1] cursor-pointer shadow-2xs self-start sm:self-auto"
                title="Auto-fill sample admin credentials for review"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Fill Demo Admin</span>
              </button>
            </div>

            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 text-xs font-medium p-4 rounded-2xl mb-5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Authentication failed</p>
                  <p className="mt-0.5 text-red-700">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
              
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Staff Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@mblearning.com"
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 sm:py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:border-transparent transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-10 py-2.5 sm:py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:border-transparent transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 bg-[#0f766e] hover:bg-[#115e59] active:bg-[#042f2e] disabled:opacity-60 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg shadow-teal-950/25 cursor-pointer mt-3"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span className="text-white font-bold">Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span className="text-white font-bold">Enter Admin Dashboard</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
            <Link
              href="/"
              className="text-slate-500 hover:text-[#0f766e] font-semibold transition-colors flex items-center gap-1"
            >
              ← Back to Public Website
            </Link>
            <span className="text-slate-400 text-[11px]">Supabase Auth • SSL Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
