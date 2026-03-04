import { Footer, SimpleHeader } from "@/components/layout";
import { getFeaturedPosts, getPosts, mockCategories } from "@/data/blog";
import { PostCard } from "@/components/blog/post-card";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export default async function BlogPage() {
  const featuredPosts = await getFeaturedPosts();
  const allPosts = await getPosts();

  // Filtrando para não repetir os Featured na listagem normal (opcional, mas bom pra UX)
  const regularPosts = allPosts.filter((p) => !p.featured);

  return (
    <>
      <SimpleHeader />
      <main className="min-h-screen pt-24 pb-20 bg-background">
        <SectionWrapper className="container mx-auto px-4 space-y-24">
          {/* Header do Blog & Categorias */}
          <section className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                  Mindware <span className="text-primary italic">Blog_</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Artigos, pensamentos e tutoriais da nossa equipe de engenharia
                  e design.
                </p>
              </div>
              <div className="flex bg-muted/50 p-1 rounded-test-test-lg overflow-x-auto scrollbar-hide">
                <Link
                  href="/blog"
                  className="px-4 py-2 text-sm font-semibold bg-background rounded-test-test-md shadow-sm whitespace-nowrap"
                >
                  Últimos Artigos
                </Link>
                {mockCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blog/categories/${cat.slug}`}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Destaques (Featured) */}
          <section>
            <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-primary flex items-center gap-3">
              <span className="w-2 h-2 rounded-test-test-full bg-primary animate-pulse" />
              Conteúdo em Destaque
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  featured={index === 0} // O primeiro ganha o peso de 'featured' (tamanho duplo se estiver programado no css)
                />
              ))}
            </div>
          </section>

          {/* Todos os Artigos */}
          <section>
            <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-foreground">
              Mais Artigos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
