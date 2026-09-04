export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="page-enter glass relative overflow-hidden rounded-[2.2rem] p-6 sm:p-8 lg:p-10">
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-neon-green/20 blur-3xl" />
      <div className="absolute bottom-8 right-12 h-16 w-16 rounded-3xl bg-gradient-to-br from-pink-300/40 to-violet-300/30 shadow-2xl rotate-12" />
      <div className="absolute left-8 top-8 h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-300/40 to-white/50 shadow-xl -rotate-12" />
      <p className="relative mb-3 text-xs font-black uppercase tracking-[0.24em] text-neon-green">{eyebrow}</p>
      <h1 className="relative max-w-4xl text-4xl font-black tracking-tight text-primaryText sm:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-soft-gray sm:text-lg">{description}</p>
      {children && <div className="mt-7">{children}</div>}
    </section>
  );
}
