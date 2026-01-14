import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TogglePortfolioActiveParams {
  id: number;
  active: boolean;
}

export const usePortfolioToggleActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["portfolio"],
    mutationFn: async (params: TogglePortfolioActiveParams) => {
      const res = await fetch("/api/put-portfolio-active", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        cache: "no-store",
        body: JSON.stringify(params)
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error || "Network response was not ok");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.refetchQueries({ queryKey: ["portfolio"] });
    },
    onError: error => {
      console.error("포트폴리오 active 상태 변경 실패:", error);
    }
  });
};
