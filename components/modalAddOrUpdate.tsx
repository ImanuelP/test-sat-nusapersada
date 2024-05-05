import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
    title: string | null
    body: string | null
}

interface Props {
    onClose: () => void
}
const ModalAddOrUpdate: FC<Props> = (props) => {
    const {onClose} = props
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (datas: Inputs) => {
        // if (datas) {
        try {
            const response: any = await fetch(`${process.env.LINK_API}posts`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(datas)
            });
            if (!response.ok) throw new Error('Failed to add post');
            alert('Success to create new data')
            const data = await response.json();
            return data
          } catch (error) {
            console.error('Error adding post:', error);
          }
        // }
    }
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className=" bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <h1 className="text-2xl text-blue-900 font-bold">Add</h1>
                            <div className="sm:flex  my-3 gap-3">
                                <p className="w-14">Title</p>
                                <div className="w-full">
                                    <input {...register("title", { required: true })} className="border rounded-md text-xs px-2 h-8 outline-blue-400 w-full" />
                                    {errors.title && <span className="text-red-600 text-sm italic">This field is required</span>}
                                </div>
                            </div>
                            <div className="sm:flex my-3 gap-3">
                                <p className="w-14">Body</p>
                                <div className="w-full">
                                    <textarea {...register("body", { required: true })} className="border rounded-md text-xs p-2 outline-blue-400 w-full" rows={3} />
                                    {errors.body && <span className="text-red-600 text-sm italic">This field is required</span>}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Save</button>
                            <button onClick={onClose} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalAddOrUpdate