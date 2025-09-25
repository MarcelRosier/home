import Author from "./Author";
import { Fragment } from "react";

function AuthorList({ authors, short = false }) {
  if (!authors || authors.length === 0) return null;

  const maxAuthorsToShow = 8;
  const displayedAuthors = authors.slice(0, maxAuthorsToShow);
  const hasMore = authors.length > maxAuthorsToShow;

  return short ? (
    <>
      <Author
        author={authors[0]}
        abbreviateFirstName={true}
        className="text-xs font-light text-muted-foreground sm:text-sm"
      />
      <span className="font-light text-muted-foreground sm:text-sm">
        et al.
      </span>
    </>
  ) : (
    <div className="flex flex-wrap items-center text-muted-foreground truncate text-xs sm:text-sm">
      {displayedAuthors.map((author, index) => {
        const isHighlighted = author == "Marcel Rosier" || author == "M. Rosier";
        return (
          <Fragment key={index}>
            <Author
              author={author}
              abbreviateFirstName={true}
              className="font-light text-muted-foreground"
              highlight={isHighlighted}
            />
            {index < displayedAuthors.length - 1 && <span>,&nbsp;</span>}
          </Fragment>
        );
      })}

      {hasMore && (
        <span className="font-light text-muted-foreground">, et al.</span>
      )}
    </div>
  );
}
export default AuthorList;
