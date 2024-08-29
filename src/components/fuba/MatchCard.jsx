import React from 'react'

const MatchCard = ({match}) => {
  return (
    <div key={match.id} className="bg-white rounded-md p-4 my-2 flex flex-col justify-center items-start gap-3 ">
    {match.couples.map((couple, index) => (
        <div key={index} className="flex flex-col items-start">
            <div className="flex items-center">
                <div className="min-w-[110px] mr-12">
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 bg-lightGreen rounded-full flex items-center justify-center border-2 border-white translate-x-1"
                            style={{ backgroundImage: `url(${couple.members[0].profilePicture || ''})` }}
                        ></div>

                        <div className="w-10 h-10 bg-lightGreen rounded-full flex items-center justify-center border-2 border-white -translate-x-1"
                            style={{ backgroundImage: `url(${couple.members[1].profilePicture || ''})` }}
                        ></div>
                    </div>
                    <div className="flex flex-col items-center text-center ">
                        <p className='break-keep'>{couple.members[0].firstName.charAt(0)}. {couple.members[0].lastName}</p>
                        <p className='break-keep'>{couple.members[1].firstName.charAt(0)}. {couple.members[1].lastName}</p>
                    </div>

                </div>

                <div className="flex gap-3">
                    {couple.sets.map((set, index) => (
                        console.log(set.gamesWon),
                        <div key={index} className={`flex items-center`}>
                            <p className={`font-display text-6xl text-gray-300 ${set.gamesWon === 6 ? '!text-darkGreen underline' : ''}`}>{set.gamesWon}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Add a divider "VS" between the couples, except after the last couple */}
            {index < match.couples.length - 1 && (
                <div className="flex items-center mt-3 w-full gap-2">
                    {/* <p className="bg-lightGreen text-black p-2 rounded-md text-center w-max">VS</p> */}
                    <span className="bg-gray-500 h-[1px] w-full block"></span>
                </div>
            )}
        </div>
    ))}
</div>
  )
}

export default MatchCard;