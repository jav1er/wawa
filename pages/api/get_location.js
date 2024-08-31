import fetch, { AbortError } from "node-fetch";
export default async function get_location(req, res) {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 4000);

  try {
    const response = await fetch(
      "https://ipinfo.io/json?token=ffb41a001989ff",
      {
        signal: controller.signal,
      }
    );
    const result = await response.json();
    ////console.log(result);
    if (response.status === 200) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: "Error loading location" });
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
