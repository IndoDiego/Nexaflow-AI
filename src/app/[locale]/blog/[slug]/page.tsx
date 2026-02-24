import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";
import { CTABanner } from "@/components/shared/CTABanner";

export async function generateStaticParams() {
  const esSlugs = getAllBlogSlugs("es");
  const enSlugs = getAllBlogSlugs("en");
  return [
    ...esSlugs.map((slug) => ({ locale: "es", slug })),
    ...enSlugs.map((slug) => ({ locale: "en", slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);
  if (!post) return {};

  return {
    title: `${post.title} | NexaFlow AI`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(locale, slug);
  if (!post) notFound();

  const tCommon = await getTranslations({ locale, namespace: "Common" });

  // Simple markdown-to-HTML rendering (headings, paragraphs, lists, tables, code blocks)
  const contentHtml = post.content
    .split("\n")
    .map((line) => {
      if (line.startsWith("### ")) return `<h3>${line.slice(4)}</h3>`;
      if (line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith("# ")) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith("- **")) return `<li>${line.slice(2)}</li>`;
      if (line.startsWith("- ")) return `<li>${line.slice(2)}</li>`;
      if (line.startsWith("| ")) return line; // table rows handled separately
      if (line.startsWith("```")) return ""; // skip code fences
      if (line.trim() === "") return "<br/>";
      return `<p>${line}</p>`;
    })
    .join("\n")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  return (
    <>
      <Section>
        <Container className="max-w-3xl">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-foreground-muted">
            <Link href="/" className="hover:text-foreground">{tCommon("backToHome")}</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <span>/</span>
            <span className="truncate text-foreground">{post.title}</span>
          </div>

          {/* Header */}
          <Badge variant="primary" className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-foreground-secondary">{post.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-foreground-muted">
            <span>{post.author}</span>
            <span>&middot;</span>
            <time>{new Date(post.date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}</time>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg mt-12 max-w-none text-foreground-secondary prose-headings:text-foreground prose-strong:text-foreground prose-a:text-[var(--color-primary)]"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Back to blog */}
          <div className="mt-12 border-t border-border pt-8">
            <Link href="/blog" className="text-sm font-medium text-[var(--color-primary)] hover:underline">
              &larr; {locale === "es" ? "Volver al blog" : "Back to blog"}
            </Link>
          </div>
        </Container>
      </Section>
      <CTABanner />
    </>
  );
}
