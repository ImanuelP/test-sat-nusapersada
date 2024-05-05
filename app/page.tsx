import { getServer } from "@/api/getServer";
import AddOrEdit from "@/components/addOrEdit";
import ComponentLayout from "@/components/layout";
import { DataPosts } from "@/interface";
import Link from "next/link";

export default async function Home() {
  const data: DataPosts[] = await getServer('posts')
  return (
    <ComponentLayout>
        <AddOrEdit title="Add" />
        {data.map((row) => (
          <Link key={row.id} href={`/detail/${row.id}`}>
            <div className="sm:w-[500px] px-4 transition ease-in-out delay-10 hover:bg-blue-100 hover:-translate-y-1 hover:scale-100 duration-300 border-2 rounded-lg border-blue-400 dark:border-white p-4 my-4 cursor-pointer">
              <div className="text-xl text-blue-700 dark:text-blue-400  capitalize hover:underline font-semibold">{row.title}</div>
              <div className="text-sm">{row.body}</div>
              <div className="mt-4 italic text-sm text-gray-600 text-end hover:text-blue-900 font-semibold">Detail</div>
            </div>
          </Link>
        ))}
    </ComponentLayout>
  );
}
