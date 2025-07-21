import { generateStudent, insertStudent } from "./services/apiStudent.js";
import { generateTeacher, insertTeacher } from "./services/apiTeacher.js";

// const students = await getStudent();
// console.log(students);

// const data = await insertStudent();
// console.log(data);

// const teacher = generateTeacher();
// console.log(teacher);

// const data = await insertTeacher(10)
// console.log(data);

const data = await insertStudent(10)
console.log(data);
