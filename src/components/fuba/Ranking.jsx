import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import { useSearchParams } from 'react-router-dom';

import { getTournamentResults, getGroupResults, getIndividualTournamentLeaderboard } from '../../api/functions';
import { SubContainer } from '../../styled';

const Leaderboard = ({ isGroup, userId, isLeaderboard }) => {
  const [players, setPlayers] = useState(null);
  const [searchParams] = useSearchParams();

  // Extract the 'tournament_id' param
  const tournamentId = searchParams.get('tournament_id') || 1;

  console.log('Tournament ID:', tournamentId);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
          // Fetch individual leaderboard results
          const response = await getIndividualTournamentLeaderboard(tournamentId);
          console.log('Leaderboard Response:', response);
      
        // Set the players data based on the response format
        setPlayers(response);
      } catch (error) {
        console.error('Error fetching tournament results:', error.message);
      }
    };

    if (tournamentId) {
      fetchPlayers(); // Only call fetchPlayers if tournamentId is defined
    }
  }, [tournamentId, isGroup, userId, isLeaderboard]); // Ensure all dependencies are included

  // If players data is not available yet, return a loading state
  if (!players) {
    return <Loading />;
  }

  // Helper function to format player names
  const formatPlayerName = (player) =>
    `${player.firstName.charAt(0)}. ${player.lastName}`;

  return (
    <div className="py-12 bg-blue px-2">
      <div className="container mx-auto">
    <SubContainer className="p-8 mx-6 bg-white">
      <div className="flex justify-between text-md text-textGrey font-normal border-b pb-2">
        <span>Jugadores</span>
        <span>Puntos</span>
      </div>
      <div className="mt-4">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b last:border-b-0 first:pt-0"
          >
            <div className="flex items-center">
              <div className="text-sm font-normal mr-4 font-body text-textGrey">
                {index + 1}
              </div>
              <div className="w-10 h-10 bg-lightGreen rounded-full flex items-center justify-center border-2 border-white bg-cover bg-center"
                   style={{ backgroundImage: `url(${player.profilePicture || ''})` }}
              ></div>
              <div className="ml-4 font-normal">
                <span className="text-sm line-clamp-2">
                  {formatPlayerName(player)}
                </span>
              </div>
            </div>
            <div className="text-2xl font-display font-bold">
              {player.points || 0}
            </div>
          </div>
        ))}
      </div>
    </SubContainer>
    </div>
    </div>
  );
};

export default Leaderboard;