import React from 'react'
import PostTable from '../posts/_/componets/PostTable';

function LatestPosts() {
    const query = "sort = latest & limit=5";
    return (
        <PostTable query={query} />
    )
}

export default LatestPosts
