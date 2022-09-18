import axios from "axios";

const baseUrl =
  "http://ec2-3-38-115-95.ap-northeast-2.compute.amazonaws.com/api/";

//url은 string 타입 sendData는 json 형식으로 받음
export const axios_post = async (url: string, sendData: any) => {
  const response = await axios.post(`${baseUrl}${url}`, sendData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

// 이건 나중에 더 확인해볼 예정
export const axios_get = async (url: string) => {
  const response = await axios.get(`${baseUrl}${url}`);
  return response;
};