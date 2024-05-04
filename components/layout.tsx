import { FC, ReactNode } from "react"

interface Props {
    children: ReactNode
}
const ComponentLayout: FC<Props> = (props) => {
    const {children} = props
    return (
        <div className="flex p-4 justify-center">
            <div>
                <div className="h-[90vh] overflow-auto">{children}</div>
            </div>
        </div>
    )
}

export default ComponentLayout