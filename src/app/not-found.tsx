import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background grid-pattern">
      <div className="text-center px-6">
        <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-muted mb-8">
          This page doesn&apos;t exist &mdash; but great design does.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-background font-semibold hover:bg-accent/90 transition-all duration-300"
        >
          <span>&larr;</span>
          <span>Back to Portfolio</span>
        </Link>
      </div>
    </div>
  );
}
