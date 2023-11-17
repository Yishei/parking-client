import urls from "./urls.json";

const baseURL = urls.baseURl;

// ALL GET REQUESTS
export const getCondos = async () => {
  try {
    const response = await fetch(`${baseURL}${urls.get.condosForAdmin}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(response, "response");
    if (response.status === 401) {
      console.log("unauthorized");
      throw new Error("Unauthorized");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getLots = async (condoId) => {
  try {
    const response = await fetch(
      `${baseURL}${urls.get.lotsForCondo}${condoId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCameras = async (lotId) => {
  try {
    const response = await fetch(
      `${baseURL}${urls.get.camerasForLot}${lotId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUsers = async (condoId) => {
  try {
    const response = await fetch(
      `${baseURL}${urls.get.usersForCondo}${condoId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUnits = async (condoId) => {
  try {
    const response = await fetch(
      `${baseURL}${urls.get.unitsForCondo}${condoId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCarsForUnit = async (unitId) => {
  try {
    const response = await fetch(`${baseURL}${urls.get.carsForUnit}${unitId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log(data, "cars for unit");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getLogs = async (lotId) => {
  try {
    const response = await fetch(`${baseURL}${urls.get.logsForLot}${lotId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUsersOptions = async () => {
  try {
    const response = await fetch(`${baseURL}${urls.get.usersForSelect}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCondosOptions = async () => {
  try {
    const response = await fetch(`${baseURL}${urls.get.condosForLotTable}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const seeIfCameraExists = async (camId, uptRcId) => {
  try {
    let url = `${baseURL}${urls.get.seeIfCamaeraExists}?camId=${camId}`;

    if (uptRcId !== undefined) url += `&uptRcId=${uptRcId}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const exists = await res.json();
    return exists;
  } catch (error) {
    throw new Error(error);
  }
};

export const seeIfEmailExists = async (email, uptRcId) => {
  try {
    let url = `${baseURL}${urls.get.seeIfEmailExists}?email=${email}`;

    if (uptRcId !== undefined) url += `&uptRcId=${uptRcId}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const exists = await res.json();
    return exists;
  } catch (error) {
    throw new Error(error);
  }
};

export const seeIfPhoneExists = async (phone, uptRcId) => {
  try {
    let url = `${baseURL}${urls.get.seeIfPhoneExists}?phone=${phone}`;

    if (uptRcId !== undefined) url += `&uptRcId=${uptRcId}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const exists = await res.json();
    return exists;
  } catch (error) {
    throw new Error(error);
  }
};

export const seeIfCarIsLocked = async (plateNumber) => {
  const plate = plateNumber.toLowerCase();
  try {
    const res = await fetch(`${baseURL}${urls.get.seeIfCarIsLocked}${plate}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const isLocked = await res.json();
    return isLocked;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMaxCarsForCondo = async (condoId) => {
  try {
    const res = await fetch(`${baseURL}${urls.get.getMaxCars}${condoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const maxCars = await res.json();
    return maxCars.max_cars;
  } catch (error) {
    throw new Error(error);
  }
};

export const getOtp = async (email) => {
  try {
    const res = await fetch(`${baseURL}${urls.get.otp}?email=${email}`, {
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

// ALL PUT REQUESTS

export const updateLot = async (lotId, lot) => {
  try {
    const res = await fetch(`${baseURL}${urls.put.updateLot}${lotId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(lot),
    });

    if (res.status === 200) return "success";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const updateCondo = async (condoId, condo) => {
  try {
    const res = await fetch(`${baseURL}${urls.put.updateCondo}${condoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(condo),
    });
    if (res.status === 200) return "success";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const updateCamera = async (cameraId, camera) => {
  try {
    const res = await fetch(`${baseURL}${urls.put.updateCamera}${cameraId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(camera),
    });

    if (res.status === 200) return "success";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const updateUser = async (userId, user) => {
  try {
    const res = await fetch(`${baseURL}${urls.put.updateUser}${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(user),
    });

    if (res.status === 200) return "success";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const updateUnit = async (unitId, unit) => {
  try {
    delete unit.unit_id;
    const res = await fetch(`${baseURL}${urls.put.updateUnit}${unitId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(unit),
    });

    if (res.status === 200) return "success";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const updateCar = async (carId, car) => {
  console.log(carId, car);
  try {
    const url = `${baseURL}${urls.put.updateCar}${carId}`;
    console.log(url);
    const res = await fetch(`${baseURL}${urls.put.updateCar}${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(car),
    });

    if (res.status === 200) return "success";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

// ALL POST REQUESTS

export const createCondo = async (condo) => {
  try {
    const res = await fetch(`${baseURL}${urls.post.createCondo}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(condo),
    });

    const response = await res.json();
    if (res.status === 200) return response;
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const createUnit = async (unit) => {
  try {
    const res = await fetch(`${baseURL}${urls.post.createUnit}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(unit),
    });

    const response = await res.json();

    if (res.status === 200) return response;
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const createCar = async (car) => {
  try {
    const res = await fetch(`${baseURL}${urls.post.createCar}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(car),
    });

    const response = await res.json();
    if (res.status === 200) return response;
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const createLot = async (lot) => {
  console.log(lot);
  try {
    const res = await fetch(`${baseURL}${urls.post.createLot}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(lot),
    });

    const response = await res.json();
    if (res.status === 200) return response;
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const createCamera = async (camera) => {
  try {
    const res = await fetch(`${baseURL}${urls.post.createCamera}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(camera),
    });

    const response = await res.json();
    if (res.status === 200) return response;
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const createUser = async (user) => {
  try {
    const res = await fetch(`${baseURL}${urls.post.createUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(user),
    });

    const response = await res.json();
    if (res.status === 200) return response;
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const setPass = async (token, pass) => {
  try {
    const res = await fetch(`${baseURL}${urls.post.setPassword}`, {
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
    const res = await fetch(`${baseURL}${urls.post.otp}`, {
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
// ALL DELETE REQUESTS

export const deleteCondo = async (condoId) => {
  try {
    const res = await fetch(`${baseURL}${urls.delete.deleteCondo}${condoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(res);
    if (res.status === 200) return "success";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const deleteLot = async (lotId) => {
  try {
    const res = await fetch(`${baseURL}${urls.delete.deleteLot}${lotId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(res);
    if (res.status === 200) return "success";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const deleteUnit = async (unitId) => {
  try {
    const res = await fetch(`${baseURL}${urls.delete.deleteUnit}${unitId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(res);
    if (res.status === 200) return "success";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const deleteCamera = async (cameraId) => {
  try {
    const res = await fetch(
      `${baseURL}${urls.delete.deleteCamera}${cameraId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(res);
    if (res.status === 200) return "success";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await fetch(`${baseURL}${urls.delete.deleteUser}${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(res);
    if (res.status === 200) return "success";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};

export const deleteCar = async (carId) => {
  try {
    const res = await fetch(`${baseURL}${urls.delete.deleteCar}${carId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(res);
    if (res.status === 200) return "success";
    else return "fail";
  } catch (error) {
    console.error(error);
    return "fail";
  }
};
