'use server';

import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending','paid']),
  date: z.string(),
})

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerID: formData.get('customerId'),
    amount:     formData.get('amount'),
    status:     formData.get('status'),
  });
  // Note that you could do Object.fromEntries() to get all the fields of the form

  // convert all the amounts into cents
  const amountInCents = amount * 100;

  // create date
  const date = new Date().toISOString().split('T')[0];

  
}