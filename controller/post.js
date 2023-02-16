const { Post } = require("../models/post");

// new post create api
exports.createPost = async (req, res) => {
  console.log(req.body);
  var {
    title,
    body,
    createdBy,
    active,
    geoLocation
  } = req.body;

  if (!title || !body || !createdBy || !active || !geoLocation) {
    res.json({
      status: 400,
      success: false,
      message: "All Fileds are required",
      createdPost: insertData,
    });
  }
  var insertData = await Post.create({
    title,
    body,
    createdBy,
    active,
    geoLocation
  });

  res.json({
    status: 200,
    success: true,
    message: "New Post Added!",
    createdPost: insertData,
  });
}
// post update by id
exports.updatePost = async (req, res) => {
  let postUpdated = await Post.findOne({ _id: req.params.id });

  if (!postUpdated) {
    return res.json({
      status: 404,
      success: false,
      message: "Data not found"
    });
  }
  let post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.json({
    status: 200,
    success: true,
    message: "Post Updated successfully!",
    updatedPost: post,
  });

}

//delete post by id
exports.deletePostById = async (req, res) => {

  const deletePost = await Post.findByIdAndDelete(req.params.id);
  if (!deletePost) {
    return res.json({
      status: 404,
      success: false,
      message: "Data not found"
    });
  }
  res.json({
    status: 200,
    success: true,
    message: "Post Deleted Successfully!",
    deletedPost: deletePost,
  });

};


// get post by Id
exports.getPostByID = async (req, res) => {

  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.json({
      status: 404,
      success: false,
      message: "Data not found"
    });
  }
  res.json({
    status: 200,
    success: true,
    message: "Get Post Detail!",
    postDetail: post,
  });

}


// count of active and inactive post
exports.countPost = async (req, res) => {
  let countActive = await Post
    .find({ 'active': 'active' })
    .countDocuments();
  let countInactive = await Post
    .find({ 'active': 'inactive' })
    .countDocuments();
  if (!countActive || !countInactive) {
    return res.json({
      status: 404,
      success: false,
      message: "Data not found"
    });
  }

  res.json({
    status: 200,
    success: true,
    message: "Get Post counts on Deshboard!",
    active: countActive,
    inactive: countInactive
  });
}


// Create an API to retrieve posts using latitude and longitude.
exports.postGeoLocation = async (req, res, next) => {
  let postData = await Post.find({ geoLocation: req.params.geoLocation });

  if (!postData || postData.length === 0) {
    return res.json({
      status: 404,
      success: false,
      message: "GeoLocation must be latitude or longitude"
    });
  }

  res.json({
    status: 200,
    success: true,
    message: "Get GeoLocation!",
    postData,
  });
}
