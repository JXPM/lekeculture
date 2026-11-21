import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/lib/content';
import { ARTICLE_BODIES } from '@/lib/article-bodies';
import { IMAGES } from '@/lib/images';
import { ArticleView } from '@/components/ArticleView';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.title.fr,
    description: a.excerpt.fr,
    openGraph: {
      title: a.title.fr,
      description: a.excerpt.fr,
      type: 'article',
      images: [IMAGES[a.image].url],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((x) => x.slug === slug);
  if (!article) notFound();

  const body = ARTICLE_BODIES[slug];
  const sameCategory = ARTICLES.filter((x) => x.slug !== slug && x.category === article.category);
  const others = ARTICLES.filter((x) => x.slug !== slug && x.category !== article.category);
  const related = [...sameCategory, ...others].slice(0, 3);

  return <ArticleView article={article} body={body} related={related} />;
}
