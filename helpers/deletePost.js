import { APIS, END_POINTS } from "../util/constants"

//`${APIS.MOCKAPI_POSTS}${END_POINTS.USER_REGISTRATION}`
export const deletePost = async id_post => {
  try {
    const response = await fetch(
      `${APIS.MOCKAPI_POSTS}${END_POINTS.DELETE}${id_post}` ,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    const responseBody = await response.json()
    const statusText = response.status

    return { responseBody, statusText }
  } catch (err) {
    //console.log(err)
  }
}
