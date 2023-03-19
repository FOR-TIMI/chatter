const router = require("express").Router();

const authRoutes = require("./auth-route");
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const conversationRoutes = require("./conversation-routes");
const messageRoutes = require("./message-routes");


router.use("/", authRoutes);
router.use("/u", userRoutes);
router.use("/p", postRoutes);
router.use("/cs", conversationRoutes);
router.use("/msg", messageRoutes);

module.exports = router;
