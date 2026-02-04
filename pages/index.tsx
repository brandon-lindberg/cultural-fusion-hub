import { useMemo } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Calendar from '../components/Calendar';
import ImageCarousel from '../components/Carousel';
import { useTranslation } from 'react-i18next';
import blogPosts from '../components/blog/entries.json';
import BlogCard from '../components/blog/blogCards';
import StructuredData from '../components/StructuredData';
import { GetStaticProps } from 'next';
import ensureLocale from '../utils/ensureLocale';
import rawEvents from '../components/events';
import { parseISO, startOfDay, isBefore, format } from 'date-fns';
import { ja as jaLocale, enUS } from 'date-fns/locale';

// Ensure blogPosts is always an array with robust error handling
const safeBlogPosts = (() => {
  try {
    if (!blogPosts) return [];
    if (!Array.isArray(blogPosts)) return [];
    return blogPosts;
  } catch (error) {
    console.error('Error processing blog posts:', error);
    return [];
  }
})();

const IndexPage = () => {
  const { t, i18n } = useTranslation();

  const latestTwoPosts = useMemo(() => {
    return [...safeBlogPosts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2);
  }, []);

  const upcomingEvents = useMemo(() => {
    const today = startOfDay(new Date());
    if (!Array.isArray(rawEvents)) return [];
    return rawEvents
      .filter((event) => event && typeof event.start === 'string')
      .map((event) => {
        const startDate = parseISO(event.start);
        return {
          ...event,
          startDate,
        };
      })
      .filter((event) => !isBefore(event.startDate, today))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .slice(0, 2);
  }, []);

  const dateLocale = i18n.language.startsWith('ja') ? jaLocale : enUS;

  const structuredData = {
    name: "Cultural Fusion Hub",
    description: t('greeting'),
    url: "https://culturalfusionhub.com/",
  };

  return (
    <Layout 
      title={t('home')}
      description={t('greeting')}
      image="/path-to-home-image.jpg"
    >
      <StructuredData
        type="WebPage"
        data={structuredData}
      />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent2/10 blur-3xl"></div>
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr,0.9fr] lg:py-20">
          <div className="space-y-6">
            <p className="reveal text-xs uppercase tracking-[0.4em] text-muted">
              {t('tagline')}
            </p>
            <h1 className="reveal reveal-delay-1 font-display text-4xl text-ink sm:text-5xl lg:text-6xl">
              Cultural Fusion Hub
            </h1>
            <p className="reveal reveal-delay-2 text-lg leading-relaxed text-muted">
              {t('greeting')}
            </p>
            <div className="reveal reveal-delay-3 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                {t('home-cta-primary')}
              </Link>
              <Link href="#events" className="btn-secondary">
                {t('home-cta-secondary')}
              </Link>
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="overflow-hidden rounded-3xl ring-1 ring-black/5 shadow-lg">
              <ImageCarousel />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="card-surface rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {t('home-highlight-one-title')}
                </p>
                <p className="mt-2 text-sm text-ink opacity-80">
                  {t('home-highlight-one-body')}
                </p>
              </div>
              <div className="card-surface rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {t('home-highlight-two-title')}
                </p>
                <p className="mt-2 text-sm text-ink opacity-80">
                  {t('home-highlight-two-body')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr,0.7fr]">
          <div className="card-surface rounded-3xl p-6 md:p-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-3xl text-ink">{t('events-calendar')}</h2>
              <p className="text-sm text-muted">{t('events-intro')}</p>
            </div>
            <div className="mt-6">
              <Calendar />
            </div>
            <div className="mt-6 rounded-2xl border border-black/5 bg-white/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-ink">{t('upcoming-events')}</h3>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-muted">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                    {t('event-type-meetup')}
                  </span>
                  <span className="rounded-full bg-black/5 px-3 py-1">
                    {t('event-type-workshop')}
                  </span>
                  <span className="rounded-full bg-black/5 px-3 py-1">
                    {t('event-type-live')}
                  </span>
                </div>
              </div>
              {upcomingEvents.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={`${event.title}-${event.start}`}
                      className="rounded-xl border border-black/5 bg-white/80 p-3"
                    >
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span>{format(event.startDate, 'PPP', { locale: dateLocale })}</span>
                        <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-semibold text-accent">
                          {event.stream ? t('event-type-live') : t('event-type-meetup')}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-ink">{event.title}</p>
                      <p className="mt-1 text-xs text-muted">{event.location}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 space-y-3 text-sm text-muted">
                  <p>{t('no-upcoming-events')}</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.instagram.com/culturalfusionhub/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs"
                    >
                      {t('follow-us')}
                    </a>
                    <Link href="/contact" className="btn-ghost text-xs">
                      {t('contact')}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="card-surface rounded-3xl p-6">
              <h2 className="font-display text-2xl text-ink">{t('latest-posts')}</h2>
              <p className="mt-2 text-sm text-muted">{t('latest-posts-intro')}</p>
              <div className="mt-6 flex flex-col gap-4">
                {latestTwoPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    date={post.date}
                    author={post.author}
                    entry={post.entry}
                    tags={post.tags}
                    onTagClick={() => {}}
                    id={post.id}
                  />
                ))}
              </div>
              <div className="mt-6">
                <Link href="/blog" className="btn-secondary">
                  {t('view-all-posts')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  await ensureLocale(locale, defaultLocale);
  return { props: {} };
};
