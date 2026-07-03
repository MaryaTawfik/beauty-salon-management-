// app/(auth)/layout.tsx
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-[#121212]">
      {/* Left Side: Cinematic Branding */}
      <div className="relative hidden lg:block overflow-hidden border-r border-white/5">
        <Image
          src="/images/auth-bg.jpg" // Use a high-end salon interior photo
          alt="Luxury Experience"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <Link href="/" className="mb-12">
             <h1 className="text-[#D4AF7A] text-4xl font-light italic tracking-tighter">
               The Salon
             </h1>
          </Link>
          <div className="max-w-md">
            <h2 className="text-[#D4AF7A] text-xs uppercase tracking-[0.4em] mb-4">Exclusive Access</h2>
            <p className="text-white text-3xl font-light italic leading-tight">
              True beauty begins the moment you decide to be yourself.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Content Area */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
           {children}
        </div>
      </div>
    </div>
  );
}