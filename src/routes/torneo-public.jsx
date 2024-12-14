import React, { useEffect, useState } from 'react'
import Nav from '../components/fuba/Nav'
import Loading from '../components/Loading';
import { getTournamentGroups, getCurrentTournament } from '../api/functions'
import { Header } from '../styled';
import { useSearchParams } from 'react-router-dom';
import Logo from '../assets/icons/logo-v.svg'



import { Link } from 'react-router-dom';
import MatchCard from '../components/fuba/MatchCard';


const Torneo = () => {
    const [searchParams] = useSearchParams();
    const tournamentId = searchParams.get('tournament_id') || 1;
    const [tournament, setTournament] = useState(null);
    const [groups, setGroups] = useState(null);

    // const tournament = JSON.parse(localStorage.getItem('tournament')) || 1;

    const user = JSON.parse(localStorage.getItem('user'))


    useEffect(() => {
        const fetchTournaments = async () => {
          try {
            const groups = await getTournamentGroups(tournamentId);
            const tournaments = await getCurrentTournament(tournamentId);
            setTournament(tournaments);
            console.log(tournaments, 'torneo completo');
            setGroups(groups);
          } catch (error) {
            console.error('Error fetching groups:', error.message);
          }
        };
    
        fetchTournaments();
        const interval = setInterval(fetchTournaments, 60000); // 1 minute in milliseconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
      }
      , [tournamentId]);

    //   useEffect(() => {
    //     const interval = setInterval(() => {
    //         window.location.reload();
    //     }, 60000); // 1 minute in milliseconds

    //     return () => clearInterval(interval); // Cleanup interval on component unmount
    // }, []);



      
    
    const hideScrollbars = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            ::-webkit-scrollbar {
                display: none;
            }
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        `;
        document.head.appendChild(style);
    };

    
    useEffect(() => {
        const isMobile = window.innerWidth <= 768; // Define mobile width threshold

        if (!isMobile) {
            const ulElements = document.querySelectorAll('.group-matches-container');
            const scrollIntervals = new Map(); // Map to store intervals for each ulElement

            ulElements.forEach((ulElement) => {
                if (ulElement) {
                    const ulWidth = ulElement.scrollWidth;
                    const windowWidth = window.innerWidth - 100;

                    if (ulWidth > windowWidth) {
                        let scrollDirection = 1; // 1 for right, -1 for left
                        let scrollAmount = 0;
                        const maxScroll = ulWidth - windowWidth;

                        const startScrolling = () => {
                            const interval = setInterval(() => {
                                scrollAmount += 1 * scrollDirection; // Slow scrolling
                                ulElement.scrollLeft = scrollAmount;

                                if (scrollAmount >= maxScroll || scrollAmount <= 0) {
                                    clearInterval(scrollIntervals.get(ulElement));

                                    // Pause for 10 seconds
                                    setTimeout(() => {
                                        scrollDirection *= -1; // Reverse direction
                                        startScrolling(); // Resume scrolling after pause
                                    }, 10000); // Pause for 10 seconds
                                }
                            }, 30); // Adjust scrolling speed
                            scrollIntervals.set(ulElement, interval); // Store interval in Map
                        };

                        startScrolling(); // Start scrolling when component mounts
                    }
                }
            });

            hideScrollbars(); // Hide scrollbars

            // Cleanup function to clear all intervals
            return () => {
                scrollIntervals.forEach((interval) => clearInterval(interval)); // Clear all intervals
            };
        }
    }, [groups]);

    if (!groups) {
     return <Loading />
    }



 
    return (
        <div className="min-h-screen bg-blue mx-auto pb-20">
            {/* {console.log(tournament.attributes.golden_cup, 'torneo completo')} */}
            <div className="py-12 px-6 flex flex-col sm:flex-row items-center justify-between">
                <div>
                    <h1 className="!text-white uppercase text text-5xl font-display text-center sm:text-left">{tournament?.attributes?.name}: Clasificación</h1>
                    {tournament.attributes?.venue && (
                        <p className="text-white text text-2xl text-center sm:text-left">{tournament.attributes?.venue?.data?.attributes?.name}</p>
                    )}
                </div>

                <div className="flex items-center gap-5">
                    {tournament.attributes?.logo?.data && (
                        <div className="w-36 h-36 flex items-center justify-center">
                            <img src={tournament.attributes?.logo.data?.attributes?.url} alt="logo" className="m-auto"/>
                        </div>
                    )}


                    {tournament.attributes?.main_sponsors?.data?.length > 0 && (
                        <div className="flex flex-wrap gap-5 items-center justify-center">
                            {tournament.attributes?.main_sponsors?.data?.map((sponsor) => (
                                <div className="w-36 h-36 flex items-center justify-center" key={sponsor.id}>
                                    <img 
                                        src={sponsor.attributes?.url} 
                                        alt={sponsor.attributes?.name || 'Sponsor'} 
                                        className="m-auto object-contain w-full h-full" 
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="w-36 h-36 flex items-center justify-center">
                        <img src={Logo} alt="logo" className="m-auto"/>
                    </div>

                 </div>
              
            </div>
            <div className="flex flex-col gap-10 w-screen pb-40">
                {groups.map((group) => (
                    <div key={group.id}>
                        <h2 className="text-xl text-body text-white pl-6">{group.groupName}
                        </h2>
                        <ul className="flex w-full gap-8 overflow-scroll pl-6 last:pr-6 group-matches-container">
                        {group.matches.map((match) => {
                                return (
                                    <MatchCard match={match} key={match.id} user={user} />
                                );
                            })}
                            {/* {group.teams.map((team) => (
                                <li key={team.id}>{team.name}</li>
                            ))} */}
                        </ul>
                    </div>
                ))}
            </div>


            {tournament.attributes?.sponsors?.data && (
                <div className="bg-white px-10 py-5 rounded-lg flex flex-wrap items-center justify-between mx-6">

                {tournament.attributes?.sponsors?.data?.map((sponsor) => (
                    <div className="max-w-[30%] sm:max-w-[10%]"  key={sponsor.id}>
                        <img className="h-[40px] w-auto" src={sponsor.attributes?.url} alt={sponsor.attributes?.name} />
                    </div>
                ))}

                </div>
            )}
        </div>
    )
}

export default Torneo