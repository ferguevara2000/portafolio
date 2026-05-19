export function smoothScrollTo(id: string, duration = 800) {
  const section = document.getElementById(id);
  if (!section) return;

  const start = window.scrollY;
  const target = section.getBoundingClientRect().top + window.scrollY;
  const distance = target - start;
  let startTime: number | null = null;

  const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step)
}