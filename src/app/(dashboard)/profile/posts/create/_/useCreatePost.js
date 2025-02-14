import { creatPostApi } from "@/services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreatePost (){
   const queryClient = useQueryClient();
   const {isPending:isCreating,mutate:creatPost}= useMutation({
        mutationFn:creatPostApi,
        onSuccess:(data)=>{
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey:["post"]
            })
        },
        onError:(error)=>{
            toast.error(error?.response?.data?.message)
        }
    })
    return {isCreating,creatPost}
}