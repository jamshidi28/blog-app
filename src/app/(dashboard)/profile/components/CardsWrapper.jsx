import { fetchCardData } from "@/services/data";
import  Card  from "./Card"

async function CardsWrapper() {
    const { numberOfComments, numberOfPosts, numberOfUsers } = await fetchCardData();

  return (
    <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card type="posts" title="پست ها" value={numberOfPosts} />
        <Card type="users" title="کاربران" value={numberOfUsers} />
        <Card type="comments" title="نظرات" value={numberOfComments} />
      </div>
  )
}

export default CardsWrapper;
