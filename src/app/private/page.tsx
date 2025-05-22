/* import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <>
      <p>Hello {data.user.email}</p>
      <button>Sign out</button>
    </>
  )


} */

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import ClientSection from './ClientSection'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/')
  }

  return <ClientSection email={data.user.email ?? 'Unknown'} />
}
