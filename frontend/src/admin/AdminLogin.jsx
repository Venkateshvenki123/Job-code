import { LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { consumeLogoutMessage, loginAdmin } from "./auth.js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("admin@newwebsite.dev");
  const [password, setPassword] = useState("cyber-admin");

  useEffect(() => {
    setMessage(consumeLogoutMessage() || "");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    loginAdmin();
    navigate(location.state?.from || "/admin", { replace: true });
  };

  return (
    <div className="cyber-shell grid min-h-screen place-items-center px-4 py-10">
      <div className="cyber-grid" />
      <section className="glass relative z-10 w-full max-w-xl rounded-3xl p-6 sm:p-8">
        {message && <div className="mb-5 rounded-2xl border border-neon-green/30 bg-neon-green/10 px-4 py-3 text-sm font-bold text-neon-green">{message}</div>}
        <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-neon-green text-cyber-bg"><LockKeyhole /></div>
        <p className="text-xs font-black uppercase tracking-[0.24em] text-neon-green">Secure access</p>
        <h1 className="mt-3 text-4xl font-black">Admin Login</h1>
        <p className="mt-3 text-soft-gray">Use the admin account to manage pages, content status, courses, jobs, resources, and platform data.</p>
        <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
          <label className="grid gap-2 text-sm font-black text-soft-gray">Username / Email<input value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-neon-green" /></label>
          <label className="grid gap-2 text-sm font-black text-soft-gray">Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="min-h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-neon-green" /></label>
          <button className="mt-2 rounded-2xl bg-gradient-to-r from-neon-green to-neon-cyan px-5 py-3 font-black text-cyber-bg">Login</button>
        </form>
        <p className="mt-5 text-xs text-soft-gray">Demo: admin@newwebsite.dev / cyber-admin</p>
      </section>
    </div>
  );
}