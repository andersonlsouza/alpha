import { createContext } from "react";
import { IUser } from "../App";

interface IContext {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export const UserContext = createContext<IContext>({
  user: null,
  setUser: () => {},
});
