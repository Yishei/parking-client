export const apiService = {
  /**
   * Sends a GET request to the specified URL.
   * @async
   * @memberof apiService
   * @param {string} url - The URL to send the request to.
   * @returns {Promise<any>} - A promise that resolves to the response data.
   * @throws {Response} - If the response status is 401, an error response is thrown.
   * @throws {Response} - If the response status is not 200, an error response is thrown.
   */
  async get(url) {
    try {
      console.trace(url, "url");
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.status === 401) {
        response = await response.json();
        throw new Response(response.message, { status: 401 });
      } else if (response.status !== 200) {
        throw new Response("An error has occured", { status: 500 });
      }

      const data = await response.json();
      console.log(data, "data");
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  /**
   * Sends a PUT request to the specified URL with the given request body.
   * @async
   * @memberof apiService
   * @param {string} url - The URL to send the request to.
   * @param {Object} body - The request body to send.
   * @returns {Promise<string>} - A promise that resolves to "success" if the request is successful, otherwise "fail".
   */
  async put(url, body) {
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });
      console.log(res, "res");
      if (res.status === 200) return "success";
      else return "fail";
    } catch (error) {
      console.log(error, "error");
      return "fail";
    }
  },

  /**
   * Sends a POST request to the specified URL with the given request body.
   * @async
   * @memberof apiService
   * @param {string} url - The URL to send the request to.
   * @param {Object} body - The request body to send.
   * @returns {Promise<any|string>} - A promise that resolves to the response data if the request is successful, otherwise "fail".
   */
  async post(url, body) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });

      const response = await res.json();
      if (res.status === 200) return response;
      else return "fail";
    } catch (error) {
      console.log(error, "error");
      return "fail";
    }
  },

  /**
   * Sends a DELETE request to the specified URL.
   * @async
   * @memberof apiService
   * @param {string} url - The URL to send the request to.
   * @returns {Promise<string>} - A promise that resolves to "success" if the request is successful, otherwise "fail".
   */
  async delete(url) {
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log(res, "res");
      if (res.status === 200) return "success";
      else return "fail";
    } catch (error) {
      console.log(error, "error");
      return "fail";
    }
  },
};
