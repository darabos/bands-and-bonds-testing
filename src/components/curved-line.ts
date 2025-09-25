export function curvedLineSegments(radius: number, scale: number, points: { x: number; y: number }[]): string[] {
  if (points.length < 2) {
    return [];
  }
  const segments: string[] = [`M ${points[0].x * scale} ${points[0].y * scale}`];
  for (let i = 1; i < points.length - 1; i++) {
    const { x: x0, y: y0 } = points[i - 1];
    const { x: x1, y: y1 } = points[i];
    const { x: x2, y: y2 } = points[i + 1];

    // Vector directions
    const dx1 = x1 - x0;
    const dy1 = y1 - y0;
    const dx2 = x2 - x1;
    const dy2 = y2 - y1;

    // Ensure this is an L-bend (90 degrees)
    if ((dx1 === 0 && dy2 === 0) || (dy1 === 0 && dx2 === 0)) {
      // Inward direction
      const len1 = Math.hypot(dx1, dy1);
      const len2 = Math.hypot(dx2, dy2);

      const r = Math.min(radius, len1 / 2, len2 / 2); // Avoid overshooting short segments

      // Point before the corner
      const xLine1 = x1 - Math.sign(dx1) * r;
      const yLine1 = y1 - Math.sign(dy1) * r;

      // Point after the corner
      const xLine2 = x1 + Math.sign(dx2) * r;
      const yLine2 = y1 + Math.sign(dy2) * r;

      // Draw line to corner - r
      segments.push(`L ${xLine1 * scale} ${yLine1 * scale}`);

      // Arc to corner + r
      const isClockwiseTurn = dx1 * dy2 - dy1 * dx2 > 0;
      segments.push(`A ${r * scale} ${r * scale} 0 0 ${isClockwiseTurn ? 1 : 0} ${xLine2 * scale} ${yLine2 * scale}`);
    } else {
      // Not a corner (could be straight)
      segments.push(`L ${x1 * scale} ${y1 * scale}`);
    }
  }

  // Final segment
  const last = points[points.length - 1];
  segments.push(`L ${last.x * scale} ${last.y * scale}`);
  return segments;
}

export function curvedLine(radius: number, scale: number, points: { x: number; y: number }[]): string {
  return curvedLineSegments(radius, scale, points).join(' ');
}
