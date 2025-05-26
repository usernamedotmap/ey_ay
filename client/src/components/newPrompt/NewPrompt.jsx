import { File, SendHorizonal } from "lucide-react";
import "./NewPrompts.css";
import { useEffect, useRef, useState } from "react";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import MarkDown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImage] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: data.history.map(({ role, parts }) => ({
        role,
        parts: [{ text: parts[0].text }],
      })),
    
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  const endref = useRef(null);
  const useForm = useRef(null);

  useEffect(() => {
    if (endref.current) {
      endref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, answer, question, img.dbData]);

  const queryClient = useQueryClient();

  console.log("data: ", img.dbData.filePath);

  const mutation = useMutation({
    mutationFn: async () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      });
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chats", data._id] })
        .then(() => {
          useForm.current.reset();
          setQuestion("");
          setAnswer("");
          setImage({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );

      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chuckText = chunk.text();
        accumulatedText += chuckText;
        setAnswer(accumulatedText);
      }

      // ✅ Only trigger the mutation *after* stream is complete
      await mutation.mutateAsync({
        question: text,
        answer: accumulatedText,
        img: img.dbData?.filePath || undefined,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text, false);
  };

  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

  return (
    <>
      {img.isLoading && <div className="loading">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          transformation={[{ height: 250, width: 250 }]}
          loading="lazy"
          className="image"
          alt=""
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <MarkDown>{answer}</MarkDown>
        </div>
      )}
      <div className="endChat" ref={endref}></div>
      <div className="newPrompt">
        <form className="newForm" onSubmit={handleSubmit} ref={useForm}>
          <Upload setImage={setImage} />

          <input id="file" type="file" multiple={false} hidden />
          <input type="text" name="text" placeholder="Will you marry me?" />

          <button>
            <SendHorizonal />
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPrompt;
