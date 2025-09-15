import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: Props) {
  return <LatestIssues />;
}
