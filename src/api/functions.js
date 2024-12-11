import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale'

// import { useSelector, useDispatch } from 'react-redux';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
// PROD TOKEN
const token = import.meta.env.VITE_TOKEN

// const API_BASE_URL = `http://192.168.68.108:1337/api`;
// const API_BASE_URL = `http://localhost:1337/api`;

// const token ='b403069951b818fd7064c24f35bd70b46bb9457fb2d9d3d3b75a9f49e471ef3f34a13975da1f3a32a738f263bbb45e1daeecea719fa9391af198182f9b51b032a038b6444608a922cac1228aa16bb172329ab0714e35f0ba5a186314087cc9afe5d32dbd8d90ccef6676837ff3ba839bdee91e7a03df4e5d844a2a7412e3ee4c'


console.log(import.meta.env.VITE_API_BASE_URL, 'URL functions.js')


// console.log(API_BASE_URL, 'URL functions.js')

// Create an axios instance with default headers
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`,
  },
});

// Example function to fetch a user by ID
export const fetchUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/${userId}?populate=*`, {
        });
        return response.data;
    
    } catch (error) {
        alert(`Error fetching user: ${error.message}`, error);
        throw error;
    }
};

// Example function to login
export const loginUser = async (username, password) => {

  // console.log(API_BASE_URL, 'URL USER')
  // console.log(`${API_BASE_URL}/auth/local`, 'URL USER FULL')
    try {
        const response = await axiosInstance.post('/auth/local', {
            identifier: username,
            password: password,
        });
        return response.data;
    } catch (error) {
      console.error('Error logging in:', error.response ? error?.response?.data?.error?.message : error.message);
      throw error;
    }
};

export const createUser = async (userDetails) => {
    try {
      const response = await axiosInstance.post(`/auth/local/register`, userDetails);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
};

export const uploadProfilePicture = async (userId, profilePicture) => {
    const formData = new FormData();
    formData.append('files', {
      uri: profilePicture,
      name: `${userId}.jpg'`,
      type: 'image/jpeg',
    });
    formData.append('ref', 'plugin::users-permissions.user'); // The model name (User)
    formData.append('source', 'users-permissions');
    formData.append('refId', userId);
    formData.append('field', 'profilePicture'); // The field name in the model
  
    try {
      const response = await axiosInstance.post(`/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
};




export const getUserFriends = async (user) => {

    const friends = user.friends_added.map(friend => friend.id);
    const friendsReceived = user.friends_received.map(friend => friend.id);
    // console.log(friendsReceived, 'FRIENDS RECEIVED')
    friends.push(...friendsReceived);
    // console.log(friends, 'FRIENDS')
    let friendsEP = '';

    friends.forEach((friend, index) => {
      friendsEP += `filters[id][$in]=${friend}`;
      if (index < friends.length - 1) {
        friendsEP += '&'; // Only add '&' if it's not the last friend
      }
    });

    if (!friendsEP) {
      return [];
    }

    try {
      const response = await axiosInstance.get(`/users?${friendsEP}&populate=*`);
       
      if (response.data && Array.isArray(response.data)) {
        const usersWithThumbnails = response.data.map(user => {
          const thumbnailUrl = user.profilePicture?.formats?.thumbnail?.url || null;
          return {
            ...user,
            thumbnailUrl
          };
        });

    

        return usersWithThumbnails;
      }
    } catch (error) {
      alert(`Error fetching user: ${error.message}`, error);
      throw error;
    }

}

const getUserProfilePicture = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}?populate=profilePicture`);
    return response.data.profilePicture?.formats?.thumbnail?.url || null;
  } catch (error) {
    console.error(`Error fetching profile picture for user ${userId}: ${error.message}`);
    return null;
  }
};

export const getMultipleMatchDetails = async (matchIds) => {
  if (!Array.isArray(matchIds) || matchIds.length === 0) {
    return [];
  }

  // Construct the filter query with $in operator
  const filters = matchIds.map((id, index) => `filters[id][$in][${index}]=${id}`).join('&');
  
  try {
    const response = await axiosInstance.get(`/matches?${filters}&populate=*`);

    // console.log(`/matches?${filters}&populate=members,match_owner,location,sport`)
    const matches = response.data.data;

    // Format the matches
    const formattedMatches = await Promise.all(matches.map(match => formatMatchDetails(match)));
    
    return formattedMatches;
  } catch (error) {
    console.error('Error fetching multiple matches:', error);
    throw error;
  }
};

export const getCurrentTournament = async (id) => {
  try {
    const response = await axiosInstance.get(`/tournaments/${id}?populate=*`);
    const tournaments = response.data.data;

    // console.log(JSON.stringify(tournaments, null, 2)); // Pretty-printing the JSON

    // Process each match to include profile picture URLs
    // const formattedMatches = await Promise.all(matches.map(formatMatchDetails));

    // console.log(JSON.stringify(formattedMatches, null, 2)); // Pretty-printing the JSON
    return tournaments;
  } catch (error) {
    console.error(`Error fetching tournaments: ${error.message}`, error);
    throw error;
  }
};


export const getGroupDetails = async (tournamentId, userId) => {
  try {
    const response = await axiosInstance.get(`fupa/${tournamentId}/members/${userId}/group`);
    const group = response.data;
    return group;
  } catch (error) {
    console.error(`Error fetching group: ${error.message}`, error);
    throw error;
  }
};

export const getGroupResults = async (tournamentId, memberId) => {
  try {
    const response = await axiosInstance.get(`fupa/${tournamentId}/results/${memberId}`);
  return response
  } catch (error) {
    console.error(`Error fetching group: ${error.message}`, error);
    throw error;
  }
};

export const getTournamentResults = async (tournamentId) => {
  try {
    const response = await axiosInstance.get(`/fupa/${tournamentId}/results`);
    return response;
  } catch (error) {
    console.error(`Error fetching tournament results: ${error.message}`, error);
    throw error;
  }
}

export const getTournamentLeaderboard = async (tournamentId) => {
  try {
    const response = await axiosInstance.get(`/fupa/${tournamentId}/leaderboard`);
    return response;
  } catch (error) {
    console.error(`Error fetching tournament results: ${error.message}`, error);
    throw error;
  }
}


export const getTournamentPlayers = async (tournamentId) => {

  try {
    const response = await axiosInstance.get(`/fupa/${tournamentId}/participants`);
    console.log(response.data, 'RESPONSE PARTICIPANTS')
    return response.data;
  } catch (error) {
    console.error(`Error fetching tournament players: ${error.message}`, error);
    throw error;
  }
}

export const getTournamentGroups = async (tournamentId) => {
  try {
    const response = await axiosInstance.get(`/fupa/${tournamentId}/match-result`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(`Error fetching tournament groups: ${error.message}`, error);
    throw error;
  }
}

export const getMatchDetails = async (matchId) => {
  try {
    const response = await axiosInstance.get(`/matches/${matchId}?populate=members,match_owner,location,sport`);
    const match = response.data.data;

    const formattedMatch = await formatMatchDetails(match);

    // console.log(JSON.stringify(formattedMatch, null, 2)); // Pretty-printing the JSON
    return formattedMatch;
  } catch (error) {
    console.error(`Error fetching match: ${error.message}`, error);
    throw error;
  }
};

export const getAllMatches = async () => {
  try {
    const response = await axiosInstance.get(`/matches/?populate=*`);
    const matches = response.data.data;

    // Process each match to include profile picture URLs
    const formattedMatches = await Promise.all(matches.map(formatMatchDetails));

    // console.log(JSON.stringify(formattedMatches, null, 2)); // Pretty-printing the JSON
    return formattedMatches;
  } catch (error) {
    console.error(`Error fetching matches: ${error.message}`, error);
    throw error;
  }
};

const formatMatchDetails = async (match) => {
  const matchDate = parseISO(match.attributes.Date);

  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formattedDate = format(matchDate, "EEEE d 'de' MMMM", { locale: es });
  const capitalizedDate = capitalizeFirstLetter(formattedDate);

  // Fetch profile picture URLs for members and match owner
  const matchOwner = match.attributes.match_owner?.data;
  const matchOwnerProfilePictureUrl = matchOwner ? await getUserProfilePicture(matchOwner.id) : null;

  const members = await Promise.all(match.attributes.members.data.map(async (member) => {
    const profilePictureUrl = await getUserProfilePicture(member.id);
    return {
      id: member.id,
      username: member.attributes.username,
      email: member.attributes.email,
      firstName: member.attributes.firstName,
      lastName: member.attributes.lastName,
      profilePictureUrl,
    };
  }));

  return {
    id: match.id,
    date: capitalizedDate, // Capitalized date in Spanish
    time: format(matchDate, 'HH:mm', { locale: es }), // Format time in Spanish
    createdAt: match.attributes.createdAt,
    updatedAt: match.attributes.updatedAt,
    publishedAt: match.attributes.publishedAt,
    description: match.attributes.description,
    location: match.attributes.location,
    sport: match.attributes.sport,
    ammount_players: match.attributes.ammount_players,
    match_owner: matchOwner ? {
      id: matchOwner.id,
      username: matchOwner.attributes.username,
      email: matchOwner.attributes.email,
      firstName: matchOwner.attributes.firstName,
      lastName: matchOwner.attributes.lastName,
      profilePictureUrl: matchOwnerProfilePictureUrl, // Add profile picture URL for match owner
    } : null,
    members,
  };
};

export const getCoaches = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/coaches`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coaches:', error);
    throw error;
  }
};


export const fetchCourts = async (courtId) => {
  console.log(`${API_BASE_URL}/courts/?populate=*`)
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/courts/?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching court details:', error);
    throw error;
  }
};

export const fetchCourtDetails = async (courtId) => {
  console.log(`${API_BASE_URL}/courts/${courtId}?populate=*`)
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/courts/${courtId}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching court details:', error);
    throw error;
  }
};

export const createMatch = async (matchData) => {


  console.log(JSON.stringify(matchData, null, 2))
  
  const payload = {
    data: {
      ...matchData,
    }
  };

  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/matches`, payload);
    return response.data;
  } catch (error) {
    console.log(error)
    console.error('Error creating matchHHHHH:', error.data);
    throw error;
  }
};

export const addMemberToMatch = async (matchId, userId) => {
  try {
    console.log(matchId, 'MATCH ID IN ADDMEMBER')
    console.log(userId, 'USER ID IN ADDMEMBER');
    const response = await getMatchDetails(matchId)
      const match = response;
      const members = match?.members || [];
      console.log(JSON.stringify(match, null, 2))
      console.log(members, 'ADD MEMBER TO MATCH MEMBERS')
      const data = {
        match,
        members: [...members, userId],
      };
      return axiosInstance.put(`${API_BASE_URL}/matches/${matchId}`, { data });
    
  } catch (error) {
    console.error('Error adding member to match:', error);
    throw error;
  }

}
export const getQuarterfinalMatches = async (tournamentId, userId) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/fupa/${tournamentId}/quarters/${userId}`);
    console.log(response.data, 'QUARTERS')
    return response.data;
  } catch (error) {
    console.error('Error fetching quarterfinal matches:', error.message);
    throw error;
  }
};

// Fetch Semifinal Matches
export const getSemifinalMatches = async (tournamentId, userId) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/fupa/${tournamentId}/semis/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching semifinal matches:', error.message);
    throw error;
  }
};

// Fetch Final Matches
export const getFinalMatches = async (tournamentId, userId) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/fupa/${tournamentId}/final/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching final matches:', error.message);
    throw error;
  }
};
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};


export const getPlayerLevels = async () => {
  try {
    const response = await axiosInstance.get('/player-levels');
    return response.data;
  } catch (error) {
    console.error('Error fetching player levels:', error);
    throw error;
  }
}

export const addToTournament = async (userId, tournamentId) => {
  try {
    // Fetch the existing user data to update the tournaments field
    const userResponse = await axiosInstance.get(`/users/${userId}`);
    const userData = userResponse.data;

    // Check if the tournament is already associated with the user
    if (userData.tournaments.some((tournament) => tournament.id === parseInt(tournamentId, 10))) {
      return { message: 'User is already registered in this tournament.' };
    }

    // Update the user's tournaments field
    const updatedTournaments = [...userData.tournaments, { id: tournamentId }];
    const response = await axiosInstance.put(`/users/${userId}`, {
      tournaments: updatedTournaments,
    });

    return response.data;
  } catch (error) {
    console.error('Error adding user to tournament:', error);
    throw error;
  }
};