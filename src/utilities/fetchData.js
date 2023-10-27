import urls from "./urls.json";

// ALL GET REQUESTS
export const getCondos = async () => {
  try {
    const response = await fetch(urls.get.condosForAdmin, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLots = async (condoId) => {
  try {
    const response = await fetch(`${urls.get.lotsForCondo}${condoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export const getCameras = async (lotId) => {
  try {
    const response = await fetch(`${urls.get.camerasForLot}${lotId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export const getUsers = async (condoId) => {
  try {
    const response = await fetch(`${urls.get.usersForCondo}${condoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export const getUnits = async (condoId) => {
  try {
    const response = await fetch(`${urls.get.unitsForCondo}${condoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export const getLogs = async (lotId) => {
  try {
    const response = await fetch(`${urls.get.logsForLot}${lotId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    const response = await fetch(`${urls.get.towingForCondo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    const response = await fetch(urls.get.condosForLotTable, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// ALL PUT REQUESTS

export const updateLot = async (lotId, lot) => {
  try {
    const res = await fetch(`${urls.put.updateLot}${lotId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
    const res = await fetch(`${urls.put.updateCondo}${condoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(condo),
    });
    return res.status;
  } catch (error) {
    console.error(error);
    return 500;
  }
};

export const updateCamera = async (cameraId, camera) => {
  try {
    const res = await fetch(`${urls.put.updateCamera}${cameraId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
    const res = await fetch(`${urls.put.updateUser}${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
    const res = await fetch(`${urls.put.updateUnit}${unitId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
// ALL POST REQUESTS

export const createCondo = async (condo) => {
  try {
    const res = await fetch(urls.post.createCondo, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
