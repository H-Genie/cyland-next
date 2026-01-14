import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteCommentParams {
  id: number;
  password?: string; // 관리자는 비밀번호 없이 삭제 가능
}

export const useCommentDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["comments"],
    mutationFn: async (params: DeleteCommentParams) => {
      const res = await fetch("/api/delete-comment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        cache: "no-store",
        body: JSON.stringify(params)
      });
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.refetchQueries({ queryKey: ["comments"] });
    },
    onError: error => console.error("댓글 삭제 실패:", error.message)
  });
};
