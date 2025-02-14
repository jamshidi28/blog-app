import { editPostApi } from "@/services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditPost (){
   const queryClient = useQueryClient();
   const {isPending:isEditing,mutate:editPost}= useMutation({
        mutationFn:editPostApi,
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
    return {isEditing,editPost}
}