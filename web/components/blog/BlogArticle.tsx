import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { SiteImage } from "@/components/media/SiteImage";
import { formatPostDate, getRelatedPosts, postCoverAlt, type BlogPost } from "@/lib/blog";
import { demoteArticleHeadings } from "@/lib/html-to-text";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export function BlogArticle({ post }: { post: BlogPost }) {
  const related = getRelatedPosts(post.slug);

  return (
    <main className="article-page">
      <section className="article-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blog">Resources</Link>
            <span>/</span>
            {post.title}
          </p>
          <p className="eyebrow center">RESOURCES</p>
          <h1>{post.title}</h1>
          <p className="article-meta">
            {formatPostDate(post.date)} · {post.minutes} min read
          </p>
        </div>
      </section>

      {post.image ? (
        <div className="container">
          <figure className="article-cover">
            <SiteImage
              src={post.image}
              alt={postCoverAlt(post)}
              fill
              sizes="(max-width: 960px) 100vw, 960px"
              priority
              style={{ objectFit: "cover" }}
            />
          </figure>
        </div>
      ) : null}

      <article className="article-body" dangerouslySetInnerHTML={{ __html: demoteArticleHeadings(post.html, post.title) }} />

      <section className="article-cta">
        <div className="container">
          <h2>Want this working for your business?</h2>
          <p>Free strategy session. No long-term contracts, no guesswork.</p>
          <div className="hero-ctas center">
            <Link href="/consultation" className="btn btn-primary">
              Get Free Consultation
            </Link>
            <a href={`tel:${SITE_PHONE_TEL}`} className="btn btn-outline">
              Call {SITE_PHONE}
            </a>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="article-related">
          <div className="container">
            <h2>More from Resources</h2>
            <div className="blog-grid">
              {related.map((item) => (
                <BlogCard post={item} key={item.slug} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
