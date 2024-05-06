import { getServer } from "@/api/getServer";
import AddOrEdit from "@/components/addOrEdit";
import Delete from "@/components/delete";
import Detail from "@/components/detail";
import ComponentLayout from "@/components/layout";
import { CommentProps, DataPosts } from "@/interface";
import Link from "next/link";

export default async function Home({ params: { id } }: { params: { id: string } }) {
  const detail: DataPosts = await getServer('posts/' + id)
  const comment: CommentProps[] = await getServer('posts/' + id + '/comments')
  return (
    <ComponentLayout>
      <Detail detial={detail} comment={comment} id={id} />
        
    </ComponentLayout>
  );
}
