import { createContext } from "react";

// 모든 page에서 사용할 수 있는 전역 변수 만들기 위해
const UserContext = createContext<any>(null);

export default UserContext;
