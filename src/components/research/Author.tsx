import { cn } from "@/lib/utils";

function Author({
  author,
  abbreviateFirstName = true,
  highlight = false,
  className = "",
}) {
  if (!author) return null;

  function parseAuthorName(fullName: string) {
    const parts = fullName.split(" ");
    if (parts.length === 1) return { firstName: "", lastName: parts[0] };
    return {
      firstName: parts[0],
      lastName: parts.slice(1).join(" "),
    };
  }

  const { firstName, lastName } = parseAuthorName(author);

  const name =
    abbreviateFirstName && lastName
      ? `${firstName.at(0)}. ${lastName}`
      : author;

  const combinedClass = cn(
    "whitespace-nowrap",
    className,
    highlight ? "underline underline-offset-4" : ""
  );

  return author.href ? (
    <a
      href={author.href}
      target="_blank"
      rel="noopener noreferrer"
      className={combinedClass}
    >
      {name}
    </a>
  ) : (
    <span className={combinedClass}>{name}</span>
  );
}

export default Author;
