import express from "express";
import {
  chatControllers,
  editUserChatsController,
  singleUserChatsController,
  userChatsControllers,
} from "../controllers/chats_controllers.js";
import { withAuth } from "../middleware/protectedRoutes.js";

const router = express.Router();

router.post("/chats", withAuth, chatControllers);
router.get("/userchats", withAuth, userChatsControllers);
router.get("/chats/:id", withAuth, singleUserChatsController);
router.put("/chats/:id", withAuth, editUserChatsController);

export default router;
