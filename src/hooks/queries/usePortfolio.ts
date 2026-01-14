import { useQuery } from "@tanstack/react-query";

export const usePortfolio = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const res = await fetch("/api/get-portfolio", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache"
        }
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지 (이 시간 동안은 refetch 안 함)
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    refetchOnMount: false, // 마운트 시 자동 refetch 방지
    refetchOnWindowFocus: false // 윈도우 포커스 시 자동 refetch 방지
  });

  return { data, isLoading, isError };
};
