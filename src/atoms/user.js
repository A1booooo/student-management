import { atom } from "jotai";

export const userAtom = atom({
  avatar: "https://space.bilibili.com/223275472?spm_id_from=333.788.0.0",
  isStudent: null,
});

export const isStudentAtom = atom((get) => {
  const user = get(userAtom);

  return user.isStudent;
});
