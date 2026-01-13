import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteStoryParams {
  id: number;
}

export const useStoryDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["story"],
    mutationFn: async (params: DeleteStoryParams) => {
      const res = await fetch("/api/delete-story", {
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
      queryClient.invalidateQueries({ queryKey: ["story"] });
    },
    onError: error => {
      console.error("스토리 삭제 실패:", error);
    }
  });
};
