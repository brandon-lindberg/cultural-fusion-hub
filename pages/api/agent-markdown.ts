import type { NextApiRequest, NextApiResponse } from 'next';
import { renderAgentMarkdown } from '../../utils/agentMarkdown';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    res.status(405).end();
    return;
  }

  const forwardedPath = req.headers['x-agent-original-path'];
  const requestPath =
    (Array.isArray(forwardedPath) ? forwardedPath[0] : forwardedPath) ||
    (Array.isArray(req.query.path) ? req.query.path[0] : req.query.path) ||
    '/';
  const result = renderAgentMarkdown(requestPath);

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Vary', 'Accept');
  res.setHeader('Content-Signal', 'ai-train=no, search=yes, ai-input=yes');
  res.setHeader(
    'Cache-Control',
    'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
  );

  if (!result) {
    res.status(404).send('# Not found\n');
    return;
  }

  res.setHeader('Content-Language', result.locale);
  res.setHeader(
    'X-Markdown-Tokens',
    String(Math.ceil(result.markdown.length / 4)),
  );
  res.status(200);

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  res.send(result.markdown);
}
