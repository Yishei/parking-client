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

export const getOtp = async (email) => {
  try {
    const res = await fetch(`${urls.baseURl}${urls.get.otp}?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) return "success";
    else if (res.status === 400) return "userNotFound";
    else return "fail";
  } catch (error) {
    return "fail";
  }
};

export const setPass = async (token, pass) => {
  try {
    const res = await fetch(`${urls.baseURl}${urls.post.setPassword}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ token, pass }),
    });

    if (res.status === 200) return "success";
    else if (res.status === 401) return "unauthorized";
    else if (res.status === 400) return "passSet";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const postOtp = async (email, otp) => {
  try {
    const res = await fetch(`${urls.baseURl}${urls.post.otp}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });
    console.log(res, "res token");
    const token = await res.json();
    console.log(token, "token");
    if (res.status === 200) return { status: "success", token };
    else if (res.status === 400) return { status: "otpIncorrect" };
    else return { status: "fail" };
  } catch (error) {
    return { status: "fail" };
  }
};
