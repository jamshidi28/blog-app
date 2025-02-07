import { cookies } from "next/headers";
import PostList from "../_components/PostList";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { getPosts } from "@/services/postService";
// import queryString from "query-string";

async function BlogPage({ }) {

  // const queries = queryString.stringify(await searchParams);
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);
  const posts = await getPosts( options);


  return (
    <div>
      <PostList posts={posts} />
    </div>
  )
}

export default BlogPage;

// FOR ENGLISH TEXT :
// showing 3 results for "folan"
