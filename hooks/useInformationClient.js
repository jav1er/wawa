export const getDataUser = async () => {
  const request = await fetch("https://ipinfo.io/json?token=41b85250a6100d");
  const jsonResponse = await request.json();
  return jsonResponse;
};
