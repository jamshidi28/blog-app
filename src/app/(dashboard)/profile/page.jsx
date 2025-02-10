import { fetchCardData } from "@/services/data";
import { Card } from "./components/Card";


async function Profile() {
 const{numberOfComments,numberOfPosts,numberOfUsers}= await fetchCardData();

  return (
    <div>
     <div className="grid gap-6 md:grid-cols-3 mb-8">
     <Card type="posts" title="پست ها" value={numberOfPosts}/>
     <Card type="users" title="کاربران"value={numberOfUsers} />
     <Card type="comments" title="نظرات" value={numberOfComments}/>
     </div>
    </div>
  );
}
export default Profile;
