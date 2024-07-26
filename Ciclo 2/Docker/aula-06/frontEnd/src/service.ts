import {
  IUser,
  ApiResponse,
  ILoginData,
  IUserData,
} from "../../backEnd/src/interfaces/interfaces";

export async function create(user: IUser) {
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  try {
    const response: Response = await fetch("/accounts/", options);
    const apiResponse: ApiResponse<IUserData> = await response.json();

    console.log(apiResponse);
  } catch (error) {
    console.error(error);
  }
}

export async function connect(user: IUser) {
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  try {
    const response: Response = await fetch("/accounts/login", options);
    const apiResponse: ApiResponse<IUserData> = await response.json();

    console.log(apiResponse);
  } catch (error) {
    console.error(error);
  }
}

export async function edit(user: IUser) {
  const options: RequestInit = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  try {
    const response: Response = await fetch("/accounts/", options);
    const apiResponse: ApiResponse<IUserData> = await response.json();

    console.log(apiResponse);
  } catch (error) {
    console.error(error);
  }
}
