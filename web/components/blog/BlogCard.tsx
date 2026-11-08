import Link from "next/link";
import { SiteImage } from "@/components/media/SiteImage";
import type { BlogPostMeta } from "@/lib/blog";
import { formatPostDate, postCoverAlt } from "@/lib/blog";

export function BlogCard({
  post,
  featured = false,
  headingAs = "h3",
}: {
  post: BlogPostMeta;
  featured?: boolean;
  headingAs?: "h2" | "h3";
}) {
  const Title = headingAs;

  return (
    <Link href={post.path} className={`blog-card${featured ? " featured" : ""}`}>
      {post.image ? (
        <span className="blog-card-media">
          <SiteImage
            src={post.image}
            alt={postCoverAlt(post)}
            fill
            sizes={featured ? "(max-width: 900px) 100vw, 70vw" : "(max-width: 768px) 100vw, 33vw"}
            priority={featured}
            style={{ objectFit: "cover" }}
          />
        </span>
      ) : (
        <span className="blog-card-media" />
      )}
      <div className="blog-card-body">
        <span className="blog-tag">
          {formatPostDate(post.date)} · {post.minutes} min read
        </span>
        <Title>{post.title}</Title>
        <p>{post.excerpt}</p>
        <span className="blog-card-more">Read article</span>
      </div>
    </Link>
  );
}
