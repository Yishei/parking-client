import urls from "./urls.json";

const baseURL = urls.baseURl;

// ALL GET REQUESTS
export const getCondos = async () => {
  try {
    const response = await fetch(`${baseURL}${urls.get.condosForAdmin}`, {
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
    const response = await fetch(
      `${baseURL}${urls.get.lotsForCondo}${condoId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
    const response = await fetch(
      `${baseURL}${urls.get.camerasForLot}${lotId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
    const response = await fetch(
      `${baseURL}${urls.get.usersForCondo}${condoId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
    const response = await fetch(
      `${baseURL}${urls.get.unitsForCondo}${condoId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
    const response = await fetch(`${baseURL}${urls.get.logsForLot}${lotId}`, {
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
    const response = await fetch(`${baseURL}${urls.get.towingForCondo}`, {
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
    const response = await fetch(`${baseURL}${urls.get.condosForLotTable}`, {
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

export const seeIfCameraExists = async (camId, uptRcId) => {
  try {
    let url = `${baseURL}${urls.get.seeIfCamaeraExists}?camId=${camId}`;

    if (uptRcId !== undefined) url += `&uptRcId=${uptRcId}`;
    
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const exists = await res.json();
    return exists;
  } catch (error) {
    throw new Error(error);
  }
};

// ALL PUT REQUESTS

export const updateLot = async (lotId, lot) => {
  try {
    const res = await fetch(`${baseURL}${urls.put.updateLot}${lotId}`, {
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
    const res = await fetch(`${baseURL}${urls.put.updateCondo}${condoId}`, {
      method: "PUT",
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

export const updateCamera = async (cameraId, camera) => {
  try {
    const res = await fetch(`${baseURL}${urls.put.updateCamera}${cameraId}`, {
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
    const res = await fetch(`${baseURL}${urls.put.updateUser}${userId}`, {
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
    const res = await fetch(`${baseURL}${urls.put.updateUnit}${unitId}`, {
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
    const res = await fetch(`${baseURL}${urls.post.createCondo}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const createLot = async (lot) => {
  console.log(lot);
  try {
    const res = await fetch(`${baseURL}${urls.post.createLot}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
// ALL DELETE REQUESTS

export const deleteCondo = async (condoId) => {
  try {
    const res = await fetch(`${baseURL}${urls.delete.deleteCondo}${condoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
