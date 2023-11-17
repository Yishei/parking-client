export const apiService = {
  async get(url) {
    try {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response, "response")
      if (response.status === 401) {
        console.log(response, "response")
        response = await response.json();
        console.log(response, "response")
        throw new Response(response.message,{ status: 401 })
      }
      else if (response.status !== 200) {
        throw new Response("An error has occured", { status: 500 })
        }

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  // other methods (post, put, delete)...
};
