import { useQuery } from "@tanstack/react-query";

export const useResume = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["resume"],
    queryFn: async () => {
      const res = await fetch("/api/get-resume", {
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
    staleTime: 0, // 데이터를 즉시 stale로 표시하여 invalidate 시 refetch 보장
    gcTime: 10 * 60 * 1000 // 10분간 캐시 유지
  });

  return { data, isLoading, isError };
};
