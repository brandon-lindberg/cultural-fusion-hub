// Lightweight no-op rate limiter wrapper for Next.js API routes and Netlify runtime.
// This avoids Express middleware incompatibilities in serverless environments.
// Signature mirrors Express-style middleware usage: (req, res, next) => void
export default function rateLimiter(
  _req: unknown,
  _res: unknown,
  next: () => void,
): void {
  next();
}
