import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateResumeParams {
  content: string;
}

export const useResumeCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resume"],
    mutationFn: async (params: CreateResumeParams) => {
      const res = await fetch("/api/post-resume", {
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
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
    onError: error => {
      console.error("이력서 생성 실패:", error);
    }
  });
};

