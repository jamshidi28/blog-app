import Breadcrumbs from "@/ui/Breadcrumbs";
import CreatePostForm from "./_/CreatePostForm";

export default function page() {
  return (
    <div>
      <Breadcrumbs 
      breadcrumbs={[
        {
            label :"پست ها",
            href :"/profile/posts",
        },
        {
            label :"ایجاد پست",
            href :"/profile/posts/create",
            active :true,
        }
      ]}/>
     <CreatePostForm/>
    </div>
  )
}

