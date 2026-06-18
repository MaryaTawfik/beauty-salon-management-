export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-[#121212] text-white px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif tracking-wide text-[#D4AF7A]">
            The Luxury Experience
          </h2>
          <div className="w-20 h-[1px] bg-[#D4AF7A]/50" />
          <p className="text-gray-300 font-light leading-relaxed">
            Every visit to L'ÉLITE is structured as a bespoke ritual. From complimentary refreshments curated by master mixologists to meticulous consultations with master stylers, your time with us is entirely sacred.
          </p>
          <ul className="space-y-3 text-sm text-gray-400 font-light">
            <li className="flex items-center gap-3"><span className="text-[#D4AF7A]">✦</span> Award-winning Senior Stylists</li>
            <li className="flex items-center gap-3"><span className="text-[#D4AF7A]">✦</span> Fully Private Premium Care Booths</li>
            <li className="flex items-center gap-3"><span className="text-[#D4AF7A]">✦</span> Organic, High-End Product Lines</li>
          </ul>
        </div>
        <div className="relative aspect-[4/3] bg-zinc-900/50 border border-white/5 rounded flex items-center justify-center text-zinc-500 italic text-sm">
          [ Premium Salon Interior View ]
        </div>
      </div>
    </section>
  );
}