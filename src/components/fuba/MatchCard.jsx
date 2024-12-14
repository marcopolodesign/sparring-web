import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams

const MatchCard = ({ match, user }) => {

  const searchParams = new URLSearchParams(location.search); // Parse query parameters
  const minGamesWon = searchParams.get('minGamesWon'); // Extract minGamesWon from query parameters



  useEffect(() => {
    const matches = document.querySelectorAll('.match'); // Select all match divs

    matches.forEach(match => {
      const childDivs = match.querySelectorAll('.match > div'); // Select child divs inside the match
      let winnerElement = null;
      let hasWinner = false;

      // Loop through child divs to find the one with at least 2 underline p elements
      childDivs.forEach(child => {
        const underlineCount = child.querySelectorAll('p.underline').length; // Count underline classes in p elements

        // Determine the winner if a child has at least 2 underline p elements
        if (underlineCount >= 1) {
          winnerElement = child;
          hasWinner = true;
        }
      });

      // If a winner is found, apply the classes
      if (hasWinner) {
        // Add the match-winner class to the child with at least 2 underline p elements
        if (winnerElement) {
          winnerElement.classList.add('match-winner');
        }

        // Add match-looser and opacity-50 class to the other child
        childDivs.forEach(child => {
          if (child !== winnerElement) {
            child.classList.add('match-looser', 'opacity-50');
          }
        });
      }
    });
  }, []);

  return (
    <div key={match.id} className="bg-white rounded-md p-4 my-2 flex flex-col justify-center items-start gap-3 match">
      {match.couples.map((couple, index) => (
        <div key={index} className="flex flex-col items-start ">
          <div className="flex items-center">
            <div className="min-w-[110px] mr-12">
              <div className="flex items-center justify-center">
                <div
                  className="w-10 h-10 bg-lightGreen rounded-full flex items-center justify-center border-2 border-white translate-x-1 bg-cover bg-center"
                  style={{ backgroundImage: `url(${couple.members[0].profilePicture || ''})` }}
                ></div>

                <div
                  className="w-10 h-10 bg-lightGreen rounded-full flex items-center justify-center border-2 border-white -translate-x-1 bg-cover bg-center"
                  style={{ backgroundImage: `url(${couple.members[1].profilePicture || ''})` }}
                ></div>
              </div>
              <div className="flex flex-col items-center text-center ">
                <p className='break-keep line-clamp-1'>
                  {couple.members[0].id === user?.id ? 'Vos' : `${couple.members[0].firstName.charAt(0)}. ${couple.members[0].lastName}`}
                </p>
                <p className='break-keep line-clamp-1'>
                  {couple.members[1].id === user?.id ? 'Vos' : `${couple.members[1].firstName.charAt(0)}. ${couple.members[1].lastName}`}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              {couple.sets.map((set, index) => (
                <div key={index} className={`flex items-center`}>
                  <p className={`font-display text-6xl text-gray-300 ${set.gamesWon >= parseInt(minGamesWon) ? '!text-darkGreen underline' : ''}`}>{set.gamesWon}</p>
                </div>
              ))}
            </div>
          </div>

          {index < match.couples.length - 1 && (
            <div className="flex items-center mt-3 w-full gap-2">
              <span className="bg-gray-500 h-[1px] w-full block"></span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MatchCard;