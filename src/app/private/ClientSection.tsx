'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function ClientSection({ email }: { email: string }) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/login')
    } else {
      console.error('Error signing out:', error.message)
    }
  }

  return (
    <>
      <p>Hello {email}</p>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  )
}
