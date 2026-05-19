export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer 
    className="relative w-full flex justify-center pb-32"
    style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
      
      <div className="flex items-center gap-2 text-xs text-white/20 font-mono">
        <span>© {year}</span>
        <span className="text-white/10">·</span>
        <span>Fernando Guevara</span>
        <span className="text-white/10">·</span>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}