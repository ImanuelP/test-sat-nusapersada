import { getServer } from "@/api/getServer";
import { DataPosts } from "@/interface";

export default async function Home() {
  const data: DataPosts[] = await getServer('posts')
  console.log(data)
  return (
    <div className="">
      {data.map((row) => (
        <div key={row.id}>{row.title}</div>
      ))}
    </div>
  );
}
