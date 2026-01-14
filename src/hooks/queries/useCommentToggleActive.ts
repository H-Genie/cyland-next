import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ToggleCommentActiveParams {
  id: number;
  active: boolean;
}

export const useCommentToggleActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["comments"],
    mutationFn: async (params: ToggleCommentActiveParams) => {
      const res = await fetch("/api/put-comment-active", {
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
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.refetchQueries({ queryKey: ["comments"] });
    },
    onError: error => {
      console.error("댓글 active 상태 변경 실패:", error);
    }
  });
};

