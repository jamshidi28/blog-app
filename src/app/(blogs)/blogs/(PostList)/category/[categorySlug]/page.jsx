import { getPosts } from "@/services/postService";
import setCookieOnReq from "@/utils/setCookieOnReq";
import PostList from "app/(blogs)/blogs/_components/PostList";
import { cookies } from "next/headers";
import queryString from "query-string";


async function Category({ params,searchParams }) {
  // console.log(params)
  const { categorySlug } = await params;
  const queries = queryString.stringify(searchParams) + "&" + `categorySlug=${categorySlug}`

    const cookieStore = cookies();
    const options = setCookieOnReq(cookieStore);
    const posts = await getPosts(queries,options);
  



  return (
    <>
      
      <p className="mb-4 text-secondary-700">
        {posts.length === 0 ? "هیچ پستی با این مشخصات پیدا نشد"
          : <PostList posts={posts} />}
      </p>
     
    </>
  );
}

export default Category;
