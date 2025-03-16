import React from 'react'
import EditSnippetForm from '@/components/EditSnippetForm'
import { prisma } from '@/lib/prisma';


async function EditPageSnippet({ params }: { params: { id: string } }) {

    const id = parseInt((await params).id);
    const snippet = await prisma.snippets.findUnique({
        where: {
            id,
        },
    });
    if(!snippet) return <h1>Snippet not found</h1>
  return (
      <div>
          <EditSnippetForm snippet={ snippet} />
    </div>
  )
}

export default EditPageSnippet