'use client'
import React from 'react'
import FaultyTerminal from '../components/FaultyTerminal'
import CustomConnectButton from '@/components/ConnectWalletButton'


function Page() {
  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
      <FaultyTerminal
        scale={2}
        gridMul={[2, 1]}
        digitSize={1.2}
        timeScale={1}
        pause={false}
        scanlineIntensity={1}
        glitchAmount={1}
        flickerAmount={1}
        noiseAmp={1}
        chromaticAberration={0}
        dither={0}
        curvature={0.2}
        tint="#A7EF9E"
        mouseReact={true}
        mouseStrength={0.5}
        pageLoadAnimation={false}
        brightness={0.5}
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-white text-6xl font-extrabold mb-8 font-mono drop-shadow-2xl text-center">
          Welcome to the Matrix
        </h1>
        <p className="text-white text-2xl mb-12 opacity-90 font-mono drop-shadow-lg text-center max-w-xl">
          Connect your wallet to enter the decentralized realm
        </p>
        <CustomConnectButton/>
      </div>
    </div>
  )
}

export default Page