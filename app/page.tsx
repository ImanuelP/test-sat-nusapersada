import { getServer } from "@/api/getServer";
import { DataPosts } from "@/interface";
import Link from "next/link";

export default async function Home() {
  const data: DataPosts[] = await getServer('posts')
  return (
    <div className="flex px-4 justify-center dark:bg-black">
      <div>
        {data.map((row) => (
          <Link key={row.id} href={`/detail/${row.id}`}>
            <div className="sm:w-[500px] transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300 border-2 rounded-lg border-blue-400 dark:border-white p-4 my-4 cursor-pointer">
              <div className="text-xl text-blue-700 dark:text-blue-400  capitalize hover:underline font-semibold">{row.title}</div>
              <div className="text-sm">{row.body}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
