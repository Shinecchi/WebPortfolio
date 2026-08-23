// Deterministic per-item gradient angle so placeholder thumbnails aren't all
// identical, without needing real image assets for every item.
export function gradientAngleFor(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 360;
  }
  return hash;
}
