import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { services } from "./services/services";

function App() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["programme-result", "bca", "2023"],
    queryFn: () => services.getProgrammeResult("bca", "2023"),
    enabled: false, // only fetch on button click
  });

  return (
    <>
      <h1 className="bg-amber-300 text-9xl w-full">tan stack !!!</h1>
      <button onClick={() => refetch()}>click</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {(error ).message}</p>}
      {data && data.status !== "error" && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </>
  );
}

export default App;
