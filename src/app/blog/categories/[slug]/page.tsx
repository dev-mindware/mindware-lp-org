import { Footer, SimpleHeader } from "@/components/layout";
import { getPostsByCategory, mockCategories } from "@/data/blog";
import { PostCard } from "@/components/blog/post-card";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return mockCategories.map((category) => ({
    slug: category.slug,
  }));
}

type Params = Promise<{ slug: string }>;

export default async function CategoryPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const category = mockCategories.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.slug);

  return (
    <>
      <SimpleHeader />
      <main className="min-h-screen pt-24 pb-20 bg-background">
        <SectionWrapper className="container mx-auto px-4 space-y-12">
          <div className="space-y-6">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Blog
            </Link>

            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Categoria:{" "}
              <span className="text-primary italic">{category.name}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {posts.length}{" "}
              {posts.length === 1 ? "artigo encontrado" : "artigos encontrados"}{" "}
              nesta categoria.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed rounded-test-test-xl border-border/50 bg-muted/20">
              <p className="text-muted-foreground">
                Nenhum artigo publicado sob esta categoria ainda.
              </p>
            </div>
          )}
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
