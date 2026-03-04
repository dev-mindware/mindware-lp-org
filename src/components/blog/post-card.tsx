import Image from "next/image";
import Link from "next/link";
import { type Post } from "@/data/blog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block h-full outline-offset-4 rounded-test-test-xl focus-visible:outline-primary group"
    >
      <Card
        className={cn(
          "h-full overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 relative flex flex-col",
          featured ? "md:col-span-2 md:flex-row group" : "",
        )}
      >
        {/* Imagem Cover */}
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            featured ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video",
          )}
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
            sizes={
              featured
                ? "(min-width: 768px) 50vw, 100vw"
                : "(min-width: 768px) 33vw, 100vw"
            }
            priority={featured}
          />
          {/* Tag Categoria Drop-in */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground bg-primary/90 backdrop-blur-md rounded-test-test-none shadow-sm shadow-primary/20">
              {post.category.name}
            </span>
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* Content Box */}
        <div
          className={cn(
            "flex flex-col flex-1",
            featured ? "md:w-1/2 justify-center" : "",
          )}
        >
          <CardHeader className="pt-6 pb-2">
            <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">
              {post.category.name}
            </div>
            <h3
              className={cn(
                "font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2",
                featured ? "text-2xl md:text-3xl line-clamp-3" : "text-xl",
              )}
            >
              {post.title}
            </h3>
          </CardHeader>
          <CardContent className="flex-1 pb-4">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
          </CardContent>
          <CardFooter className="border-t border-border/30 mt-auto flex items-center gap-3 pt-4">
            <div className="relative w-8 h-8 rounded-test-test-full overflow-hidden bg-muted border border-border">
              <Image
                src={post.author.avatarUrl}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                {post.author.name}
              </span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.createdAt}>
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(post.createdAt))}
                </time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
