import Bet from '../model/bet.model';


export const betPlace = async (req, res) => {

  const { userId, matchId, team, amount, odds } = req.body;

  // Fetch user
  const user = await User.findById(userId);
  if (!user) return res.status(404).send('User not found');

  // Check if user has sufficient balance
  if (user.walletBalance < amount) {
    return res.status(400).send('Insufficient balance');
  }

  // Deduct amount from user's wallet
  user.walletBalance -= amount;
  await user.save();

  // Calculate potential payout
  const potentialPayout = amount * odds;

  // Create and save bet
  const bet = new Bet({
    userId,
    matchId,
    team,
    amount,
    odds,
    potentialPayout,
  });

  await bet.save();

  res.status(200).send('Bet placed successfully');
}
module.exports = router;