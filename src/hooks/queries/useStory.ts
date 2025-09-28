import { useQuery } from "@tanstack/react-query";

export const useStory = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["story"],
    queryFn: async () => {
      const res = await fetch("/api/get-story");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    staleTime: Infinity, // 데이터를 항상 fresh로 유지 (재요청 방지)
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 방지
    refetchOnMount: false, // 컴포넌트 마운트 시 재요청 방지
    refetchOnReconnect: false // 네트워크 재연결 시 재요청 방지
  });

  return { data, isLoading, isError };
};
