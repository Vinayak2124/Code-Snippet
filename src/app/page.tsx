import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

import  Link  from 'next/link';


export default async function Home() {

  const snippets = await prisma.snippets.findMany();


  

  return (
    <div>
      <h1 className="font-bold text-4xl">SnippetVault</h1>
      <div className="flex items-center my-3 justify-between">
      <h1 className="font-semibold  text-2xl">Snippets</h1>
        <Link href="/snippet/new"><Button className="cursor-pointer">New</Button></Link>
      </div>
     {snippets.map((snippet) => (
  <div key={snippet.id} className="flex items-center justify-between bg-gray-200 p-2 my-4 rounded-md">
    <h1>{snippet.title}</h1>
    <Link href={`/snippet/${snippet.id}`}>
      <Button variant={"link"} className="font-bold cursor-pointer">View</Button>
    </Link>
  </div>
))}
</div>
  );
}

