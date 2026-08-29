import { LockKeyhole, ShieldCheck } from "lucide-react";
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
      <section className="premium-card relative z-10 w-full max-w-xl overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        {message && <div className="relative mb-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-300">{message}</div>}
        <div className="relative mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white shadow-glow"><LockKeyhole /></div>
        <p className="relative text-xs font-bold uppercase tracking-[0.24em] text-primary">Secure access</p>
        <h1 className="relative mt-3 text-4xl font-bold tracking-tight text-primaryText">Admin Login</h1>
        <p className="relative mt-3 leading-7 text-secondaryText">Use the admin account to manage pages, content status, courses, jobs, resources, and platform data.</p>
        <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-secondaryText">Username / Email<input value={email} onChange={(event) => setEmail(event.target.value)} className="field" /></label>
          <label className="grid gap-2 text-sm font-bold text-secondaryText">Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="field" /></label>
          <button className="btn-primary mt-2 justify-center">
            <ShieldCheck className="h-4 w-4" /> Login
          </button>
        </form>
        <p className="mt-5 text-xs text-muted">Demo: admin@newwebsite.dev / cyber-admin</p>
      </section>
    </div>
  );
}
