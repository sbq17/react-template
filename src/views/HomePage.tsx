import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const navigate = useNavigate();

  const difficulties = [
    { id: 'beginner', name: '初级', color: 'bg-green-500' },
    { id: 'intermediate', name: '中级', color: 'bg-blue-500' },
    { id: 'advanced', name: '高级', color: 'bg-orange-500' },
    { id: 'master', name: '大师', color: 'bg-red-500' }
  ];

  const handleStartGame = () => {
    navigate('/sudoku', { state: { difficulty: selectedDifficulty } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">数独游戏</h1>
      
      <div className="w-full max-w-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.id}
              onClick={() => setSelectedDifficulty(difficulty.id)}
              className={`p-6 rounded-lg text-white text-xl transition-all
                ${difficulty.color} 
                ${selectedDifficulty === difficulty.id 
                  ? 'ring-4 ring-purple-400 scale-105' 
                  : 'opacity-90 hover:opacity-100'}`}
            >
              {difficulty.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleStartGame}
          disabled={!selectedDifficulty}
          className="w-full py-3 bg-purple-600 text-white rounded-lg text-xl
            hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed
            transition-colors"
        >
          开始游戏
        </button>
      </div>
    </div>
  );
};

export default HomePage;