import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ToggleStoryActiveParams {
  id: number;
  active: boolean;
}

export const useStoryToggleActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["story"],
    mutationFn: async (params: ToggleStoryActiveParams) => {
      const res = await fetch("/api/put-story-active", {
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
      queryClient.invalidateQueries({ queryKey: ["story"] });
      queryClient.refetchQueries({ queryKey: ["story"] });
    },
    onError: error => {
      console.error("스토리 active 상태 변경 실패:", error);
    }
  });
};

