import { getPosts } from "@/services/postService";
import { toPersianDigits } from "@/utils/numberFormatter";
import queryString from "query-string";

const { default: PostList } = require("app/(blogs)/blogs/_components/PostList");

async function Category({ params }) {
  // console.log(params)
  const { categorySlug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/list?categorySlug=${categorySlug}`);
  const { data } = await res.json();
  const { posts } = data || {};



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
