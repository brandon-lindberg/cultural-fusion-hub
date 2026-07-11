import blogPosts from '../components/blog/entries.json';
import en from '../public/locales/en/translation.json';
import ja from '../public/locales/ja/translation.json';

type Locale = 'en' | 'ja';
type Dictionary = Record<string, string>;

const SITE_URL = 'https://culturalfusionhub.com';
const dictionaries: Record<Locale, Dictionary> = { en, ja };

const stripHtml = (value: string) =>
  value
    .replace(/<br\s*\/?\s*>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const yamlValue = (value: string) => JSON.stringify(value);

const localizedHref = (locale: Locale, path: string) =>
  `${locale === 'en' ? '/en' : ''}${path === '/' ? '' : path}` || '/';

const frontmatter = (
  title: string,
  description: string,
  canonical: string,
  locale: Locale,
) =>
  [
    '---',
    `title: ${yamlValue(title)}`,
    `description: ${yamlValue(description)}`,
    `canonical: ${yamlValue(canonical)}`,
    `language: ${yamlValue(locale)}`,
    '---',
    '',
  ].join('\n');

const primaryLinks = (locale: Locale) => {
  const labels =
    locale === 'ja'
      ? {
          home: 'ホーム',
          about: 'ミッション',
          blog: 'ブログ',
          profile: 'プロフィール',
          contact: 'お問い合わせ',
        }
      : {
          home: 'Home',
          about: 'Mission',
          blog: 'Blog',
          profile: 'Facilitators',
          contact: 'Contact',
        };

  return [
    `[${labels.home}](${localizedHref(locale, '/')})`,
    `[${labels.about}](${localizedHref(locale, '/about')})`,
    `[${labels.blog}](${localizedHref(locale, '/blog')})`,
    `[${labels.profile}](${localizedHref(locale, '/profile')})`,
    `[${labels.contact}](${localizedHref(locale, '/contact')})`,
  ].join(' · ');
};

const pageShell = (
  locale: Locale,
  path: string,
  title: string,
  description: string,
  body: string,
) => {
  const canonical = `${SITE_URL}${localizedHref(locale, path)}`;
  return `${frontmatter(title, description, canonical, locale)}# ${title}\n\n${description}\n\n${body}\n\n---\n\n${primaryLinks(locale)}\n`;
};

const renderHome = (locale: Locale, t: Dictionary) => {
  const postLinks = blogPosts
    .map(
      (post) =>
        `- [${post.title}](${localizedHref(locale, `/blog/${post.id}`)}) — ${post.date.slice(0, 10)}`,
    )
    .join('\n');

  const body = [
    `## ${t['home-highlight-one-title']}\n\n${t['home-highlight-one-body']}`,
    `## ${t['home-highlight-two-title']}\n\n${t['home-highlight-two-body']}`,
    `## ${t['latest-posts']}\n\n${postLinks}`,
    `## ${t['upcoming-events']}\n\n${t['no-upcoming-events']}`,
  ].join('\n\n');

  return pageShell(locale, '/', 'Cultural Fusion Hub', t.greeting, body);
};

const renderAbout = (locale: Locale, t: Dictionary) => {
  const sections = [2, 3, 4, 5, 6, 7]
    .map(
      (number) =>
        `## ${t[`mission-statment-${number}-head`]}\n\n${t[`mission-statment-${number}`]}`,
    )
    .join('\n\n');

  return pageShell(
    locale,
    '/about',
    t.CFHmission,
    t['mission-statement-one'],
    sections,
  );
};

const renderBlogIndex = (locale: Locale, t: Dictionary) => {
  const posts = blogPosts
    .map((post) => {
      const excerpt = stripHtml(post.entry).replace(/\s+/g, ' ').slice(0, 240);
      return `## [${post.title}](${localizedHref(locale, `/blog/${post.id}`)})\n\n${post.date.slice(0, 10)} · ${post.author}\n\n${excerpt}${post.entry.length > 240 ? '…' : ''}`;
    })
    .join('\n\n');

  return pageShell(locale, '/blog', t.blog, t['blog-intro'], posts);
};

const renderBlogPost = (locale: Locale, id: string) => {
  const post = blogPosts.find((entry) => entry.id === id);
  if (!post) return null;

  const description = stripHtml(post.entry).replace(/\s+/g, ' ').slice(0, 160);
  const body = `Published: ${post.date.slice(0, 10)}  \nAuthor: ${post.author}\n\n${stripHtml(post.entry)}\n\nTags: ${post.tags.map((tag) => `\`${tag}\``).join(', ')}`;
  return pageShell(locale, `/blog/${id}`, post.title, description, body);
};

const renderProfile = (locale: Locale, t: Dictionary) => {
  const body = [
    `## Yuka Obikane\n\n${stripHtml(t['yuka-description'])}`,
    `## Saho Petersen\n\n${stripHtml(t['saho-description'])}`,
  ].join('\n\n');

  return pageShell(locale, '/profile', t.profile, t['profile-intro'], body);
};

const renderContact = (locale: Locale, t: Dictionary) => {
  const body = [
    `## ${t['contact-details']}`,
    `- ${t.email}: [culturalfusionhub@gmail.com](mailto:culturalfusionhub@gmail.com)`,
    `- Instagram: [@culturalfusionhub](https://www.instagram.com/culturalfusionhub/)`,
  ].join('\n\n');

  return pageShell(locale, '/contact', t.contact, t['contact-intro'], body);
};

export function renderAgentMarkdown(requestPath: string) {
  const cleanPath = `/${requestPath.split(/[?#]/, 1)[0].split('/').filter(Boolean).join('/')}`;
  const segments = cleanPath.split('/').filter(Boolean);
  const locale: Locale = segments[0] === 'en' ? 'en' : 'ja';
  const routeSegments = locale === 'en' ? segments.slice(1) : segments;
  const route = `/${routeSegments.join('/')}`;
  const normalizedRoute = route === '/' ? '/' : route.replace(/\/$/, '');
  const t = dictionaries[locale];

  if (normalizedRoute === '/')
    return { locale, markdown: renderHome(locale, t) };
  if (normalizedRoute === '/about')
    return { locale, markdown: renderAbout(locale, t) };
  if (normalizedRoute === '/blog')
    return { locale, markdown: renderBlogIndex(locale, t) };
  if (normalizedRoute === '/profile')
    return { locale, markdown: renderProfile(locale, t) };
  if (normalizedRoute === '/contact')
    return { locale, markdown: renderContact(locale, t) };
  if (routeSegments[0] === 'blog' && routeSegments.length === 2) {
    const markdown = renderBlogPost(locale, routeSegments[1]);
    return markdown ? { locale, markdown } : null;
  }

  return null;
}
