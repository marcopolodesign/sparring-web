import React, { useEffect, useState } from 'react';
import Nav from '../components/fuba/Nav';
import { useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { getQuarterfinalMatches, getSemifinalMatches, getFinalMatches } from '../api/functions'; // API function to fetch quarterfinals
import { Header } from '../styled';
import { Link } from 'react-router-dom';
import MatchCardKnockout from '../components/fuba/MatchCardKnockout';
import Fupa from '../assets/icons/fupa.svg'
import Logo from '../assets/icons/logo.svg'

const Quarterfinals = () => {
    const [quarterfinals, setQuarterfinals] = useState(null);
    const [semifinals, setSemiFinals] = useState(null);
    const [final, setFinal] = useState(null);

    // const tournament = JSON.parse(localStorage.getItem('tournament')) || 1;
    // const user = JSON.parse(localStorage.getItem('user'));

    const [searchParams] = useSearchParams();
    const tournamentId = searchParams.get('tournament_id') || 1;



    useEffect(() => {
        const fetchQuarterfinals = async () => {
            try {
                const data = await getQuarterfinalMatches(tournamentId, 36); // Fetch quarterfinal matches
                console.log(data, 'quarters')
                setQuarterfinals(data); // Save the quarterfinal matches in the state
            } catch (error) {
                console.error('Error fetching quarterfinals:', error.message);
            }
        };

        fetchQuarterfinals();

        const fetchSemis = async () => {
          try {
              const data = await getSemifinalMatches(tournamentId, 36); // Fetch semis matches
              console.log(data, 'semis')
              setSemiFinals(data); // Save the quarterfinal matches in the state
          } catch (error) {
              console.error('Error fetching semis:', error.message);
          }
      };

      fetchSemis();


      const fetchFinal = async () => {
        try {
            const data = await getFinalMatches(tournamentId, 36); // Fetch final matches
            console.log(data, 'final')
            setFinal(data); // Save the quarterfinal matches in the state
        } catch (error) {
            console.error('Error fetching finals:', error.message);
        }
    };

    fetchFinal();

    }, []);

    if (!quarterfinals || !semifinals || !final) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-blue mx-auto">
             <div className="py-12 flex justify-between items-center px-6">
                <div className="flex items-center gap-10">
                <div className="w-32 h-32 flex items-center justify-center p-3 bg-[#312FBC] rounded-full relative z-10 border-2 border-white gap-5">
                     <img src={Fupa} alt="logo" className="m-auto"/>
                 </div>
                <h1 className="!text-white uppercase text-center text-5xl font-display">
                    FUPA {quarterfinals.goldenCupMatches?.length > 0 ? 'Copa de Oro' : 'Copa de Plata'}
                </h1>
                </div>
              
                <div className="w-36 h-36 flex items-center justify-center">
                     <img src={Logo} alt="logo" className="m-auto"/>
                 </div>

{/*               
                <Link to="/fupa/partidos" className="!text-white text-center text-lg font-body mx-auto block">
                    Ver mis partidos
                </Link> */}
            </div>

            <div className="flex flex-col gap-10 w-screen pb-10">
                {quarterfinals.goldenCupMatches?.length > 0 && (
                    <div>
                        <h2 className="text-xl text-body text-white text-center">Cuartos de Final</h2>
                        <ul className="flex w-full gap-8 overflow-scroll pl-6 last:pr-6 justify-around">
                            {quarterfinals.goldenCupMatches.map((match) => (
                              <>
                              {console.log(match)}
                                <MatchCardKnockout gamesToWin={4} match={match} key={match.id} user={'user'} />
                                </>
                            ))}
                        </ul>
                    </div>
              )}

              
            </div>

            <div className="flex flex-col gap-2 w-screen pb-10">
            <h2 className="text-xl text-body text-white text-center">Semi Finales</h2>
                {semifinals.goldenCupSemifinals?.length > 0 && (
                    <div>
                       
                        <ul className="flex w-full gap-8 overflow-scroll pl-6 last:pr-6 justify-around">
                            {semifinals.goldenCupSemifinals.map((match) => (
                              <>
                              {console.log(match)}
                                <MatchCardKnockout gamesToWin={4} match={match} key={match.id} user={'user'} />
                                </>
                            ))}
                        </ul>
                    </div>
                )}

               
            </div>

            <div className="flex flex-col gap-10 w-screen pb-60">
            <h2 className="text-xl text-body text-white text-center">Final</h2>
                {final.goldenCupFinal?.length > 0 && (
                    <div>
                        <ul className="flex w-full gap-8 overflow-scroll justify-center">
                            {final.goldenCupFinal.map((match) => (
                              <>
                              {console.log(match)}
                                <MatchCardKnockout gamesToWin={6} match={match} key={match.id} user={'user'} />
                                </>
                            ))}
                        </ul>
                    </div>
                )}

              
            </div>
        </div>
    );
};

export default Quarterfinals;