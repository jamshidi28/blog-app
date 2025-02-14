import { Suspense } from "react";
import CardsWrapper from "./components/CardsWrapper";
import Fallback from "@/ui/Fallback";
import LatestPosts from "./components/LatestPosts";


async function Profile() {


  return (
    <div>
      <h1 className="text-xl mb-8 text-secondary-700">داشبورد</h1>
      <Suspense fallback={<Fallback />}>
        <CardsWrapper />
      </Suspense>
      <h1 className="text-xl mb-8 text-secondary-700">جدیدترین پست ها</h1>
      <Suspense fallback={<Fallback />}>
        <LatestPosts />
      </Suspense>
    </div>
  );
}
export default Profile;
