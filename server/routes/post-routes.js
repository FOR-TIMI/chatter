const router = require("express").Router();

/**================Post controller=================== */
const {
  createPost,
  getFeedPosts,
  getPostLikes,
  addRemoveLike,
  editPost,
  deletePost,
  getPostById,
} = require("../controllers/post-controller");

/**================Comment controller=================== */
const {
  addComment,
  getComments,
  removeComment,
  updateComment,
  addRemoveCommentLike,
} = require("../controllers/comment-controller");

/**================Image Storage Middleware=================== */
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

/**================Authentication Middleware=================== */
const { authMiddleware } = require("../middleware/jwt-config");

/**================isAuthor Middleware=================== */
const { isCommentAuthor, isPostAuthor } = require("../middleware/middleware");

/**=========Posts================== */
router
  .route("/")
  .get(authMiddleware, getFeedPosts)
  .post(authMiddleware, upload.array("postImageUrls", 5), createPost);

router
  .route("/:id")
  .get(authMiddleware, getPostById)
  .put(authMiddleware, isPostAuthor, upload.array("newPostImages", 5), editPost)
  .delete(authMiddleware, isPostAuthor, deletePost);

/**============Likes=============== */
router
  .route("/:id/likes")
  .get(authMiddleware, getPostLikes)
  .patch(authMiddleware, addRemoveLike);

/**=========Comment============ */

router
  .route("/:postId/comments")
  .get(authMiddleware, getComments)
  .post(authMiddleware, addComment);

router
  .route("/:postId/comments/:commentId")
  .put(authMiddleware, isCommentAuthor, updateComment)
  .delete(authMiddleware, isCommentAuthor, removeComment);

/**========COMMENT LIKES============ */
router.patch(
  "/:postId/comments/:commentId/likes",
  authMiddleware,
  addRemoveCommentLike
);

module.exports = router;
