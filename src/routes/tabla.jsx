import React from 'react'
import Nav from '../components/fuba/Nav'
import Leaderboard from '../components/fuba/Leaderboard'

export default function tabla() {
  return (
    <div className="py-12 bg-blue container px-2">
      <Leaderboard />
      <Nav />
    </div>
  )
}
