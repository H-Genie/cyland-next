import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateResumeParams {
  id: number;
  content: string;
}

export const useResumeUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resume"],
    mutationFn: async (params: UpdateResumeParams) => {
      const res = await fetch("/api/put-resume", {
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
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
    onError: error => {
      console.error("이력서 수정 실패:", error);
    }
  });
};

