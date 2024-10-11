import React from 'react'
import Leaderboard from '../components/fuba/Leaderboard'

export default function tabla() {
  return (
    <div className="py-12 bg-blue px-2">
      <div className="container mx-auto">
       <Leaderboard isLeaderboard/>
      </div>
    </div>
  )
}
