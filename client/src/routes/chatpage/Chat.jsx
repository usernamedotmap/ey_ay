import "./Chat.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const Chat = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { data, isPending, isError } = useQuery({
    queryKey: ["chats", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
        method: "GET",
      }).then((res) => res.json()),
  });


  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending
            ? "Loading"
            : isError
            ? "Something went wrong"
            : data?.chats?.history?.map((message, i) => (
              <>
              {message?.img && (
                <IKImage
                urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                path={message?.img}
                width="400"
                height="300"
                transformation={[{ height: "300", width: "400" }]}
                loading="lazy"
                lqip={{active: true, quality: 20}}
                />
              )}
                <div
                  key={i}
                  className={
                    message.role === "user" ? "message user" : "message"
                  }
                >
                  <Markdown>{message?.parts[0]?.text}</Markdown>
                </div>
                </>
              ))}

          {data && <NewPrompt data={data?.chats} />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
