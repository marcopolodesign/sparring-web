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
                        <ul className="flex w-full gap-5 overflow-scroll pl-6">
                            {group.matches.map((match) => {
                                return (
                                    console.log(match),
                                    !match.score ? (
                                        <div key={match.match.id} className="bg-white rounded-md p-5 my-2 flex flex-col justify-center items-center gap-5">
                                           
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center justify-center">
                                                    <div className="w-20 h-20 bg-lightGreen rounded-full flex items-center justify-center border-2 border-white translate-x-3"
                                                        style={{ backgroundImage: `url(${match.match.member_1.profilePicture ||'' })` }}
                                                    ></div>

                                                    <div className="w-20 h-20 bg-lightGreen rounded-full flex items-center justify-center border-2 border-white -translate-x-3"
                                                        style={{ backgroundImage: `url(${match.match.member_2.profilePicture ||'' })` }}
                                                    ></div>

                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <p>{match.match.member_1.firstName} &</p>
                                                    <p>{match.match.member_2.firstName}</p>
                                                </div>
                                            </div> 
                                          

                                            <p className="bg-lightGreen text-black p-2 rounded-md text-center w-max">VS</p>


                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center justify-center">
                                                    <div className="w-20 h-20 bg-lightGreen rounded-full flex items-center justify-center border-2 border-white translate-x-3"
                                                        style={{ backgroundImage: `url(${match.match.member_3.profilePicture ||'' })` }}
                                                    ></div>

                                                    <div className="w-20 h-20 bg-lightGreen rounded-full flex items-center justify-center border-2 border-white -translate-x-3"
                                                        style={{ backgroundImage: `url(${match.match.member_4.profilePicture ||'' })` }}
                                                    ></div>

                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <p>{match.match.member_3.firstName} &</p>
                                                    <p>{match.match.member_4.firstName}</p>
                                                </div>
                                            </div> 
                                       
                                        </div>
                                    ) : '' 
                                )
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