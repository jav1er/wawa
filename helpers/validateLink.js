const validateLink = async (url, e = "") => {
  // ////console.log("entro a validateLink");
  // ////console.log(`validando ${url}`);
  const defaultResponse = "/images/file_corrupted.jpg";
  try {
    const response = await fetch(`api/get_image/?url=${url}`);
    //////console.log(response.status);
    return response.status === 200 ? url : defaultResponse;
  } catch (error) {
    //e.preventDefault();
    //console.error(error);
    return defaultResponse;
  }
};

export default validateLink;
