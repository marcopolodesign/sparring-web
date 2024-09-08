import React, { useEffect, useState } from 'react';
import Nav from '../components/fuba/Nav';
import Loading from '../components/Loading';
import { getQuarterfinalMatches, getSemifinalMatches, getFinalMatches } from '../api/functions'; // API function to fetch quarterfinals
import { Header } from '../styled';
import { Link } from 'react-router-dom';
import MatchCardKnockout from '../components/fuba/MatchCardKnockout';

const Quarterfinals = () => {
    const [quarterfinals, setQuarterfinals] = useState(null);
    const [semifinals, setSemiFinals] = useState(null);

    // const tournament = JSON.parse(localStorage.getItem('tournament')) || 1;
    // const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchQuarterfinals = async () => {
            try {
                const data = await getQuarterfinalMatches(1, 39); // Fetch quarterfinal matches
                console.log(data, 'quarters')
                setQuarterfinals(data); // Save the quarterfinal matches in the state
            } catch (error) {
                console.error('Error fetching quarterfinals:', error.message);
            }
        };

        fetchQuarterfinals();

        const fetchSemis = async () => {
          try {
              const data = await getSemifinalMatches(1, 39); // Fetch quarterfinal matches
              console.log(data, 'quarters')
              setSemiFinals(data); // Save the quarterfinal matches in the state
          } catch (error) {
              console.error('Error fetching quarterfinals:', error.message);
          }
      };

      fetchSemis();

    }, []);

    if (!quarterfinals) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-blue mx-auto">
            <div className="py-12">
                <h1 className="!text-white uppercase text-center text-5xl font-display">
                FUPA {quarterfinals.goldenCupMatches?.length > 0 ? 'Copa de Oro' : 'Copa de Plata'}
                </h1>
                {/* <Link to="/fupa/partidos" className="!text-white text-center text-lg font-body mx-auto block">
                    Ver mis partidos
                </Link> */}
            </div>

            <div className="flex flex-col gap-10 w-screen pb-40">
                {quarterfinals.goldenCupMatches?.length > 0 && (
                    <div>
                        <h2 className="text-xl text-body text-white pl-6">Cuartos de Final</h2>
                        <ul className="flex w-full gap-8 overflow-scroll pl-6 last:pr-6">
                            {quarterfinals.goldenCupMatches.map((match) => (
                              <>
                              {console.log(match)}
                                <MatchCardKnockout match={match} key={match.id} user={'user'} />
                                </>
                            ))}
                        </ul>
                    </div>
              )}

                {quarterfinals.silverCupMatches?.length > 0 && (
                    <div>
                        <h2 className="text-xl text-body text-white pl-6">Silver Cup Quarterfinals</h2>
                        <ul className="flex w-full gap-8 overflow-scroll pl-6 last:pr-6">
                            {quarterfinals.silverCupMatches.map((match) => (
                                <MatchCardKnockout match={match} key={match.id} user={'user'} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-10 w-screen pb-40">
            <h2 className="text-xl text-body text-white pl-6">Semi Finales</h2>
                {semifinals.goldenCupMatches?.length > 0 && (
                    <div>
                       
                        <ul className="flex w-full gap-8 overflow-scroll pl-6 last:pr-6">
                            {quarterfinals.goldenCupMatches.map((match) => (
                              <>
                              {console.log(match)}
                                <MatchCardKnockout match={match} key={match.id} user={'user'} />
                                </>
                            ))}
                        </ul>
                    </div>
                )}

                {semifinals.silverCupMatches?.length > 0 && (
                    <div>
                        <h2 className="text-xl text-body text-white pl-6">Silver Cup Quarterfinals</h2>
                        <ul className="flex w-full gap-8 overflow-scroll pl-6 last:pr-6">
                            {quarterfinals.silverCupMatches.map((match) => (
                                <MatchCardKnockout match={match} key={match.id} user={'user'} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-10 w-screen pb-40">
            <h2 className="text-xl text-body text-white pl-6">Final</h2>
                {semifinals.goldenCupMatches?.length > 0 && (
                    <div>
                       
                        <ul className="flex w-full gap-8 overflow-scroll pl-6 last:pr-6">
                            {quarterfinals.goldenCupMatches.map((match) => (
                              <>
                              {console.log(match)}
                                <MatchCardKnockout match={match} key={match.id} user={'user'} />
                                </>
                            ))}
                        </ul>
                    </div>
                )}

                {semifinals.silverCupMatches?.length > 0 && (
                    <div>
                        <h2 className="text-xl text-body text-white pl-6">Silver Cup Quarterfinals</h2>
                        <ul className="flex w-full gap-8 overflow-scroll pl-6 last:pr-6">
                            {quarterfinals.silverCupMatches.map((match) => (
                                <MatchCardKnockout match={match} key={match.id} user={'user'} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quarterfinals;