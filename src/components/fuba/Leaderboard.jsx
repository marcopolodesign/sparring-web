import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import { getTournamentResults, getGroupResults } from '../../api/functions';
import { SubContainer } from '../../styled';

const Leaderboard = ({isGroup, userId}) => {
  const [couples, setCouples] = useState(null);

  useEffect(() => {
    const fetchCouples = async () => {
      try {
        const response = !isGroup ? await getTournamentResults(1,36) : await getGroupResults(1,userId) ; // Replace with your actual endpoint
        !isGroup ? setCouples(response.data) : setCouples(response.data.results);
        console.log(response.data, 'GROUP RESULTSSS');
      } catch (error) {
        console.error('Error fetching tournament results:', error.message);
      }
    };

    fetchCouples();
  }, []);

  if (!couples) {
   return (<div></div>);
  }

  // const sortedCouples = sortCouplesByMatchesWon(couples);

return (
    <SubContainer className="p-8 mx-6 bg-white">
        <div className="flex justify-between text-md text-textGrey font-normal border-b pb-2">
            <span>Parejas</span>
            <span>Puntos</span>
        </div>
        <div className="mt-4">
            {couples.map((couple, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0 first:pt-0">
                    <div className="flex items-center">
                        <div className="text-sm font-normal mr-4 font-body text-textGrey">{index + 1}</div>
                        <div className="flex items-center">
                            {couple.couple.members.map(member => (
                                    <div key={member.id} className="w-10 h-10 bg-lightGreen rounded-full flex items-center justify-center last:mr-0  last:-translate-x-2 border-2 border-white  bg-cover bg-center "
                                         style={{ backgroundImage: `url(${member.profilePicture || ''})` }}
                                 ></div>
                            ))}
                        </div>
                        <div className="ml-4 font-normal">
                            {couple.couple.members.map((member, idx) => (
                                <span key={member.id} className="text-sm line-clamp-2">
                                    {member.firstName.charAt(0)}. {member.lastName}
                                    {idx < couple.couple.members.length - 1 && ' & '}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="text-2xl font-display font-bold">{couple.matchesWon}</div>
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