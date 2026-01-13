import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeletePortfolioParams {
  id: number | string;
}

export const usePortfolioDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["portfolio"],
    mutationFn: async (params: DeletePortfolioParams) => {
      const res = await fetch("/api/delete-portfolio", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
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
    },
    onError: error => {
      console.error("포트폴리오 삭제 실패:", error);
    }
  });
};
