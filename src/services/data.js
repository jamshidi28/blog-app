import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import { getAllUserApi } from "./authService";
import { getPosts } from "./postService";
import { getAllCommentsApi } from "./commentService";
// import { resolve } from "styled-jsx/css";

export async function fetchCardData() {
    
    // creat delay for test
    // await new Promise(resolve =>setTimeout(resolve,3000)) ;

   const cookieStore= cookies();
   const options = setCookieOnReq(cookieStore);

   try {
   const data = await Promise.all([
        getAllUserApi(options),
        getAllCommentsApi(options),
        getPosts(),
    ]);
    // console.log(data[2].length);
    const numberOfUsers = Number(data[0].users.length ?? "0");
    const numberOfComments = Number(data[1].commentsCount ?? "0");
    const numberOfPosts = Number(data[2].posts.length ?? "0");

    return {
        numberOfUsers,
        numberOfComments,
        numberOfPosts
    }
    
   } catch (error) {
    console.log(error.response.data.message);
    throw new Error ("خطا در بارگذاری اطلاعات");
   }
}