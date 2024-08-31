import React, { useEffect, useState } from 'react'
import Nav from '../components/fuba/Nav'
import Loading from '../components/Loading';
import { getTournamentGroups } from '../api/functions'
import { Header } from '../styled';

import { Link } from 'react-router-dom';
import MatchCard from '../components/fuba/MatchCard';


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
     return <Loading />
    }

    return (
        <div className="min-h-screen bg-blue container mx-auto">
            <div className="py-12">
                <h1 className="!text-white uppercase text-center text-5xl font-display">{tournament?.attributes.name}: Clasificación</h1>
                <Link to="/partidos" className="!text-white text-center text-lg font-body mx-auto block" >Ver mis partidos</Link>
            </div>
            <div className="flex flex-col gap-10 w-screen pb-40">
                {groups.map((group) => (
                    <div key={group.id}>
                        <h2 className="text-xl text-body text-white pl-6">{group.groupName}</h2>
                        <ul className="flex w-full gap-8 overflow-scroll pl-6 last:pr-6">
                        {group.matches.map((match) => {
                                return (
                                    <MatchCard match={match} key={match.id} />
                                );
                            })}
                            {/* {group.teams.map((team) => (
                                <li key={team.id}>{team.name}</li>
                            ))} */}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Torneo