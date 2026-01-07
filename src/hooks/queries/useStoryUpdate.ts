import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateStoryParams {
  id: number;
  content: string;
}

export const useStoryUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["story"],
    mutationFn: async (params: UpdateStoryParams) => {
      const res = await fetch("/api/put-story", {
        method: "PUT",
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
      console.error("스토리 수정 실패:", error);
    }
  });
};

