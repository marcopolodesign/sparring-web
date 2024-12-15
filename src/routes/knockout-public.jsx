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
    const [semifinals, setSemifinals] = useState(null);
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
        const fetchAllMatches = async () => {
            try {
                // Fetch round of sixteen matches
                const sixteenMatches = await getSixteenMatches(tournamentId);
                setSixteen(sixteenMatches);
                console.log(sixteenMatches, '16');

                // Fetch quarterfinal matches
                const quarterfinalMatches = await getQuarterfinalMatches(tournamentId);
                setQuarterfinals(quarterfinalMatches);

                // Fetch semifinal matches
                const semifinalMatches = await getSemifinalMatches(tournamentId);
                setSemifinals(semifinalMatches);

                // Fetch final matches
                const finalMatches = await getFinalMatches(tournamentId);
                setFinal(finalMatches);
            } catch (error) {
                console.error('Error fetching matches:', error.message);
            }
        };

        fetchAllMatches();
    }, [tournamentId]); // Re-run effect if the tournamentId changes

    if (!sixteen || !quarterfinals || !semifinals || !final) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-blue mx-auto">
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
            {/* Round of Sixteen */}
            <div className="flex flex-col gap-10 w-screen pb-10">
                <h2 className="text-xl text-body text-white text-center">Round of Sixteen</h2>
                {sixteen.length > 0 && (
                    <ul className="flex w-full gap-8 overflow-scroll justify-around">
                        {sixteen.map((match) => (
                            <MatchCardKnockout gamesToWin={3} match={match} key={match.id} />
                        ))}
                    </ul>
                )}
            </div>

            {/* Quarterfinals */}
            <div className="flex flex-col gap-10 w-screen pb-10">
                <h2 className="text-xl text-body text-white text-center">Quarterfinals</h2>
                {quarterfinals.length > 0 && (
                    <ul className="flex w-full gap-8 overflow-scroll justify-around">
                        {quarterfinals.map((match) => (
                            <MatchCardKnockout gamesToWin={4} match={match} key={match.id} />
                        ))}
                    </ul>
                )}
            </div>

            {/* Semifinals */}
            <div className="flex flex-col gap-10 w-screen pb-10">
                <h2 className="text-xl text-body text-white text-center">Semifinals</h2>
                {semifinals.length > 0 && (
                    <ul className="flex w-full gap-8 overflow-scroll justify-around">
                        {semifinals.map((match) => (
                            <MatchCardKnockout gamesToWin={4} match={match} key={match.id} />
                        ))}
                    </ul>
                )}
            </div>

            {/* Final */}
            <div className="flex flex-col gap-10 w-screen pb-60">
                <h2 className="text-xl text-body text-white text-center">Final</h2>
                {final.length > 0 && (
                    <ul className="flex w-full gap-8 overflow-scroll justify-center">
                        {final.map((match) => (
                            <MatchCardKnockout gamesToWin={6} match={match} key={match.id} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default GoldenCup;