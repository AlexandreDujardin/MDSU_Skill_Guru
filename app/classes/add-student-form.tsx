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
import { addStudent } from '../actions/classes'

interface AddStudentFormProps {
  classId: string
}

export function AddStudentForm({ classId }: AddStudentFormProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Ajouter un étudiant</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvel élève</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            formData.append('classId', classId)
            await addStudent(formData)
            setOpen(false)
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="firstName">Prénom</Label>
            <Input id="firstName" name="firstName" required />
          </div>
          <div>
            <Label htmlFor="lastName">Nom</Label>
            <Input id="lastName" name="lastName" required />
          </div>
          <Button type="submit">Ajouter</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

