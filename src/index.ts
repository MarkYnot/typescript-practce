// const URL_TIMEOUT = "https://user1713861685783.requestly.tech/timeout";
// const URL_200 = "https://user1713861685783.requestly.tech/orders";
// const URL_500 = "https://user1713861685783.requestly.tech/flights";
// const RESOURCES = {
//   orders: "/orders",
//   serverError: "/server-error",
//   notFound: "/not-found",
//   notAuthorized: "/not-authorized`",
// };

// const BASE_URL = "https://9869a3a9-f664-4a36-9b12-8eaa99787ff8.mock.pstmn.io";

// class HttpError extends Error {
//   response: Response;
//   constructor(response: Response) {
//     super(`${response.status} for ${response.url}`);
//     this.response = response;
//   }
// }

// type FetchDataResponse<T> =
//   | { data: T; error: undefined }
//   | { data: undefined; error: string };

// const fetchData = async <T>(
//   resource: keyof typeof RESOURCES
// ): Promise<FetchDataResponse<T>> => {
//   const url = new URL(RESOURCES[resource], BASE_URL);

//   try {
//     const data = await fetch(url, {
//       method: "GET",
//       signal: AbortSignal.timeout(3000),
//     });

//     if (!data.ok) {
//       throw new HttpError(data); //http error library; class
//     }
//     return { error: undefined, data: await data.json() };
//   } catch (error) {
//     if (error instanceof DOMException && error.name === "TimeoutError") {
//       return { error: "Request Timed out", data: undefined };
//     }

//     if (error instanceof HttpError) {
//       if (error.response.status === 500) {
//         return { error: "Server down", data: undefined };
//       } else if (error.response.status === 404) {
//         return { error: "Not Found", data: undefined };
//       }
//     }
//   }
//   return { error: "other error", data: undefined };
// };

// fetchData<{ orderId: string }>("orders").then((value) => console.log(value));
