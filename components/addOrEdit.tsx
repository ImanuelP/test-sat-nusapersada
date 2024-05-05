'use client'

import { FC, useState } from "react"
import ModalAddOrUpdate from "./modalAddOrUpdate"

interface Props{
    title: string
    id?: string
}

const AddOrEdit: FC<Props> = (props) => {
    const {title, id = null} = props
    const [open, setOpen] = useState<boolean>(false)
    console.log(id)
    return (
        <>
            <div onClick={() => setOpen(true)} className="bg-blue-900 cursor-pointer text-white px-8 py-2 w-fit rounded-md">{title}</div>
            {open && <ModalAddOrUpdate onClose={() => setOpen(!open)} />}
        </>
    )
}
export default AddOrEdit