import UserChats from "../models/userChats.js";
import Chat from "../models/chats.js";

export const chatControllers = async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;

  try {
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const saveChat = await newChat.save();

    const userChats = await UserChats.find({
      userId: userId,
    });

    if (!userChats.length) {
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: saveChat.id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newUserChats.save();
    } else {
      await UserChats.updateOne(
        {
          userId: userId,
        },
        {
          $push: {
            chats: {
              _id: saveChat._id.toString(),
              title: text.substring(0, 40),
              createdAt: new Date(),
            },
          },
        }
      );

      res.status(200).send(newChat._id);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const userChatsControllers = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userChats = await UserChats.find({
      userId,
    });

    res.status(200).json({
      message: "userChats retrieve",
      chats: userChats[0]?.chats || [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const singleUserChatsController = async (req, res) => {
  const userId = req.auth.userId;
  const { id } = req.params;

  try {
    const chats = await Chat.findOne({ _id: id, userId });

    res.status(200).json({
      message: "chats retrieve",
      chats,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const editUserChatsController = async (req, res) => {
  const userId = req.auth.userId;
  const { id } = req.params;
  const { question, img, answer } = req.body;


  const newChats = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      {
        _id: id.toString(),
        userId,
      },
      {
        $push: {
          history: {
            $each: newChats,
          },
        },
      }
    );
    res.status(200).json({
      message: "Chat updated",
      updatedChat,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
