import crypto from 'crypto-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type Session = {
  userId: string
}

export const setSession = (session: Session): void => {
  const encryptionKey = process.env.ENCRYPTION_KEY || ''
  const encryptedSessionData = crypto.AES.encrypt(
    JSON.stringify(session),
    encryptionKey
  )
  cookies().set('session', encryptedSessionData.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/'
  })
}

export const getSession = async (): Promise<Session | undefined> => {
  const encryptedSessionData = cookies().get('session')?.value
  if (!encryptedSessionData) {
    return undefined
  }
  const encryptionKey = process.env.ENCRYPTION_KEY || ''
  const bytes = crypto.AES.decrypt(encryptedSessionData, encryptionKey)
  const session = JSON.parse(bytes.toString(crypto.enc.Utf8))
  return session
}

export const getSessionOrFail = async (): Promise<Session> => {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  return session
}

export const clearSession = (): void => {
  cookies().delete('session')
}
