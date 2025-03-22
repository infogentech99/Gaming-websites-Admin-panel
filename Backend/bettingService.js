import axios from 'axios';
import User from './model/user.model.js';
import Bet from './model/bet.model.js';

async function settleBets() {
  try {
    // Fetch unsettled bets
    const unsettledBets = await Bet.find({ status: 'pending' });

    for (const bet of unsettledBets) {
      try {
        // Fetch match result from external API
        const response = await axios.get(`https://api.example.com/matches/${bet.matchId}`);
        const matchResult = response.data;

        // Determine if the user's bet was correct
        if (matchResult.winner === bet.team) {
          // User won the bet
          bet.status = 'won';

          // Credit user's wallet with potential payout
          const user = await User.findById(bet.userId);
          user.walletBalance += bet.potentialPayout;
          await user.save();
        } else {
          // User lost the bet
          bet.status = 'lost';
        }

        // Save bet status
        await bet.save();
      } catch (error) {
        console.error(`Error processing bet ID ${bet._id}:`, error);
      }
    }
  } catch (error) {
    console.error('Error fetching unsettled bets:', error);
  }
}

export default settleBets;