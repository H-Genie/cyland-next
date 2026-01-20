import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Portfolio } from "../../components/Admin/sections/PortfolioSection";

interface UpdatePortfolioParams extends Omit<Portfolio, "classification_label"> {
  id: number | string;
}

export const usePortfolioUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["portfolio"],
    mutationFn: async (params: UpdatePortfolioParams) => {
      const res = await fetch("/api/put-portfolio", {
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
      console.error("포트폴리오 수정 실패:", error);
    }
  });
};
