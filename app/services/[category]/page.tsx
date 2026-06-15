import { SERVICES_DATA } from "../../data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

// In Next.js 15, params is a Promise
interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  // Find the data for this specific category
  const categoryData = SERVICES_DATA.find((s) => s.slug === category);

  // If the user types a URL that doesn't exist (e.g., /services/pizza), show 404
  if (!categoryData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#121212] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="mb-16">
          <Link 
            href="/" 
            className="text-[#D4AF7A] text-sm uppercase tracking-widest mb-8 inline-block hover:opacity-70 transition-opacity"
          >
            ← Back to All Services
          </Link>
          <h1 className="text-white text-5xl md:text-7xl font-light italic mb-6">
            {categoryData.title}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            {categoryData.description}
          </p>
        </div>

        {/* Sub-Services List */}
        <div className="grid grid-cols-1 gap-4">
          {categoryData.subServices.map((sub) => (
            <Link 
              key={sub.id} 
              href={`/services/${category}/${sub.slug}`}
              className="group flex flex-col md:flex-row justify-between items-center p-8 border border-white/10 hover:border-[#D4AF7A]/50 transition-all duration-500 bg-[#1a1a1a]/50"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                {/* Small preview image */}
                <div className="relative w-24 h-24 overflow-hidden">
                   <Image 
                    src={sub.images[0]} 
                    alt={sub.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                   />
                </div>
                <div>
                  <h4 className="text-white text-2xl font-light mb-2">{sub.name}</h4>
                  <div className="flex items-center gap-4 text-white/40 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {sub.duration}
                    </span>
                    <span className="text-[#D4AF7A]">{sub.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF7A] flex items-center gap-2">
                View Details <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}