import { getPostBySlug, getPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Footer, SimpleHeader } from "@/components/layout";
import { ArrowLeft, Clock, CalendarDays } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Params = Promise<{ slug: string }>;

export default async function BlogPostPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.createdAt));

  return (
    <>
      <SimpleHeader />
      <main className="min-h-screen pt-24 pb-20 bg-background">
        {/* Post Header Hero */}
        <div className="container mx-auto px-4 max-w-4xl mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Blog
          </Link>

          <div className="mb-6 flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground bg-primary rounded-test-test-none">
              {post.category.name}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-6 py-6 border-y border-border/50">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-test-test-full overflow-hidden bg-muted">
                <Image
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="font-semibold">{post.author.name}</div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                <time dateTime={post.createdAt}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="relative aspect-video w-full overflow-hidden rounded-test-test-2xl bg-muted border border-border/50">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Post Content */}
        <div className="container mx-auto px-4 max-w-3xl">
          <article
            className="prose prose-lg dark:prose-invert prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-test-test-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
