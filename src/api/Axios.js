import { demoUser, mockMonuments, mockPlottingData } from "./mockData";

const PLOTTING_STORAGE_KEY = "gis-demo-plotting-data";

const clone = (value) => JSON.parse(JSON.stringify(value));

const normalizePath = (path) => String(path).replace(/^\/+/, "");

const createResponse = (data, status = 200) =>
  Promise.resolve({
    data,
    status,
    statusText: status >= 400 ? "Error" : "OK",
    headers: {},
    config: {},
  });

const createError = (message, status = 400) =>
  Promise.reject({
    message,
    response: {
      status,
      data: { message },
    },
  });

const getStoredPlottingData = () => {
  if (typeof window === "undefined") {
    return clone(mockPlottingData);
  }

  try {
    const storedData = window.localStorage.getItem(PLOTTING_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : clone(mockPlottingData);
  } catch (error) {
    console.warn("Unable to read mock plotting data:", error);
    return clone(mockPlottingData);
  }
};

const savePlottingData = (plottingData) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(PLOTTING_STORAGE_KEY, JSON.stringify(plottingData));
  } catch (error) {
    console.warn("Unable to save mock plotting data:", error);
  }
};

const normalizeGeometry = (geojson) => {
  if (typeof geojson === "string") {
    return JSON.parse(geojson);
  }

  return clone(geojson);
};

const buildPlottingFeature = (payload) => {
  const plottingData = getStoredPlottingData();
  const currentIds = plottingData.features.map((feature) => Number(feature.properties?.id) || 0);
  const nextId = Math.max(0, ...currentIds) + 1;

  return {
    type: "Feature",
    geometry: normalizeGeometry(payload.geojson),
    properties: {
      id: nextId,
      title_no: payload.titleNo || "Untitled Parcel",
      title_name: payload.owner || "Demo Owner",
      pluscode: payload.pluscode || "",
    },
  };
};

const mockApi = {
  get(path) {
    const endpoint = normalizePath(path);

    if (endpoint === "userDetail") {
      return createResponse([clone(demoUser)]);
    }

    if (endpoint === "monumentData") {
      return createResponse(clone(mockMonuments));
    }

    if (endpoint === "plottingData") {
      return createResponse(getStoredPlottingData());
    }

    return createError(`Mock endpoint not found: ${path}`, 404);
  },

  post(path, payload = {}) {
    const endpoint = normalizePath(path);

    if (endpoint === "loginUser") {
      const email = String(payload.email || "").trim().toLowerCase();
      const password = String(payload.password || "");

      if (email === demoUser.email && password.length > 0) {
        return createResponse({
          status: "ok",
          user: clone(demoUser),
        });
      }

      return createError("Use user@demo.com with any password.", 401);
    }

    if (endpoint === "userDetail") {
      return createResponse({
        status: "ok",
        message: "Demo deployments use the fixed user@demo.com account.",
        user: clone(demoUser),
      }, 201);
    }

    if (endpoint === "verifyResetPassword") {
      return createResponse({
        success: true,
        message: "Password changed successfully for this browser session.",
      });
    }

    if (endpoint === "plottingData") {
      try {
        const plottingData = getStoredPlottingData();
        const feature = buildPlottingFeature(payload);

        plottingData.features = [...plottingData.features, feature];
        savePlottingData(plottingData);

        return createResponse({
          status: "ok",
          message: "Data saved successfully",
          feature,
        }, 201);
      } catch (error) {
        return createError(error.message || "Invalid plotting data.", 400);
      }
    }

    return createError(`Mock endpoint not found: ${path}`, 404);
  },
};

export default mockApi;
