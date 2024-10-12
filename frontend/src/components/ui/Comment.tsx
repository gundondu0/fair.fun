import CopyText from "./CopyText";

interface CommentProps {
  walletAddress: string;
  content: string;
}

export default function Comment({ walletAddress, content }: CommentProps) {
  return (
    <div className="bg-theme-bg border border-theme-text/10 p-4 rounded shadow transition-colors duration-300">
      <CopyText label="user:" value={walletAddress} />
      <p className="mt-2 text-theme-text">{content}</p>
    </div>
  );
}
