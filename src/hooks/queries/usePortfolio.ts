import { useQuery } from "@tanstack/react-query";

export const usePortfolio = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const res = await fetch("/api/get-portfolio");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    }
  });

  return { data, isLoading, isError };
};
