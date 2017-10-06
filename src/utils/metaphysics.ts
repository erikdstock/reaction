import * as sharify from "sharify"

export class NetworkError extends Error {
  response: any
}

export function metaphysics<T>(
  payload: { query: string; variables?: object },
  checkStatus: boolean = true
): Promise<T> {
  const metaphysicsURL = sharify.data.METAPHYSICS_ENDPOINT
  const localData = sharify.data as sharify.ResponseLocalData
  const user = localData.CURRENT_USER
  // console.log(sharify.data, localData)
  // debugger
  // console.log("*******")
  return fetch(metaphysicsURL, {
    method: "POST",
    headers: !!user
      ? {
          "X-USER-ID": user.id,
          "X-ACCESS-TOKEN": user.accessToken,
          "Content-Type": "application/json",
        }
      : { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(response => {
      if (!checkStatus || (response.status >= 200 && response.status < 300)) {
        return response
      } else {
        const error = new NetworkError(response.statusText)
        error.response = response
        throw error
      }
    })
    .then<T>(response => response.json())
}

export default function query<T>(query: string): Promise<T> {
  return metaphysics<{ data: T }>({ query }).then(({ data }) => data)
}
