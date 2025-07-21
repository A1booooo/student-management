import { supabase } from '../utils/supabase'

export default async function getScoreList() {
  let { data: score, error } = await supabase.from("score").select("*");
  if (error) {
    console.error(error);
    return []; // 返回空数组而非undefined
  }
  return score;
}