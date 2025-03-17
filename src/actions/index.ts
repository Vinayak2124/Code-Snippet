"use server"
import {revalidatePath} from "next/cache"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export const saveSnippet = async (id: number, code: string) => {
    await prisma.snippets.update({
        where: {
            id,
        },
        data: {
            code
        }

    })
    revalidatePath(`/snippet/${id}`)
    redirect(`/snippet/${id}`);
}

export const deleteSnippet = async (id: number)=>{
    await prisma.snippets.delete({
        where: {
            id,
        },
    })
    revalidatePath("/")
    redirect("/");
}

export async function createSnippet(prevState: {message:string},formData: FormData) {
        "use server"
        const title = formData.get("title") ;
    const code = formData.get("code");
    if (typeof title !== "string" || title.length < 4) {
        return {message:"Title is required and must be longer..!"}
    } if (typeof code != "string" || code.length < 8) {
        return {message:"Code is required and must be longer..!"}
    }

        const snippet = await prisma.snippets.create({
            data: {
                title,
                code,
            },
        });
        console.log("snippet created", snippet);
        

        revalidatePath("/")

        redirect("/");

    }