
import { getCategoriesApi } from "@/services/categoryService";
import {
    useQuery
} from "@tanstack/react-query";

export function useCategories() {
    const {data,isLoading} = useQuery({
        queryKey: ["categories"],
        queryFn: getCategoriesApi,
    })

    const {categories :rawCategories=[]}=data || {};

const categories=rawCategories.map((item)=>({
    label : item.title,
    value : item._id ,
}));
const trasformedCategories=rawCategories.map((item)=>({
    label : item.title,
    value : item.englishTitle ,
}));

 return{ isLoading,categories,trasformedCategories }
}

