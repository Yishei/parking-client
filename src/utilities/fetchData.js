import urls from "./urls.json";

export const getCondos = async () => {
  try {
    const response = await fetch(urls.getCondosForAdmin, {
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
    const response = await fetch(`${urls.getLotsForCondo}${condoId}`, {
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
    const response = await fetch(`${urls.getCamerasForLot}${lotId}`, {
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
    const response = await fetch(`${urls.getUsersForCondo}${condoId}`, {
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
    const response = await fetch(`${urls.getUnitsForCondo}${condoId}`, {
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

export const getTowings = async (condoId) => {
  try {
    const response = await fetch(`${urls.getTowingForCondo}${condoId}`, {
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