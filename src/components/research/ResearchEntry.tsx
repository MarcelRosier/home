import AuthorList from "@/components/research/AuthorList";
import LinkList from "./LinkList";

type Props = {
  researchEntry: any;
};

function ResearchEntry({ researchEntry }: Props) {
  return (
    <div>
      <h3 className="m-0 text-xl">{researchEntry.data.title}</h3>
      <AuthorList authors={researchEntry.data.authors} />
      <div className="flex items-center mt-2 space-x-4">
        <span className="text-sm text-gray-600">{researchEntry.data.date}</span>
        <LinkList links={researchEntry.data.links} />
      </div>
    </div>
  );
}

export default ResearchEntry;
