export interface DataPosts {
    id: number
    userId: number
    title: string
    body: string
}

export interface CommentProps {
    postId: number
    id: number
    name: string
    email: string
    body: string
}