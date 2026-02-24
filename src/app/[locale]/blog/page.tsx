import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Blog | NexaFlow AI",
    description:
      locale === "es"
        ? "Articulos sobre IA aplicada a negocios, automatizacion y transformacion digital"
        : "Articles about AI applied to business, automation and digital transformation",
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getBlogPosts(locale);

  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Blog</h1>
          <p className="mt-4 text-lg text-foreground-secondary">
            {locale === "es"
              ? "Insights sobre IA aplicada a negocios"
              : "Insights on AI applied to business"}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-foreground-muted">
            {locale === "es" ? "Proximamente..." : "Coming soon..."}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}` as any}>
                <Card className="flex h-full flex-col">
                  <Badge variant="primary" className="mb-3 self-start">
                    {post.category}
                  </Badge>
                  <h2 className="mb-2 text-xl font-semibold text-foreground">
                    {post.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm text-foreground-secondary">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-foreground-muted">
                    <span>{post.author}</span>
                    <time>{new Date(post.date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}</time>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
