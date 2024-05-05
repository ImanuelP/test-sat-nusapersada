'use client'
import { FC } from "react"

interface Props {
    id: string
}
const Delete: FC<Props> = (props) => {
    const { id } = props
    
  const deletePost = async (id: string) => {
    try {
      const response = await fetch(`${process.env.LINK_API}posts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw alert('Failed to delete post');
      alert('Success to Delete')
    //   setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

    return (
        <div onClick={() => deletePost(id)} className="bg-red-900 cursor-pointer text-white px-8 py-2 w-fit rounded-md">Delete</div>
    )
}

export default Delete