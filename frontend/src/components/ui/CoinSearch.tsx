interface CoinSearchProps {
  onSearch: (query: string) => void;
}

export default function CoinSearch({ onSearch }: CoinSearchProps) {
  return (
    <div className="mb-4 border shadow rounded-md w-1/3 mx-auto">
      <input
        type="text"
        placeholder="Search coins..."
        className="w-full p-2 border rounded-md"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
