export default function ContentCard({ title, description, meta, action = "View", icon: Icon }) {
  return (
    <article className="glass group rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-neon-green/50 hover:shadow-[0_0_40px_rgba(57,255,20,.12)]">
      {Icon && <Icon className="mb-4 h-9 w-9 text-neon-green" />}
      {meta && <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-neon-cyan">{meta}</p>}
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-3 min-h-16 text-sm leading-7 text-soft-gray">{description}</p>
      <button className="mt-5 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2 text-sm font-black text-white transition group-hover:border-neon-green group-hover:bg-neon-green/15">
        {action}
      </button>
    </article>
  );
}