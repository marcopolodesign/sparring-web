/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import FriendBubble from './FriendBubble';
import { SubContainer } from '../../styled';
import { getTournamentPlayers } from '../../api/functions';

const Players = (props) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const participantsData = await getTournamentPlayers(props.tournament);
        setParticipants(participantsData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching tournaments:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (props.tournament) {
      fetchParticipants();
    }
  }, [props.tournament]);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error}</div>; // Error handling
  }

  if (!participants || participants.length === 0) {
    return <div>No participants found.</div>;
  }

  return (
    <SubContainer className='bg-white'>
      <p className="font-semibold text-black">Jugadores de {props.tournamentName}</p>

    <div className="w-full overflow-hidden">
      <div className="flex gap-4 mt-3 w-max">
        {participants.map((participant, index) => (
          <div className="flex flex-col gap-1 justify-center items-center" key={index}>
            {/* <img className="w-16 h-16 rounded-full bg-lightGreen" src={participant.profilePictureUrl} alt="profile" /> */}
            <div className="w-16 h-16 rounded-full bg-lightGreen bg-cover bg-center" style={{backgroundImage: `url(${participant.profilePictureUrl})`}}></div>
            <p className="flex flex-col items-center leading-[1] text-center line-clamp-1">
              <span>{participant.firstName}</span>
              {'\n'}
              <span>{participant.lastName}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
    
    </SubContainer>
  );
};

export default Players;
