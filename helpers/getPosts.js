import { APIS, END_POINTS } from "../util/constants";

export default async function GetPosts(params) {
  // //console.log('entro a GetPosts');
  // //console.log(params);
  params = new URLSearchParams(params);
  const url = `${APIS.MOCKAPI_POSTS}${END_POINTS.POST}`;

  try {
    const response = await fetch(`${url}?${params}`);
    const postsArray = await response.json();
    return postsArray;
  } catch (error) {
    ////console.log(error);
  }
}
