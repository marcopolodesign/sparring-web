import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get tournamentId from the URL
import Loading from '../components/Loading';
import { getSixteenMatches, getQuarterfinalMatches, getSemifinalMatches, getFinalMatches, getCurrentTournament } from '../api/functions'; // API functions to fetch match data
import MatchCardKnockout from '../components/fuba/MatchCardKnockout';
import Fupa from '../assets/icons/fupa.svg';
import Logo from '../assets/icons/logo.svg';
import { useSearchParams } from 'react-router-dom';

const GoldenCup = () => {
    const [searchParams] = useSearchParams();
    const tournamentId = searchParams.get('tournament_id') || 1;   
    const [sixteen, setSixteen] = useState(null);
    const [quarterfinals, setQuarterfinals] = useState(null);
    const [semifinals, setSemiFinals] = useState(null);
    const [final, setFinal] = useState(null);
    const [tournament, setTournament] = useState(null);


    useEffect(() => {
        const fetchTournaments = async () => {
          try {
             const tournaments = await getCurrentTournament(tournamentId);
            setTournament(tournaments);
            console.log(tournaments, 'torneo completo');
          } catch (error) {
            console.error('Error fetching groups:', error.message);
          }
        };
    
        fetchTournaments();
        const interval = setInterval(fetchTournaments, 60000); // 1 minute in milliseconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
      }
      , [tournamentId]);

      useEffect(() => {

        const fetchSixteenfinals = async () => {
            try {
                const data = await getSixteenMatches(tournamentId); // Fetch quarterfinal matches
                console.log(data, 'sixteen')
                setSixteen(data); // Save the quarterfinal matches in the state
            } catch (error) {
                console.error('Error fetching quarterfinals:', error.message);
            }
        };


        fetchSixteenfinals();
        const fetchQuarterfinals = async () => {
            try {
                const data = await getQuarterfinalMatches(tournamentId); // Fetch quarterfinal matches
                console.log(data, 'quarters')
                setQuarterfinals(data); // Save the quarterfinal matches in the state
            } catch (error) {
                console.error('Error fetching quarterfinals:', error.message);
            }
        };

        fetchQuarterfinals();

        const fetchSemis = async () => {
          try {
              const data = await getSemifinalMatches(tournamentId); // Fetch semis matches
              console.log(data, 'semis')
              setSemiFinals(data); // Save the quarterfinal matches in the state
          } catch (error) {
              console.error('Error fetching semis:', error.message);
          }
      };

      fetchSemis();


      const fetchFinal = async () => {
        try {
            const data = await getFinalMatches(tournamentId); // Fetch final matches
            console.log(data, 'final')
            setFinal(data); // Save the quarterfinal matches in the state
        } catch (error) {
            console.error('Error fetching finals:', error.message);
        }
    };

    fetchFinal();

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
    }, [sixteen, quarterfinals, semifinals, final]); // Run effect when matches data is available


    if (!sixteen || !quarterfinals || !semifinals || !final || !tournament) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-blue mx-auto">
          <div className="py-2 px-6 flex flex-col sm:flex-row items-center justify-between">
                <div>
                    <h1 className="!text-white uppercase text text-5xl font-display text-center sm:text-left">{tournament?.attributes?.name}: Eliminación</h1>
                    {tournament?.attributes?.venue && (
                        <p className="text-white text text-2xl text-center sm:text-left">{tournament?.attributes?.venue?.data?.attributes?.name}</p>
                    )}
                </div>

                <div className="flex items-center gap-5">
                    {/* {tournament?.attributes?.logo?.data && (
                        <div className="w-36 h-36 flex items-center justify-center">
                            <img src={tournament?.attributes?.logo?.data?.attributes?.url} alt="logo" className="m-auto"/>
                        </div>
                    )}


                    {tournament.attributes?.main_sponsors?.data?.length > 0 && (
                        <div className="flex flex-wrap gap-5 items-center justify-center">
                            {tournament.attributes?.main_sponsors?.data?.map((sponsor) => (
                                <div className="w-36 h-36 flex items-center justify-center" key={sponsor.id}>
                                    <img 
                                        src={sponsor?.attributes?.url} 
                                        alt={sponsor?.attributes?.name || 'Sponsor'} 
                                        className="m-auto object-contain w-full h-full" 
                                    />
                                </div>
                            ))}
                        </div>
                    )} */}
                    <div className="w-36 h-36 flex items-center justify-center">
                        <img src={Logo} alt="logo" className="m-auto"/>
                    </div>

                 </div>
              
            </div>
            {/* Round of Sixteen */}
            <div className="flex flex-col gap-10 w-screen pb-10">
                <h2 className="text-xl text-body text-white text-center">Octavos de Final</h2>
                {sixteen.goldenCupMatches?.length > 0 && (
                    <ul className="flex w-full gap-8 overflow-scroll justify-around">
                        {sixteen.goldenCupMatches?.map((match) => (
                            <MatchCardKnockout gamesToWin={3} match={match} key={match.id} />
                        ))}
                    </ul>
                )}
            </div>

            {/* Quarterfinals */}
            <div className="flex flex-col gap-10 w-screen pb-10">
                <h2 className="text-xl text-body text-white text-center">Cuartos</h2>
                {quarterfinals.goldenCupMatches?.length > 0 && (
                    <ul className="flex w-full gap-8 overflow-scroll justify-around">
                        {quarterfinals.goldenCupMatches?.map((match) => (
                            <MatchCardKnockout gamesToWin={4} match={match} key={match.id} />
                        ))}
                    </ul>
                )}
            </div>

            {/* Semifinals */}
            <div className="flex flex-col gap-10 w-screen pb-10">
                <h2 className="text-xl text-body text-white text-center">Semi Finales</h2>
                {semifinals.goldenCupMatches?.length > 0 && (
                    <ul className="flex w-full gap-8 overflow-scroll justify-around">
                        {semifinals.goldenCupMatches?.map((match) => (
                            <MatchCardKnockout gamesToWin={4} match={match} key={match.id} />
                        ))}
                    </ul>
                )}
            </div>

            {/* Final */}
            <div className="flex flex-col gap-10 w-screen pb-60">
                <h2 className="text-xl text-body text-white text-center">Final</h2>
                {final.goldenCupMatches?.length > 0 && (
                    <ul className="flex w-full gap-8 overflow-scroll justify-center">
                        {final.goldenCupMatches?.map((match) => (
                            <MatchCardKnockout gamesToWin={6} match={match} key={match.id} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default GoldenCup;