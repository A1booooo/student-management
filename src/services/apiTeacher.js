import { supabase } from "../utils/supabase";

export async function createTeacher(teacher) {
  const { data, error } = await supabase.from("teacher").insert(teacher);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getTeacher(teacher_id) {
  let { data: teachers, error } = await supabase
    .from("teacher")
    .select()
    .eq("teacher_id", teacher_id);
  if (error) {
    throw new Error(error.message);
  }
  return teachers;
}

