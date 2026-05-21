import SEO from "@/components/shared/SEO";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

type LegalMarkdownPageProps = {
  canonicalUrl: string;
  description: string;
  markdown: string;
  title: string;
};

type LegalSection = {
  id: string;
  title: string;
};

const inlinePartsPattern = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const renderInlineText = (text: string) => {
  const parts = text.split(inlinePartsPattern).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{renderInlineText(part.slice(2, -2))}</strong>;
    }

    if (/^https?:\/\//i.test(part)) {
      const href = part.replace(/[.,;:]$/, "");
      const trailing = part.slice(href.length);

      return (
        <span key={`${part}-${index}`}>
          <a href={href} className="text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline">
            {href}
          </a>
          {trailing}
        </span>
      );
    }

    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(part)) {
      return (
        <a
          key={`${part}-${index}`}
          href={`mailto:${part}`}
          className="text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
        >
          {part}
        </a>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
};

const parseLegalMarkdown = (markdown: string) => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const nodes: JSX.Element[] = [];
  const sections: LegalSection[] = [];
  let lastUpdated = "";
  let listItems: string[] = [];

  const flushList = () => {
    if (!listItems.length) return;

    nodes.push(
      <ul key={`list-${nodes.length}`} className="my-5 list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary/70">
        {listItems.map((item) => (
          <li key={item} className="leading-7">
            {renderInlineText(item)}
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed === "---" || trimmed.startsWith("# ")) {
      flushList();
      return;
    }

    if (!lastUpdated && /^\*\*Last Updated: .+\*\*$/.test(trimmed)) {
      lastUpdated = trimmed.slice(2, -2);
      return;
    }

    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();

    if (trimmed.startsWith("## ")) {
      const sectionTitle = trimmed.slice(3);
      const id = slugify(sectionTitle);
      sections.push({ id, title: sectionTitle });
      nodes.push(
        <h2
          key={`h2-${nodes.length}`}
          id={id}
          className="mt-12 scroll-mt-24 border-t border-white/10 pt-8 text-2xl font-bold tracking-tight text-foreground first:mt-0 first:border-t-0 first:pt-0"
        >
          {renderInlineText(sectionTitle)}
        </h2>,
      );
      return;
    }

    if (trimmed.startsWith("### ")) {
      nodes.push(
        <h3 key={`h3-${nodes.length}`} className="mt-8 text-lg font-semibold tracking-tight text-foreground">
          {renderInlineText(trimmed.slice(4))}
        </h3>,
      );
      return;
    }

    nodes.push(
      <p key={`p-${nodes.length}`} className="my-4 leading-8 text-muted-foreground">
        {renderInlineText(trimmed.replace(/ {2}$/, ""))}
      </p>,
    );
  });

  flushList();
  return { lastUpdated, nodes, sections };
};

const LegalMarkdownPage = ({ canonicalUrl, description, markdown, title }: LegalMarkdownPageProps) => {
  const { lastUpdated, nodes, sections } = parseLegalMarkdown(markdown);

  return (
    <>
      <SEO title={`${title} | AlphaTrack Digital`} description={description} canonicalUrl={canonicalUrl} />

      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,51,153,0.03) 0%, rgba(0,175,239,0.015) 48%, transparent 100%)",
        }}
      >
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: title }]} />
          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
          {lastUpdated && (
            <p className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-muted-foreground">
              {lastUpdated}
            </p>
          )}
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 lg:grid-cols-[16rem_minmax(0,1fr)] lg:px-8">
          {sections.length > 0 && (
            <aside className="hidden lg:block">
              <nav
                aria-label={`${title} sections`}
                className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto border-l border-white/10 pl-5"
              >
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">On This Page</p>
                <ol className="space-y-2.5 text-sm">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block leading-5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
          <article className="max-w-3xl text-[15px] md:text-base">{nodes}</article>
        </div>
      </section>
    </>
  );
};

export default LegalMarkdownPage;
