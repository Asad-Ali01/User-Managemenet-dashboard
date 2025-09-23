import { useMutation,useQueryClient } from "@tanstack/react-query";
import axios from "axios";


function useDeletingUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id:string) => {
      await axios.delete(`http://localhost:3000/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });


}

export default useDeletingUser;
