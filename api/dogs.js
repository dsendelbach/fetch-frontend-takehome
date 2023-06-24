import { postRequest, request } from "./req";
export async function getAllBreeds() {
  let { error, response } = await request(process.env.breedsPath)
  if (error) return;
  return await response.json();
}

export async function getDogIds(query) {
  let { error, response } = await request(process.env.dogSearchPath, query)
  if (error) return;
  return await response.json();
}
export async function getDogs({ resultIds }) {
  let { error, response } = await postRequest(process.env.dogGetPath, resultIds)
  if (error) return;
  return await response.json();
}
export async function generateMatch(dogs) {
  let { error, response } = await postRequest(process.env.dogMatchPath, dogs)
  if (error) return;
  return await response.json();
}
