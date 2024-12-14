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



    const [isSponsorVisible, setIsSponsorVisible] = useState(false);

    useEffect(() => {
        // Function to toggle the visibility of the sponsor div
        const toggleSponsorVisibility = () => {
            setIsSponsorVisible(true);

            // Hide the sponsor div after it has been shown for 10 seconds
            setTimeout(() => {
                setIsSponsorVisible(false);
            }, 10000); // 10 seconds
        };

        // Set interval to showcase the div every 5 minutes
        const interval = setInterval(toggleSponsorVisibility, 300000); // 5 minutes in milliseconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

      
    
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

    useEffect(() => {
        const isMobile = window.innerWidth <= 768; // Define mobile width threshold

        if (!isMobile) {
            const groupContainers = document.querySelectorAll('.group-matches-container');
            
            groupContainers.forEach(container => {
                const matches = Array.from(container.querySelectorAll('.match'));
        
                // Filter matches where at least one "set-result" is greater than 1
                const validMatches = matches.filter(match => {
                    return Array.from(match.querySelectorAll('.set-result')).some(set => {
                        const result = parseInt(set.textContent.trim(), 10);
                        console.log(result, 'RESULTADO');
                        return result > 1; // Match is valid if any set-result is greater than 1
                    });
                });
        
                // Hide the entire container if no valid matches exist
                if (validMatches.length === 0) {
                    container.style.display = 'none'; // Hide the container
                    return;
                }
        
                let currentIndex = 0;
        
                // Hide all matches initially
                validMatches.forEach(match => (match.style.display = 'none'));
        
                console.log(validMatches, 'valid matches');
        
                // Function to showcase matches one by one
                function showcaseNextMatch() {
                    if (validMatches.length === 0) return;
        
                    // Hide the current match
                    validMatches[currentIndex].style.display = 'none';
        
                    // Move to the next match or loop back to the first
                    currentIndex = (currentIndex + 1) % validMatches.length;
        
                    // Show the next match
                    validMatches[currentIndex].style.display = 'block';
        
                    // Schedule the next transition
                    setTimeout(showcaseNextMatch, 3000); // 3000ms = 3 seconds pause
                }
        
                // Start showcasing matches
                if (validMatches.length > 0) {
                    validMatches[0].style.display = 'block';
                    setTimeout(showcaseNextMatch, 3000);
                }
            });
        }
    }, [groups]);

    if (!groups) {
     return <Loading />
    }



 
    return (
        <div className="min-h-screen bg-blue mx-auto pb-20">
            {/* {console.log(tournament.attributes.golden_cup, 'torneo completo')} */}
            <div className="py-2 px-6 flex flex-col sm:flex-row items-center justify-between">
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
            <div className="flex flex-col gap-5 w-screen pb-40">
                {groups.map((group) => (
                    <div key={group.id} className="group-matches-container">
                        <h2 className="text-xl text-body text-white pl-6">{group.groupName}
                        </h2>
                        <ul className="flex w-full gap-8 overflow-scroll pl-6 last:pr-6">
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


            {isSponsorVisible && tournament.attributes?.sponsors?.data && (
                <div className="bg-white px-10 py-5 flex flex-wrap items-center justify-between fixed top-0 left-0 w-screen h-screen">

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