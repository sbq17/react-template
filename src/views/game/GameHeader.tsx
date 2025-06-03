import { useState } from 'react'

export const GameHeader = () => {
  return (
    <div className="flex justify-between items-center w-full mb-6">
      <h1 className="text-2xl font-bold">数独游戏</h1>
      <button 
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        onClick={() => window.location.reload()}
      >
        新游戏
      </button>
    </div>
  )
}