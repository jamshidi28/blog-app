import {  deletePostApi } from "@/services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeletePost (){
   const queryClient = useQueryClient();
   const {isPending:isDeleting,mutate:deletePost}= useMutation({
        mutationFn:deletePostApi,
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
    return {isDeleting,deletePost}
}