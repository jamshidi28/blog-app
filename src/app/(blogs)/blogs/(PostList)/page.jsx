import { cookies } from "next/headers";
import PostList from "../_components/PostList";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { getPosts } from "@/services/postService";
import queryString from "query-string";
import { toPersianDigits } from "@/utils/numberFormatter";
// import queryString from "query-string";

async function BlogPage({ searchParams }) {
  const queries = queryString.stringify(searchParams)
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);
  const posts = await getPosts(queries,options);

  const { search } = await searchParams; 

  return (
    <>
      {search ? (
        <p className="mb-4 text-secondary-700">
          {posts.length === 0
            ? "هیچ پستی با این مشخصات پیدا نشد"
            : `نشان دادن ${toPersianDigits(posts.length)} نتیجه برای `}
          <span className="font-bold">&quot;{search}&quot;</span>
        </p>
      ) : null}
      <PostList posts={posts} />
    </>
  )
}

export default BlogPage;

// FOR ENGLISH TEXT :
// showing 3 results for "folan"
