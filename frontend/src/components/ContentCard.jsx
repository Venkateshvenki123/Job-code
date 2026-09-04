export default function ContentCard({ title, description, meta, action = "View", icon: Icon }) {
  return (
    <article className="premium-card group overflow-hidden p-5">
      {Icon && <span className="icon-3d mb-5 h-12 w-12 text-neon-green transition group-hover:-translate-y-1"><Icon className="h-5 w-5" /></span>}
      {meta && <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-neon-cyan">{meta}</p>}
      <h3 className="text-xl font-black tracking-tight text-primaryText">{title}</h3>
      <p className="mt-3 min-h-16 text-sm leading-7 text-soft-gray">{description}</p>
      <button className="btn-secondary mt-5 px-4 py-2 text-sm">
        {action}
      </button>
    </article>
  );
}
