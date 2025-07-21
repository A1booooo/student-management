import { supabase } from '../utils/supabase'

export default async function getStudentList() {
  let { data: student, error } = await supabase.from("student").select("*");
  if (error) {
    console.error(error);
    return;
  }
  return student;
}
