import { getServer } from "@/api/getServer";
import ComponentLayout from "@/components/layout";
import { CommentProps, DataPosts } from "@/interface";
import Link from "next/link";

export default async function Home({ params: { id } }: { params: { id: string }}) {
  const detail: DataPosts = await getServer('posts/' + id)
  const comment: CommentProps[] = await getServer('posts/' + id + '/comments')
  return (
    <ComponentLayout>
      <div className="sm:w-[500px] shadow-md border-2 rounded-lg border-blue-400 dark:border-white p-4 my-4">
        <Link href={'/'}><div className="mb-2 font-bold underline text-gray-700 dark:text-gray-200">Back</div></Link>
          <div className="border-b pb-4">
            <div className="text-xl text-blue-700 dark:text-blue-400  capitalize font-semibold">{detail.title}</div>
            <div className="text-sm mt-2">{detail.body}</div>
          </div>
          <div className="text-end text-xs mt-2 text-gray-500 font-bold dark:text-white">Comment</div>
          {comment.map((row, index) => (
            <div key={row.id} className={`grid p-2 ${comment.length  !== index + 1 && 'border-b'} items-center grid-cols-2`}>
              <p className="font-semibold dark:font-bold text-gray-500 dark:text-gray-300 capitalize text-base">{row.name}</p>
              <p className="text-end text-xs">{row.email}</p>
              <p className="text-xs col-span-2">{row.body}</p>
            </div>
          ))}
      </div>
    </ComponentLayout>
  );
}
