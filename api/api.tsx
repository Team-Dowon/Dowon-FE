import axios from "axios";

// ec2서버 url 설정
const baseUrl =
  "http://ec2-54-180-119-169.ap-northeast-2.compute.amazonaws.com/api/";

const sentimentUrl =
  "http://ec2-13-209-64-199.ap-northeast-2.compute.amazonaws.com/api/";

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

export const axios_sentiment_post = async (url: string, sendData: any) => {
  const response = await axios.post(`${sentimentUrl}${url}`, sendData, {
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

//axios의 patch(데이터 일부 수정)을 하기 위한 함수
export const axios_patch = async (url: string, sendData: any) => {
  const response = await axios.patch(`${baseUrl}${url}`, sendData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

//axios의 delete(데이터 삭제)를 하기 위한 함수
export const axios_delete = async (url: string) => {
  const response = await axios.delete(`${baseUrl}${url}`);
  return response;
};
