import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteCommentParams {
  id: number;
  password: string;
}

export const useCommentDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["comments"],
    mutationFn: async (params: DeleteCommentParams) => {
      const res = await fetch("/api/delete-comment", {
        method: "DELETE",
        body: JSON.stringify(params)
      });
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
    onError: error => console.error("댓글 삭제 실패:", error.message)
  });
};
