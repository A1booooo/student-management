import { supabase } from "../utils/supabase";

export async function upLoadAvatar(fileName, avatarFile) {
  const { error } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    console.error(error);
  }
}
