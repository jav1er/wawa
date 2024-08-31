import fetch, { AbortError } from "node-fetch";
export default async function get_image(req, res) {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 4000);
  const imageUrl = req.query.url;
  try {
    const response = await fetch(imageUrl, {
      signal: controller.signal,
    });

    if (response.status === 200) {
      res.status(200).json({ url: imageUrl });
    } else {
      res.status(500).json({ error: "Error loading image" });
    }
    //////console.log(responseResult);
  } catch (error) {
    if (error instanceof AbortError) {
      ////console.log(" 504 request was aborted");
      res.status(504).json({ msg: "Gateway Timeout" });
    }
  } finally {
    clearTimeout(timeout);
  }
}
