const URL_TIMEOUT = "https://user1713861685783.requestly.tech/timeout";
const URL_200 = "https://user1713861685783.requestly.tech/orders";
const URL_500 = "https://user1713861685783.requestly.tech/flights";

class HttpError extends Error {
  constructor(public response: Response) {
    super(`${response.status} for ${response.url}`);
    // this.response = response;
  }
}

interface data {
  data: unknown;
  error: string | undefined;
}

const fetechData = async (url: string) => {
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

console.log(fetechData(URL_TIMEOUT));
