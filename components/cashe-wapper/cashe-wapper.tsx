
import { ReactNode } from "react";

interface PropType {
    text?: ReactNode
}
export default async function CasheWapper({ text }: PropType) {
    'use cache'
    return <>
        {text}
    </>
}

