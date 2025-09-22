export function getUserId() {
  const token = import.meta.env.VITE_SUPABASE_TOKEN;
  const userToken = JSON.parse(localStorage.getItem(token));
  if (!userToken) {
    return 'NOT FOUND';
  }

  return userToken.user.id;
}
