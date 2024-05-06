'use client'

import { FC, useState } from "react"
import ModalAddOrUpdate from "./modalAddOrUpdate"
import { DataPosts } from "@/interface"

interface Props{
    title: string
    id?: string
    post?: DataPosts[]
    setPost?: Function
    detail?: DataPosts
    setDetil?: Function
}

const AddOrEdit: FC<Props> = (props) => {
    const {title, id = null, post = [], setPost = () => {}, detail = {}, setDetil = () => {}} = props
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <div onClick={() => setOpen(true)} className="bg-blue-900 cursor-pointer text-white px-8 py-2 w-fit rounded-md">{title}</div>
            {open && <ModalAddOrUpdate id={id} onClose={() => setOpen(!open)} post={post} setPost={setPost} detail={detail} setDetail={setDetil} />}
        </>
    )
}
export default AddOrEdit