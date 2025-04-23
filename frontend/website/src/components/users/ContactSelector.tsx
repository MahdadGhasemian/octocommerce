'use client';

import React, { useEffect, useState } from 'react';

import ContactInfo from '@/components/users/ContactInfo';

import { Contact } from '@/services/basic.service';

type ContactSelectorProps = {
  label?: string;
  contacts: Partial<Contact>[];
  onSelected?: (contactId: number) => void;
  defaultContactId?: number;
};

export default function ContactSelector(props: ContactSelectorProps) {
  // ** Props
  const { label, contacts, onSelected, defaultContactId } = props;

  // ** State
  const [selectedContactId, setSelectedContactId] = useState<number>(-1);

  // ** Functions
  const handleContactSelected = (contactId: number) => {
    setSelectedContactId(contactId);
    if (onSelected) onSelected(contactId);
  };

  useEffect(() => {
    if (defaultContactId) {
      setSelectedContactId(defaultContactId);
    }
  }, [defaultContactId]);

  return (
    <div className='w-full flex flex-col justify-center items-start gap-4'>
      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text'>{label}</span>
        </div>
        <select
          className='select select-bordered'
          value={selectedContactId}
          onChange={e => handleContactSelected(+e.target.value)}
        >
          <option value={-1}>یک آدرس انتخاب نمایید</option>
          {contacts.map(contact => (
            <option key={contact.id} value={contact.id} className='text-sm'>
              {contact.title || `${contact.name}`}
            </option>
          ))}
        </select>
      </label>
      <ContactInfo contact={contacts.find(_ => _.id === selectedContactId)} variant='short' />
    </div>
  );
}
