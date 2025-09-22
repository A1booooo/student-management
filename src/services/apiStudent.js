import { supabase } from "../utils/supabase";

export async function getStudentList(teacherId) {
  let { data: student, error } = await supabase
    .from("student")
    .select("*")
    .eq("teacher_id", teacherId);
  if (error) {
    throw new Error(error.message);
  }
  return student;
}

export async function createStudent(student) {
  const { data, error } = await supabase
    .from("student")
    .insert([student])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getStudentByStudentId(studentId) {
  let { data: students, error } = await supabase
    .from("student")
    .select("*")
    .eq("student_id", studentId);
  if (error) {
    throw new Error(error.message);
  }
  return students[0];
}

export async function updateStudent(studentId, student) {
  const { data, error } = await supabase
    .from('student')
    .update(student)
    .eq('student_id', studentId)
    .select()
  if (error) {
    throw new Error(error.message);
  }
  return data
}
