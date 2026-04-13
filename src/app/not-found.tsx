import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] grid-dots">
      <div className="text-center px-6">
        <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-[#8a8a8a] mb-8">Esta página não existe — mas bom design sim.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E8787A] text-[#0a0a0a] font-semibold hover:bg-[#F2A5A7] transition-all duration-300">
          <span>&larr;</span><span>Voltar ao Portfólio</span>
        </Link>
      </div>
    </div>
  );
}
