import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ToggleResumeActiveParams {
  id: number;
  active: boolean;
}

export const useResumeToggleActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resume"],
    mutationFn: async (params: ToggleResumeActiveParams) => {
      const res = await fetch("/api/put-resume-active", {
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
      queryClient.invalidateQueries({ queryKey: ["resume"] });
      queryClient.refetchQueries({ queryKey: ["resume"] });
    },
    onError: error => {
      console.error("이력서 active 상태 변경 실패:", error);
    }
  });
};

