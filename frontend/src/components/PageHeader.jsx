export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="page-enter glass rounded-3xl p-6 sm:p-8 lg:p-10">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-neon-green">{eyebrow}</p>
      <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-soft-gray sm:text-lg">{description}</p>
      {children && <div className="mt-7">{children}</div>}
    </section>
  );
}