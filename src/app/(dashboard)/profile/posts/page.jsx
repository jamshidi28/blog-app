import { Suspense } from 'react'
import PostTable from './_/componets/PostTable'
import Search from '@/ui/Search'
import { CreatPost } from './_/componets/Buttons'
import queryString from 'query-string'
import { Spinner } from '@/ui/Spinner'
import Pagination from '@/ui/Pagination'
import { getPosts } from '@/services/postService'

async function Page({ searchParams }) {
  const query = queryString.stringify(searchParams);
  const { totalPages } = await getPosts(query)
  return (
    <div>
      <div className='grid grid-cols-1 mb-12 gap-8 text-secondary-700 lg:grid-cols-3 items-center '>
        <h1 className='text-xl font-bold'>لیست پست ها</h1>
        <Search />
        <CreatPost />
      </div>
      <Suspense fallback={<Spinner />} key={query}>
        <PostTable query={query} />
      </Suspense>
      <div className="flex justify-center mt-5 w-full">
        <Pagination totalPages={totalPages} />
      </div>

    </div>
  )
}

export default Page
