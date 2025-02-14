import Breadcrumbs from '@/ui/Breadcrumbs'
import React from 'react'
import CreatePostForm from '../../create/_/CreatePostForm'
import { getPostById } from '@/services/postService'
import NotFound from './not-found'

async function Editpage({params:{postId}}) {
   const {post} = await getPostById(postId)
//    console.log(post)
if(!post){
    <NotFound/>
}
    return (
        <div>
          <Breadcrumbs 
          breadcrumbs={[
            {
                label :"پست ها",
                href :"/profile/posts",
            },
            {
                label :"ویرایش پست",
                href :`/profile/posts/${postId}/edit`,
                active :true,
            }
          ]}/>
         <CreatePostForm postToEdit={post}/>
        </div>
      )
}

export default Editpage
