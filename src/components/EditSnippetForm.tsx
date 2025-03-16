"use client"

import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'
import type { snippets } from '@prisma/client'
import { Button } from './ui/button';
import { saveSnippet } from '@/actions';

function EditSnippetForm({ snippet }: { snippet: snippets }) {
    
    const [code, setCode] = useState(snippet.code);

    const changeEventHandler = (value: string = " ") => {
        setCode(value)
    }

    const saveSnippetAction = saveSnippet.bind(null,snippet.id,code)

  return (
      <div className='flex flex-col gap-3'>
          <form action={saveSnippetAction} className='flex items-center justify-between' >
              <h1 className='text-2xl font-semibold'>Edit Your Code:</h1>
              <Button variant={"destructive"} type="submit">Save</Button>
          </form>
          <Editor
              height="80vh"
              theme='vs-dark'
        defaultLanguage="javascript"
              defaultValue={code}
              onChange={changeEventHandler}
        
              
      />
    </div>
  )
}

export default EditSnippetForm