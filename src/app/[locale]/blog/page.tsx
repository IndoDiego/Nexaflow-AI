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
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-[var(--color-primary)]/10 px-4 py-1 text-sm font-semibold text-[var(--color-primary)]">
            Blog
          </span>
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Blog</h1>
          <p className="mt-4 text-lg text-foreground-secondary">
            {locale === "es"
              ? "Insights sobre IA aplicada a negocios"
              : "Insights on AI applied to business"}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-base text-foreground-muted">
            {locale === "es" ? "Pronto publicaremos contenido..." : "Content coming soon..."}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}` as any}>
                <Card className="flex h-full flex-col">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="primary">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-foreground-muted">
                      {new Date(post.date).toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <h2 className="mb-2 text-base font-bold text-foreground group-hover:text-[var(--color-primary)]">
                    {post.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm text-foreground-secondary leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center text-xs text-foreground-muted">
                    {post.author}
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
