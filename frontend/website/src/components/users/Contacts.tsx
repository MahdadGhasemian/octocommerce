'use client'

import React, { useEffect, useState } from 'react'

import ContactInfo from '@/components/users/ContactInfo'
import ContactInfoManager from '@/components/users/ContactInfoManager'

import basicService, { Contact } from '@/services/basic.service'

export default function Contacts() {
  // ** State
  const [contacts, setContacts] = useState<Partial<Contact>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // ** Functions
  const fetchContacts = async () => {
    try {
      setIsLoading(true)
      const result = await basicService.getAllContact()
      if (result?.data?.length) {
        setContacts(result.data)
      }
    } catch (error) {
      error
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  return (
    <div className='flex flex-col items-start justify-between gap-4 xl:gap-10 w-full xl:pb-10 p-4'>
      <div className='ps-4 pt-4 flex xl:flex-col items-center xl:items-start gap-2 w-full'>
        <h2 className='text-xl font-bold'>آدرس ها</h2>
      </div>

      <ContactInfoManager />

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
        {contacts?.map(contact => (
          <ContactInfo key={contact.id} contact={contact} variant='card' />
        ))}
      </div>
    </div>
  )
}
