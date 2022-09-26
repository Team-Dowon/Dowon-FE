import axios from "axios";

// ec2서버 url 설정
const baseUrl = "http://ec2-54-180-119-169.ap-northeast-2.compute.amazonaws.com/api/";

//url은 string 타입 sendData는 json 형식으로 받음
//axios의 post(데이터 보내기)를 하기 위한 함수
export const axios_post = async (url: string, sendData: any) => {
  const response = await axios.post(`${baseUrl}${url}`, sendData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

//axios의 get(데이터 가져오기)을 하기 위한 함수
export const axios_get = async (url: string) => {
  const response = await axios.get(`${baseUrl}${url}`);
  return response;
};

//axios의 put(데이터 수정)을 하기 위한 함수
export const axios_put = async (url: string, sendData: any) => {
  const response = await axios.put(`${baseUrl}${url}`, sendData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

//axios의 delete(데이터 삭제)를 하기 위한 함수
export const axios_delete = async (url: string) => {
  const response = await axios.delete(`${baseUrl}${url}`);
  return response;
};
