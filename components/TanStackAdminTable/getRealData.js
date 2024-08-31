import GetPosts from "../../helpers/getPosts"

export async function fetchDataReal(options) {
  let data = await GetPosts()

  let localData = data.reverse()

  return {
    rows: localData.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize,
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
  }
}
