import { useState } from "react";
import Comment from "../ui/Comment";
import Cookies from "js-cookie";
import {useWallet} from "@suiet/wallet-kit";

interface CommentType {
  _id: string;
  walletAddress: string;
  content: string;
  coinId: string;
  createdAt: string;
}

interface CommentSectionProps {
  comments: CommentType[];
  coinId: string; // Changed from number to string
  refreshComments: () => void;
}

export default function CommentSection({
  comments,
  coinId,
  refreshComments,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const wallet = useWallet()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      if (!wallet.connected) return;
      const response = await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          walletAddress:wallet.address,
          content: newComment,
          coinId: coinId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      // Comment posted successfully
      console.log("Comment posted successfully");
      setNewComment(""); // Clear the input
      refreshComments(); // Refresh the comments list
    } catch (error) {
      console.error("Error posting comment:", error);
      // You might want to show an error message to the user
    }
  };

  return (
    <div className="mt-8 text-theme-text transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-2 border rounded mb-2 bg-theme-bg text-theme-text transition-colors duration-300"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-theme-bg bg-theme-text hover:bg-theme-text/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-text transition-all duration-300 ease-in-out"
        >
          Post Comment
        </button>
      </form>
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Comment key={comment._id} {...comment} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-32 text-theme-text/50">
          No comments to display
        </div>
      )}
    </div>
  );
}
