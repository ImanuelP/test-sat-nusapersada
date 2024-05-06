'use client'
import Link from "next/link";
import { FC, useState } from "react";
import AddOrEdit from "./addOrEdit";
import Delete from "./delete";
import { CommentProps, DataPosts } from "@/interface";

interface Props {
    id: string
    comment: CommentProps[]
    detial: DataPosts
}
const Detail: FC<Props> = (props) => {
    const {comment, id, detial} = props
    const [detail, setDetail] = useState(detial)
    return (
        <>
        {/* flex justify-between items-center fixed bg-red-500 sm:w-[500px] px-4  */}
          <div className="flex justify-between sm:w-[500px]  ">
            <Link href={'/'}><div className="bg-gray-400 cursor-pointer text-white px-8 py-2 w-fit rounded-md">Back</div></Link>
            <AddOrEdit detail={detail} setDetil={setDetail}  title="Update" id={id} />
            <div className="">
            <Delete id={id} />
            </div>
        </div>
      <div className="sm:w-[500px]  shadow-md border-2 rounded-lg border-blue-400 dark:border-white p-4 my-4">
        <div className="border-b pb-4">
          <div className="text-xl text-blue-700 dark:text-blue-400  capitalize font-semibold">{detail.title}</div>
          <div className="text-sm mt-2">{detail.body}</div>
        </div>
        <div className="text-end text-xs mt-2 text-gray-500 font-bold dark:text-white">Comment</div>
        {comment.map((row, index) => (
          <div key={row.id} className={`grid p-2 ${comment.length !== index + 1 && 'border-b'} items-center grid-cols-2`}>
            <p className="font-semibold dark:font-bold text-gray-500 dark:text-gray-300 capitalize text-base">{row.name}</p>
            <p className="text-end text-xs">{row.email}</p>
            <p className="text-xs col-span-2">{row.body}</p>
          </div>
        ))}
      </div>
        </>
    )
}

export default Detail
