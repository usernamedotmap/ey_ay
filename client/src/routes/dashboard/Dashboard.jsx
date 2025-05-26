import { BookCopy, Bot, HandHeart, SendHorizontal } from "lucide-react";
import "./Dashboard.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {


  const queryClient = useQueryClient();
  const navigate = useNavigate()
  

  const mutation = useMutation({
    mutationFn: async (text) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${data}`)
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  })


  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
    
  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/src/assets/logos.png" />
          <h1>Eyy Ayy</h1>
        </div>
        <div className="options">
          <div className="option">
            <Bot className="icon" />
            <span>Create new chatmate</span>
          </div>
          <div className="option">
            <BookCopy className="icon" />
            <span>Copy schoolworks</span>
          </div>
          <div className="option">
            <HandHeart className="icon" />
            <span>Help me with my lover</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Will you marry me?" />
          <button>
            <SendHorizontal className="icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
