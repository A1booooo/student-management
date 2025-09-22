import { getCurrentUser } from "../services/apiAuth";

export default async function isAuthenticated() {
  const user = await getCurrentUser();
  if (!user) {
    return false;
  }
  return true;
}
