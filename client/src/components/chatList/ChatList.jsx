import React from "react";
import "./ChatList.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userChats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });


  return (
    <div className="chatList">
      <span className="title">Dashboard</span>
      <Link to="/dashboard">Create New Chat</Link>
      <Link to="/dashboard">Pagmamahal</Link>
      <Link to="/dashboard">Contacts</Link>
      <hr />
      <span className="title">Recent Chat</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong"
          : data?.chats.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/src/assets/logos.png" alt="" />
        <div className="texts">
          <span>Updgrade your body</span>
          <span>Get unlimited shampoo </span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
