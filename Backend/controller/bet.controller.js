import Bet from '../model/bet.model.js';
import userModel from '../model/user.model.js';


export const betPlace = async (req, res) => {
  const userId = req.user.userId;

  const { gmid,mname,betType,betAmount,sid,etid,name,profit} = req.body;

  if(!gmid || !mname || !betType || !betAmount || !sid || !etid || !name || !profit){
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user = userModel.findOne({userId}).populate('walletId');

  if (user.walletId.balance < amount) {
    return res.status(400).send('Insufficient balance');
  }

  // Deduct amount from user's wallet
  user.walletBalance -= betAmount;
  await user.save();

  const bet = new Bet({
    userId,
    etid,
    name,
    gmid,
    mname,
    betType,
    betAmount,
    profit,
    sid
  });

  await bet.save();

  res.status(200).send('Bet placed successfully');
}
export const getBet = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Step 1: Find the user
    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: Get all bets placed by this user (matching by user._id)
    const bets = await Bet.find({ userId: user._id });

    if (!bets || bets.length === 0) {
      return res.status(404).json({ message: 'No bets found for this user' });
    }

    // Step 3: Return all bets
    res.status(200).json({
      message: 'All bets placed by user',
      bets,
    });

  } catch (error) {
    console.error("Error in getBet:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
