import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="fixed top-6 left-6 z-50 flex items-center gap-3 group">
      <div className="w-10 h-10 border border-white/80 flex items-center justify-center">
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "15px",
            fontWeight: 700,
            color: "white",
            letterSpacing: "1px",
          }}
        >
          FG
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-white tracking-[3px] uppercase font-light leading-none">
          Fernando
        </span>
        <span className="text-xs text-white/40 tracking-[3px] uppercase font-light leading-none">
          Guevara
        </span>
      </div>
    </Link>
  );
}