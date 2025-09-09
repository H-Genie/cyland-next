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
    },
    refetchOnMount: false // 컴포넌트 마운트 시 재요청 방지
  });

  return { data, isLoading, isError };
};
