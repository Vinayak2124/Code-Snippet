"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import * as actions from "@/actions"

import React, { useActionState } from 'react'

function page() {
    const [formStateData,action] = useActionState(actions.createSnippet, {message:""})

    return (
    <div>
      <h1 className='flex justify-center text-4xl font-bold'>Create a New Snippet</h1>
            <form action={action} className='flex flex-col w-150 mx-auto my-4'>
          
          <div className='my-4'>
              <Label className='text-2xl py-0.5'>Title</Label> 
              <Input type="text" name="title" id="title" />
          </div>
          <div className='my-4'>
              <Label className='text-2xl py-0.5'>Code</Label> 
              <Textarea name="code" id="code" />
                </div>
                {formStateData.message && <div className='p-2 bg-red-100 border-2  border-red-600'>{formStateData.message}</div>}
          <Button type="submit" className='my-4'>Create</Button>
            </form>
            </div>
  )
}

export default page