/**
 * const URL_TIMEOUT = "https://user1713861685783.requestly.tech/timeout";
const URL_200 = "https://user1713861685783.requestly.tech/orders";
const URL_500 = "https://user1713861685783.requestly.tech/flights";
const RESOURCES = {
  orders: "/orders",
  serverError: "/server-error",
  notFound: "/not-found",
  notAuthorized: "/not-authorized`",
};

const BASE_URL = "https://9869a3a9-f664-4a36-9b12-8eaa99787ff8.mock.pstmn.io";
const url = new URL(RESOURCES.orders, BASE_URL);

class HttpError extends Error {
  response: Response;
  constructor(response: Response) {
    super(`${response.status} for ${response.url}`);
    this.response = response;
  }
}

type data = {
  data: unknown;
  error: string | undefined;
};

const fetchData = async (url: URL) => {
  const result: data = {
    error: undefined,
    data: undefined,
  };

  try {
    const data = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });

    if (!data.ok) {
      throw new HttpError(data); //http error library; class
    }
    const fetchResult = await data.json();
    result.data = fetchResult;
  } catch (error) {
    if (error.name === "TimeoutError") {
      result.error = "Request Timed out";
    }

    if (error instanceof HttpError) {
      if (error.response.status === 500) {
        result.error = "Server Down";
      } else if (error.response.status === 404) {
        result.error = "Not Found";
      }
    }
  }
  return result;
};

fetchData(url).then((value) => console.log(value));

 * 
 * 
 */
