import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteCommentAdminParams {
  id: number;
}

export const useCommentDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["comments"],
    mutationFn: async (params: DeleteCommentAdminParams) => {
      const res = await fetch("/api/delete-comment-admin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        credentials: "include",
        cache: "no-store",
        body: JSON.stringify(params)
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error ?? "Network response was not ok");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.refetchQueries({ queryKey: ["comments"] });
    },
    onError: error => console.error("관리자 댓글 삭제 실패:", error)
  });
};
