'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addClass } from '../actions/classes'

export function AddClassForm() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Ajouter une classe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle classe</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            await addClass(formData)
            setOpen(false)
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input id="name" name="name" required />
          </div>
          <Button type="submit">Ajouter</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

