import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateStoryParams {
  content: string;
}

export const useStoryCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["story"],
    mutationFn: async (params: CreateStoryParams) => {
      const res = await fetch("/api/post-story", {
        method: "POST",
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
      console.error("스토리 생성 실패:", error);
    }
  });
};

