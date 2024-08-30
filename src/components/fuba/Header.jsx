import React from 'react';
import { Divider, Header, SubContainer } from '../../styled';
import Loading from '../Loading';
import Fupa from '../../assets/icons/fupa.svg'
import Calendar from '../../assets/icons/calendar.svg'

import Players from './Players'

const HeaderTournament = (props) => {
    const tournament = props.tournament?.attributes;
    const tournamentId = props.tournament?.id;

    if (!tournament) {
        return <Loading />; // You can replace this with a more sophisticated loading spinner or message
    }

    // console.log(tournament, 'TOURNAMENT');

    const endDate = tournament.end_date;
    const dateEndObject = new Date(endDate);
    const endDay = dateEndObject.getUTCDate();

    const startDate = tournament.start_date;
    const dateStartObject = new Date(startDate);
    const startDay = dateStartObject.getUTCDate();
    
    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(dateStartObject);

    const deadline = tournament.registration_deadline;
    const deadlineDate = new Date(deadline);
    const deadlineDay = deadlineDate.getUTCDate();

    const deadlineMonth = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(deadlineDate);




    return (
    <>
        <div className="w-screen h-56 bg-darkGreen" 
        style={{
        backgroundImage: `url(${tournament?.cover?.data?.attributes?.url || ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'}}
        >
        </div>

        <div className="-translate-y-14 w-32 h-32 flex items-center justify-center p-3 bg-[#312FBC] rounded-full mx-auto relative z-10 border-2 border-white">
            <img src={Fupa} alt="logo" className="m-auto"/>
            {/* <img src={`${tournament?.logo?.data?.attributes?.url}`} alt="logo" className="w-24 h-24 rounded-full"/> */}
        </div>

        <div className="container mx-auto px-4 -translate-y-24">
            <SubContainer style={{backgroundColor: '#fff'}}>
                <p className="text-textGrey text-center text-xl font-normal mt-4 capitalize">{startDay} — {endDay} {monthName}</p>
                <Header className='!text-black text-center mt-2'>{tournament.name}</Header>
                <p className="text-textGrey text-center text-xl font-normal capitalize">{tournament.venue.data.attributes.name}, {tournament.location[0].address}</p>

                {tournament.sponsors.data.length > 0 && (
                    <>
                        <Divider className="mt-6" />
                        <div className="flex justify-between items-center py-6 px-2">
                            {tournament.sponsors.data.map((sponsor) => (
                                <div key={sponsor.id}>
                                    <img src={sponsor.attributes.url} alt={sponsor.attributes.name} />
                                </div>
                            ))}
                        </div>
                        {/* <Divider /> */}
                    </>
                )}
            </SubContainer>

            <SubContainer style={{backgroundColor: '#fff'}}>
                <p className="font-medium">{tournament.title}</p>
                <p className="text-textGrey">{tournament.description}</p>

                <div className="flex mt-5 items-center gap-2">
                    <img src={Calendar} alt="calendar"/>

                    <p className="text-sm">Fécha límite de inscripción : {deadlineDay} de {deadlineMonth} </p>
                </div>
            </SubContainer>

            <Players tournament={tournamentId} tournamentName={tournament.name} />
           
        </div>
    </>
  );
};

export default HeaderTournament;
