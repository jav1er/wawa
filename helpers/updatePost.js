import { APIS, END_POINTS } from "../util/constants"

export async function updatePost(data) {
  ////console.log(data);
  try {
    const response = await fetch(
      `${APIS.MOCKAPI_POSTS}${END_POINTS.PUT}${data.id}` ,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    )

    const responseBody = await response.json()
    //const statusText = response.statusText;
    return responseBody
  } catch (error) {
    ////console.log(error);
  }
}
