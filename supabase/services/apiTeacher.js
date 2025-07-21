import { faker } from "@faker-js/faker";
import { supabase } from "../utils/supabase.js";

function generateCLass() {
  const classNUm = faker.number.int({ min: 1, max: 12 });
  const grade = faker.number.int({ min: 1, max: 12 });

  return `${grade}|${classNUm}`;
}

export function generateTeacher() {
  const classCount = faker.number.int({ min: 1, max: 5 });
  const classInCharge = [];
  for (let i = 0; i < classCount; i++) {
    classInCharge.push(generateCLass());
  }

  return {
    name: faker.person.fullName(),
    class_in_charge: JSON.stringify(classInCharge),
    gender: faker.person.sex(),
    avatar: faker.image.avatar(),
  };
}

export function generateTeachers(count = 5) {
  return Array.from({ length: count }, () => generateTeacher());
}

export async function insertTeacher(count = 5) {
  const teachers = generateTeachers(count);
  const { data, error } = await supabase
  .from('teacher')
  .insert(teachers)
  .select()

  if (error) {
    console.log(error.message);
    return;
  }

  return data;
}