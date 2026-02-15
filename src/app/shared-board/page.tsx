import { getBoardData } from "@/lib/board";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import SharedBoardClient from "./shared-board-client";

export default async function SharedBoardPage() {
  const boardData = getBoardData();

  if (!boardData) {
    return <div>Failed to load board data.</div>;
  }

  return (
    <div className="min-h-dvh bg-[#FCFBF7] text-[#2C363F]">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <SharedBoardClient data={boardData} />
      </main>
      <SiteFooter />
    </div>
  );
}
