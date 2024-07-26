import { ProfileCard } from "../components/ProfileCard";
import { UpdateCard } from "../components/UpdateCard";

export function HomePage() {
  return (
    <>
      <h1>Home: sua página logada</h1>
      <ProfileCard />
      <UpdateCard />
    </>
  );
}
