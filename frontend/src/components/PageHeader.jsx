export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="page-enter glass relative overflow-hidden rounded-[1.6rem] p-6 sm:p-8 lg:p-10">
      <div className="absolute right-6 top-6 h-28 w-28 rounded-full border border-white/10 bg-neon-green/10 blur-2xl" />
      <p className="relative mb-3 text-xs font-black uppercase tracking-[0.24em] text-neon-green">{eyebrow}</p>
      <h1 className="relative max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-soft-gray sm:text-lg">{description}</p>
      {children && <div className="mt-7">{children}</div>}
    </section>
  );
}
