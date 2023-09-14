
const baseURL = import.meta.env.VITE_API_URL

const makeAPICall = async (
  { path, method = "GET", payload = null, params = null },
  customConfigs
) => {
  const headers = {
    Accept: "application/json, */*",
    "Content-type": "application/json",
  };

  const configs = {
    method,
    headers,
    ...customConfigs,
  };

  if (payload) configs.body = JSON.stringify(payload);

  let url = new window.URL(`${baseURL}${path}`);

  const buildParams = (data) => {
    const params = new window.URLSearchParams();

    for (let [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          params.append(`${key}[]`, item);
        });
      } else {
        params.append(key, value);
      }
    }

    return params;
  };

  if (params) url.search = buildParams(params);

  return window
    .fetch(url, configs)
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        let errorMessage;
        if (data && data.messages) {
          if (typeof data.messages === "string") {
            errorMessage = data.messages;
          } else if (Array.isArray(data.messages)) {
            errorMessage = data.messages
              .map(({ message, token_class }) => `${token_class}: ${message}`)
              .join(", ");
          }
        } else {
          errorMessage = "An unknown error occurred!";
        }

        let error = new Error(errorMessage);
        return Promise.reject(error);
      }
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export default makeAPICall;