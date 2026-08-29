export default function ContentCard({ title, description, meta, action = "View", icon: Icon }) {
  return (
    <article className="premium-card group p-5">
      {Icon && <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-neon-green/12 text-neon-green"><Icon className="h-5 w-5" /></span>}
      {meta && <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-neon-cyan">{meta}</p>}
      <h3 className="text-xl font-black tracking-tight">{title}</h3>
      <p className="mt-3 min-h-16 text-sm leading-7 text-soft-gray">{description}</p>
      <button className="btn-secondary mt-5 px-4 py-2 text-sm">
        {action}
      </button>
    </article>
  );
}
