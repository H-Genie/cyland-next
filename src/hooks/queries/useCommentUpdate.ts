import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateCommentParams {
  id: number;
  comment: string;
  nickname: string;
  password: string;
}

export const useCommentUpdate = (params: UpdateCommentParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["comments"],
    mutationFn: async () => {
      const res = await fetch("/api/put-comment", {
        method: "PUT",
        body: JSON.stringify(params)
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["comments"] });
    // },
    onError: error => {
      console.error("댓글 수정 실패:", error.message);
    }
  });
};
