import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featuredWork = [
  {
    id: 1,
    title: "Silk & Sculpt",
    category: "Hairstyle",
    beforeImage: "/gallery/hairstyle-before.jpg",
    afterImage: "/gallery/hairstyle-after.jpg",
  },
  {
    id: 2,
    title: "Luxury Makeup",
    category: "Makeup",
    beforeImage: "/gallery/makeup-before.jpg",
    afterImage: "/gallery/makeup-after.jpg",
  },
  {
    id: 3,
    title: "Elegant Henna Art",
    category: "Henna Design",
    beforeImage: "/gallery/henna-before.jpg",
    afterImage: "/gallery/henna-after.jpg",
  },
  {
    id: 4,
    title: "Bridal Transformation",
    category: "Bridal Service",
    beforeImage: "/gallery/bridal-before.jpg",
    afterImage: "/gallery/bridal-after.jpg",
  },
];

export default function GalleryPreview() {
  return (
    <section className="bg-[#121212] px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-[#D4AF7A]">
              Real transformations
            </p>
            <h2 className="mt-4 text-4xl font-light md:text-5xl">
              Beauty, Revealed
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
              Explore our signature work across hairstyle, makeup, henna design,
              and bridal services.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex w-fit items-center gap-2 border border-[#D4AF7A] px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-[#D4AF7A] transition hover:bg-[#D4AF7A] hover:text-[#121212]"
          >
            View full gallery <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredWork.map((item) => (
            <article key={item.id} className="group overflow-hidden bg-[#1a1a1a]">
              <div className="grid grid-cols-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.beforeImage}
                    alt={`${item.title} before`}
                    fill
                    sizes="(max-width: 640px) 50vw, 180px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 bg-black/70 px-2 py-1 text-[8px] uppercase tracking-wider">
                    Before
                  </span>
                </div>

                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.afterImage}
                    alt={`${item.title} after`}
                    fill
                    sizes="(max-width: 640px) 50vw, 180px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 bg-[#D4AF7A] px-2 py-1 text-[8px] uppercase tracking-wider text-[#121212]">
                    After
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF7A]">
                  {item.category}
                </p>
                <h3 className="mt-2 text-lg font-light">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}