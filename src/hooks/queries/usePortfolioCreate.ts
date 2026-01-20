import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Portfolio } from "../../components/Admin/sections/PortfolioSection";

interface CreatePortfolioParams extends Omit<Portfolio, "id" | "classification_label"> {}

export const usePortfolioCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["portfolio"],
    mutationFn: async (params: CreatePortfolioParams) => {
      const res = await fetch("/api/post-portfolio", {
        method: "POST",
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
      console.error("포트폴리오 생성 실패:", error);
    }
  });
};
