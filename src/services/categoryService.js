import http from "./httpService";

export async function getCategoriesApi (){
   return http.get("/category/list").then(({ data }) => data.data)
}