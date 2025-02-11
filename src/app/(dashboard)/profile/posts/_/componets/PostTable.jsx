import { getPosts } from '@/services/postService'
import Table from '@/ui/Table'
import Empty from '@/ui/Empty';
import PostRow from './PostRow';

async function PostTable({query}) {
    const posts = await getPosts(query);
        // console.log(posts)

    if (!posts.length) return <Empty resourceName="پستی" />;
    return (
       <Table>
            <Table.Header>
                <th>#</th>
                <th>عنوان</th>
                <th>دسته بندی</th>
                <th>نویسنده</th>
                <th>تاریخ ایجاد</th>
                <th>نوع</th>
                <th>عملیات</th>
            </Table.Header>
            <Table.Body>
                {posts.map((post, index) => (
                    <PostRow key={post._id} index={index} post={post} />
                ))}
            </Table.Body>
        </Table>
    )
}

export default PostTable;
