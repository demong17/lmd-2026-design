import { getSearchTitles } from "@/lib/search";

export function SiteSearchForm({
  defaultQuery = "",
  id = "site-search",
  autoFocus = false,
}: {
  defaultQuery?: string;
  id?: string;
  autoFocus?: boolean;
}) {
  const titles = getSearchTitles();
  const listId = `${id}-suggestions`;

  return (
    <form className="site-search" action="/search" method="get" role="search">
      <label className="site-search-label" htmlFor={id}>
        Search the site
      </label>
      <div className="site-search-row">
        <input
          id={id}
          name="q"
          type="search"
          defaultValue={defaultQuery}
          placeholder="SEO, Coral Gables, email, case studies…"
          autoComplete="off"
          autoFocus={autoFocus || undefined}
          maxLength={120}
          enterKeyHint="search"
          list={listId}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
      <datalist id={listId}>
        {titles.map((title) => (
          <option key={title} value={title} />
        ))}
      </datalist>
    </form>
  );
}
