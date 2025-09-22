import { supabase } from "../utils/supabase";

export async function signup(email, password, metaData = {}) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: `${email}-${Date.now()}`,
        avatar:
          "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
        ...metaData,
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function login(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function updateUser(newUserMetaData = {}) {
  const { data, error } = await supabase.auth.updateUser({
    data: newUserMetaData,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
