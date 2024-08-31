import { APIS, END_POINTS } from "../util/constants"

export async function createPost(data) {
  try {
    const response = await fetch(
      `${APIS.MOCKAPI_POSTS}${END_POINTS.POST}` ,
      {
        method: "POST",
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
    //console.log(error)
  }
}
