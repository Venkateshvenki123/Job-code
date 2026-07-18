import PageHeader from "../components/PageHeader.jsx";
import { createItem, readRecord } from "../data/store.js";

export default function Contact() {
  const home = readRecord("homeContent");
  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    createItem("messages", Object.fromEntries(form.entries()));
    event.currentTarget.reset();
    alert("Message submitted successfully.");
  };
  return <div className="page-enter space-y-7"><PageHeader eyebrow="Contact Us" title="Contact Us" description="Send questions, partnership requests, hiring inquiries, or support messages." /><section className="grid gap-6 lg:grid-cols-[1fr_.8fr]"><form onSubmit={submit} className="glass grid gap-4 rounded-3xl p-6"><input name="name" required placeholder="Your name" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" /><input name="email" required type="email" placeholder="Email address" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" /><textarea name="message" required placeholder="Message" rows="6" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" /><button className="rounded-2xl bg-neon-green px-5 py-3 font-black text-cyber-bg">Send Message</button></form><div className="glass rounded-3xl p-6"><h2 className="text-3xl font-black">Contact Information</h2><p className="mt-4 text-soft-gray">Email: {home.contactEmail}</p><p className="mt-2 text-soft-gray">Social Media Links: {home.socials}</p></div></section></div>;
}