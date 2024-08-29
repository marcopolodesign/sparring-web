import React, { useEffect, useState } from 'react';
import { getTournamentResults } from '../../api/functions';
import { SubContainer } from '../../styled';

const Leaderboard = () => {
  const [couples, setCouples] = useState(null);

  useEffect(() => {
    const fetchCouples = async () => {
      try {
        const response = await getTournamentResults(1); // Replace with your actual endpoint
        setCouples(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching tournament results:', error.message);
      }
    };

    fetchCouples();
  }, []);

  if (!couples) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const sortedCouples = sortCouplesByMatchesWon(couples);

return (
    <SubContainer className="p-8 mx-6 bg-white">
        <div className="flex justify-between text-lg font-bold border-b pb-2">
            <span>Parejas</span>
            <span>Puntos</span>
        </div>
        <div className="mt-4">
            {sortedCouples.map((couple, index) => (
                <div key={couple.couple.id} className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center">
                        <div className="text-2xl font-bold mr-4 font-display">{index + 1}</div>
                        <div className="flex items-center">
                            {couple.couple.members.map(member => (
                                    <div key={member.id} className="w-10 h-10 bg-lightGreen rounded-full flex items-center justify-center last:mr-0  last:-translate-x-2 border-2 border-white "
                                         style={{ backgroundImage: `url(${member.profilePicture || ''})` }}
                                 ></div>

                            //   <img
                            //     key={member.id}
                            //     src={member.profilePicture || ''}
                            //     alt={`${member.firstName} ${member.lastName}`}
                            //     className="w-12 h-12 rounded-full border-2 border-white -mr-4 last:mr-0 bg-lightGreen"
                            //   />
                            ))}
                        </div>
                        <div className="ml-4 font-normal">
                            {couple.couple.members.map((member, idx) => (
                                <span key={member.id} className="text-sm">
                                    {member.firstName.charAt(0)}. {member.lastName}
                                    {idx < couple.couple.members.length - 1 && ' & '}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="text-2xl font-bold">{couple.matchesWon}</div>
                </div>
            ))}
        </div>
    </SubContainer>
);
};

// Helper function to sort couples by matchesWon
function sortCouplesByMatchesWon(couples) {
  return couples.sort((a, b) => b.matchesWon - a.matchesWon);
}

export default Leaderboard;