// import postModel from '../model/post.model.js';
import User from '../model/user.model.js';

export const assign = async (req, res) => {
  console.log("i am inside the assign function");
    const { leaderId, userIds } = req.body;
    if (!leaderId || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: "LeaderId and an array of userIds are required" });
    }
    try {
      // Update the users to assign the leaderId
      const result = await User.updateMany(
        { _id: { $in: userIds } },
        { $set: { leaderId: leaderId } }
      );
      res.status(200).json({ message: "Users assigned to leader successfully", result });
    } catch (error) {
      console.error("Error assigning leader:", error);
      res.status(500).json({ message: "Error assigning leader", error: error.message });
    }
  };


// ✅ Update user
export const updateUser =  async (req, res) => {
  console.log("PUT /admin/update-user called with id:", req.params.id);
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
}

// ✅ Delete user
export const deleteUser = async (req, res) => {
  console.log("DELETE /admin/delete-user called with id:", req.params.id);
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
}


// export const createNewPost = async (req,res)=>{
//   let user = await userModel.findOne({email:req.user.email});
//   const {content} =req.body;
//   const post = await postModel.create({
//       user : user._id,
//       content
//   });
//   user.posts.push(post._id);
//   await user.save();
//   return res.status(200).json({ message: 'Upload New Post successful' });
// }

// export const getPost=async (req,res)=>{
//   try {
//       const posts = await postModel.find({}).populate('user');
//       res.status(200).json(posts);
      
//   } catch (error) {
//       console.log("Error: ",error);
//       res.status(500).json(error);
//   }
// };

// export const updatePost = async (req,res)=>{
//     try {
//       const post = await postModel.findOneAndUpdate({_id : req.params.id} , {content : req.body.content});
//       return res.status(200).json({ message: 'Edit Post successful' });
//     } catch (error) {
//       console.log("Error: ",error);
//       res.status(500).json(error);
//     }
//   };

// export const getOwnPost = async (req,res)=>{
// try { 
//    const user = await userModel.findOne({_id : req.user.userid }).populate('posts');
//   return res.status(200).json({
//     message: 'request successful', 
//     posts : user.posts,
// })
  
// } catch (error) {
//   res.status(500).json({ message: 'Server error', error });
// }

// };

// export const deletePost = async(req,res) =>{
//   try {
//     const post = await postModel.findOne({_id : req.params.id});
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     const user = await userModel.findOne({_id : req.user.userid })
//     if (!user.posts.includes(post._id)) {
//       return res.status(403).json({ message: 'Unauthorized to delete this post' });
//     }

//     user.posts = user.posts.filter(postId => postId.toString() !== post._id.toString());

//     await postModel.findByIdAndDelete(req.params.id);

//     return res.status(200).json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     console.log("Error: ", error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };