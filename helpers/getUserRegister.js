import { APIS, END_POINTS } from "../util/constants"

export default async function getUserRegister(params = "") {
  params = params && new URLSearchParams(params)
  const url = `${APIS.MOCKAPI_POSTS}${END_POINTS.USER_REGISTRATION}`
  const query = params ? `${url}?${params}` : url
  try {
    const response = await fetch(query)
    const responseBody = await response.json()
    const statusText = response.status

    if (statusText !== 200) {
      return { data: [], statusText }
    }

    return { data: responseBody, statusText }
  } catch (error) {
    return { data: [], error }
  }
}
