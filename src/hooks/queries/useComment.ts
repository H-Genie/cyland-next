import { useQuery } from "@tanstack/react-query";

export const useComment = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await fetch("/api/get-comment");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    }
  });

  return { data, isLoading, isError };
};
