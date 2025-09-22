import { supabase } from "../utils/supabase";

export async function getScoreList() {
  let { data: score, error } = await supabase.from("score").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return score;
}

export async function uploadScore(score) {
  let { data, error } = await supabase.from("score").insert(score).select();
  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}

export async function getScoreByScoreId(scoreId) {
  let { data: scores, error } = await supabase
    .from("score")
    .select("*")
    .eq("id", scoreId);
  if (error) {
    throw new Error(error.message);
  }
  return scores[0];
}

export async function updateScore(scoreId, score) {
  let { data, error } = await supabase
    .from("score")
    .update(score)
    .eq("id", scoreId)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}
