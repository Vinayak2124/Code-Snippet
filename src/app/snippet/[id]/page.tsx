import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma'
import Link from 'next/link';
import { deleteSnippet } from '@/actions';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SnippetPage({ params }:PageProps) {
  const id = parseInt((await params).id);

  await new Promise((r)=>setTimeout(r,2000))

  const snippet = await prisma.snippets.findUnique({
    where: {
      id,
      
     },
  })

  if (!snippet) {
    return <h1>Snippet Not Found</h1>
  }

  const deleteSnippetActions = deleteSnippet.bind(null,snippet.id)

  return (
    <div className='flex flex-col gap-5'>
    <div className='flex items-center justify-between my-2 px-4'>
      
      <h1 className='font-bold text-xl'>{snippet.title}</h1>
      <div className='flex items-center gap-2'>
          <Link href={`/snippet/${snippet.id}/edit`}><Button>Edit</Button></Link>
          <form action={deleteSnippetActions}>
            <Button type='submit' variant={"destructive"}>Delete</Button>
          </form>
        
        </div>
        </div>
      <pre className='bg-gray-200 p-4 rounded-md border-gray-300'>
        <code>{snippet.code}</code></pre>
    </div>
  )
}

export const generateStaticParams = async () => {
  const snippets = await prisma.snippets.findMany();
  return snippets.map(snippet => ({ id: snippet.id.toString() }));
}
