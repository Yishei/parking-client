import urls from "./urls.json";

export const login = async (user) => {
  try {
    let res = await fetch(`${urls.baseURl}${urls.post.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user }),
      credentials: "include",
    });
    console.log(res);
    if (res.status === 200) {
      localStorage.setItem("token", res.headers.get("token"));
    }
    res = await res.json();
    return res;
  } catch (err) {
    return "error";
  }
};

export const singOut = async () => {
  console.log("singOut");
  localStorage.removeItem("token");
  try {
    await fetch(`${urls.baseURl}${urls.post.logout}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return "success";
  } catch (err) {
    console.log(err);
    return "error";
  }
};
