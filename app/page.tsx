import { getServer } from "@/api/getServer";
import Home from "@/components/home";
import ComponentLayout from "@/components/layout";
import { DataPosts } from "@/interface";
import Link from "next/link";

export default async function Pages({searchParams}: {searchParams: {page: string}}) {
  const data: DataPosts[] = await getServer(`posts`)
  return (
    <>
      <ComponentLayout>
          <Home data={data} />
      </ComponentLayout>
    </>
  );
}
