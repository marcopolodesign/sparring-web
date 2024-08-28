import React, { useEffect, useState } from 'react'
import Nav from '../components/fuba/Nav'
import { getTournamentGroups } from '../api/functions'
import { Header } from '../styled';

import { Link } from 'react-router-dom';


const Torneo = () => {

    const [groups, setGroups] = useState(null);

    const tournament = JSON.parse(localStorage.getItem('tournament'));

    useEffect(() => {
        const fetchTournaments = async () => {
          try {
            const groups = await getTournamentGroups(1);
            // console.log(groups);
            setGroups(groups);
          } catch (error) {
            console.error('Error fetching groups:', error.message);
          }
        };
    
        fetchTournaments();
      }
      , []);

    if (!groups) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-blue container mx-auto">
            <div className="py-12">
                <h1 className="!text-white uppercase text-center text-5xl font-display">{tournament?.attributes.name}: Clasificación</h1>
                <Link to="/partidos" className="!text-white text-center text-lg font-body mx-auto block" >Ver mis partidos</Link>
            </div>
            <div className="flex flex-col gap-10 w-screen">
                {groups.map((group) => (
                    <div key={group.id}>
                        <h2 className="text-xl text-body text-white pl-6">{group.groupName}</h2>
                        <ul className="flex w-full gap-8 overflow-scroll pl-6">
                        {group.matches.map((match) => {
                                return (
                                    !match.score ? (
                                        <div key={match.id} className="bg-white rounded-md p-4 my-2 flex flex-col justify-start items-start gap-3">
                                            {match.couples.map((couple, index) => (
                                                <div key={index} className="flex flex-col items-start">
                                                    <div className="flex items-center">
                                                        <div className="w-[40%]">
                                                        <div className="flex items-center justify-center">
                                                            <div className="w-10 h-10 bg-lightGreen rounded-full flex items-center justify-center border-2 border-white translate-x-1"
                                                                style={{ backgroundImage: `url(${couple.members[0].profilePicture || ''})` }}
                                                            ></div>
                                    
                                                            <div className="w-10 h-10 bg-lightGreen rounded-full flex items-center justify-center border-2 border-white -translate-x-1"
                                                                style={{ backgroundImage: `url(${couple.members[1].profilePicture || ''})` }}
                                                            ></div>
                                                        </div>
                                                        <div className="flex flex-col items-center text-center">
                                                            <p>{couple.members[0].firstName}</p>
                                                            <p>{couple.members[1].firstName}</p>
                                                        </div>

                                                        </div>

                                                        <div className="flex gap-3 ml-12">
                                                            {couple.sets.map((set, index) => (
                                                                console.log(set.gamesWon),
                                                               <div key={index} className={`flex items-center`}>
                                                                    <p className={`font-display text-6xl text-gray-300 ${set.gamesWon === 6 ? '!text-darkGreen underline' : ''}`}>{set.gamesWon}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* Add a divider "VS" between the couples, except after the last couple */}
                                                    {index < match.couples.length - 1 && (
                                                        <div className="flex items-center mt-3 w-full gap-2">
                                                            {/* <p className="bg-lightGreen text-black p-2 rounded-md text-center w-max">VS</p> */}
                                                            <span className="bg-gray-500 h-[1px] w-full block"></span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : null 
                                );
                            })}
                            {/* {group.teams.map((team) => (
                                <li key={team.id}>{team.name}</li>
                            ))} */}
                        </ul>
                    </div>
                ))}
            </div>
        <Nav />
        </div>
    )
}

export default Torneo