// Exact boundaries of the two disconnected shapes in the Learning Hub mark.
export const logoContours = [
  { path: 'M10 10h6v12h10v5H10V10Z', points: [[10,10],[16,10],[16,22],[26,22],[26,27],[10,27],[10,10]] },
  { path: 'M20 10h6v8h-6v-8Z', points: [[20,10],[26,10],[26,18],[20,18],[20,10]] },
].map(contour => {
  let length = 0;
  const edges = contour.points.slice(1).map((end, index) => {
    const start = contour.points[index];
    const size = Math.hypot(end[0]-start[0], end[1]-start[1]);
    const edge = { start, end, size, offset: length };
    length += size;
    return edge;
  });
  return { ...contour, edges, length };
});
export const logoPath = logoContours.map(contour => contour.path).join('');
export function smootherstep(value) {
  const t = Math.max(0, Math.min(1, value));
  return Math.max(0, Math.min(1, t*t*t*(t*(6*t-15)+10)));
}
export function traceAtProgress(progress, length, trailFraction = .18) {
  if (!Number.isFinite(progress) || !Number.isFinite(length) || length <= 0 || !(trailFraction > 0 && trailFraction < 1)) throw new RangeError('Invalid logo trace timing.');
  const p = Math.max(0, Math.min(1, progress));
  return { head: length*smootherstep(p/(1-trailFraction)), tail: length*smootherstep((p-trailFraction)/(1-trailFraction)) };
}
