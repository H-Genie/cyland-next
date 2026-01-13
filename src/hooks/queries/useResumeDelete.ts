import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteResumeParams {
  id: number;
}

export const useResumeDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resume"],
    mutationFn: async (params: DeleteResumeParams) => {
      const res = await fetch("/api/delete-resume", {
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
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
    onError: error => {
      console.error("이력서 삭제 실패:", error);
    }
  });
};
