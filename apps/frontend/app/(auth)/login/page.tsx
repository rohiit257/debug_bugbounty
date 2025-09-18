"use client"
import React, { useEffect, useState } from 'react'
import CustomConnectButton from '@/components/ConnectWalletButton'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import CreateProfileDialogue from '@/components/CreateProfileDialogue'

const LoginPage = () => {
    const { status, data: session } = useSession()
    const [openProfile, setOpenProfile] = useState(false)

    useEffect(() => {
      if (status === 'authenticated') {
        const hasName = Boolean((session as any)?.user?.name)
        if (!hasName) {
          setOpenProfile(true)
        } else {
          redirect('/timeline')
        }
      }
    }, [status, session])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="bg-black bg-opacity-70 rounded-2xl px-10 py-12 flex flex-col items-center shadow-2xl">
        <h1 className="text-white text-4xl font-extrabold mb-6 font-mono text-center drop-shadow-lg">
          Login to Debug
        </h1>
        <p className="text-gray-300 text-lg mb-10 text-center max-w-md">
          Connect your wallet to continue.
        </p>
        <CustomConnectButton />
      </div>
      <CreateProfileDialogue open={openProfile} setOpen={setOpenProfile} />
    </div>
  )
}

export default LoginPage