import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateCommentParams {
  comment: string;
  nickname: string;
  password: string;
}

export const useCommentCreate = (params: CreateCommentParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["comments"],
    mutationFn: async () => {
      const res = await fetch("/api/post-comment", {
        method: "POST",
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
      console.error("댓글 생성 실패:", error.message);
    }
  });
};
