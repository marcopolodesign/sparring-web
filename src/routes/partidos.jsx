import React, { useEffect, useState } from 'react'
import Nav from '../components/fuba/Nav'
import {getGroupDetails} from '../api/functions'
import { Header } from '../styled';
import MatchCard from '../components/fuba/MatchCard';
import Leaderboard from '../components/fuba/Leaderboard';
const Partidos = () => {

    const [group, setGroup] = useState(null);
    const [partner, setPartner] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user, 'testing')

    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const groupInfo = await getGroupDetails(1,36);
            console.log(groupInfo);
            setPartner(groupInfo.matchedCouple.otherMember);
            console.log(partner);
            setGroup(groupInfo);
          } catch (error) {
            console.error('Error fetching groups:', error.message);
          }
        };
    
        fetchUserDetails();
      }
        , []);

    if (!group || !partner) {
        return <div>Loading...</div>;
    }

    const firstName = user.firstName.split(' ')[0];

    return (
        <div className="min-h-screen bg-blue container mx-auto py-12 flex flex-col gap-10 pb-28">
            <div className="flex gap-5 justify-center items-center">
                <img src={user.profilePicture.url} alt="profile" className="w-24 h-24 rounded-full border-2 border-white" />
                <div className="flex flex-col mt-2">
                    <Header className="uppercase !text-white">Hola {firstName}!</Header>
                    <p className="text-white text-center">Tu compañero: <span className="text-lightGreen">{partner.firstName} {partner.lastName}</span></p>
                </div>
            </div>

            <div>
                <h2 className="!text-white font-semibold px-6">{group.group.name} — Partidos</h2>
                    <ul className="flex w-full gap-8 overflow-scroll pl-6 last:pr-6 ">
                    {group.matches.map((match) => {
                            return (
                                <MatchCard match={match} key={match.id} />
                            );
                        })}
                    </ul>
            </div>

            <div>
                <h2 className="!text-white font-semibold px-6">Tabla de posiciones</h2>
                <Leaderboard />
            </div>


        
             <Nav />
        </div>
    )
}

export default Partidos