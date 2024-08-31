import { APIS, END_POINTS } from "../util/constants";

export default async function GetPages(params) {
  const url = `${APIS.MOCKAPI_POSTS}${END_POINTS.POST}`;

  if (!params.pageParam) {
    params = {
      completed: false,
      page: 1,
      limit: 2,
      sortBy: "createdAt",
      order: "desc",
    };
  } else {
    params = params.pageParam;
  }
  params = new URLSearchParams(params);
  ////console.log(params);

  try {
    //await new Promise(resolve => setTimeout(resolve, 30000));
    const response = await fetch(`${url}?${params}`);
    const postsArray = await response.json();
    ////console.log(postsArray);

    return postsArray;
  } catch (error) {
    ////console.log(error);
  }
}
