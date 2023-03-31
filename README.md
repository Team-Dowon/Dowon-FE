# 은어 탐지 변환 앱-프론트엔드 : 🇰🇷 💬

## 프로젝트 소개
- 은어 변환 및 추출 기능과 은어 사전을 통해 은어에 대한 정보를 공유하면서 은어로 인한 세대 차이를 해결하고자 하기 위해 개발하였습니다
- 커뮤니티를 크롤링해 자체 은어 사전을 개발하여 초성별 은어 확인 및 은어 검색기능을 구현하였습니다.
- 자체 구축한 은어 사전과 konlpy 형태소분석기를 사용해 입력된 문장에서 은어를 확인하고 추출하는 은어 추출 기능과 추출한 은어를 이해하기 쉬운 단어로 변환 시키는 은어 변환 기능을 구현하였습니다.
- 자체 커뮤니티를 만들어 새로 생겨나는 은어에 대한 여론 및 정보를 수집하고 공유할 수 있습니다.

## 사용한 기술스택
| 기술스택 | 채용한 이유 | 
| :-----------------------------------------------: | ---------------------------------------------- |
| <img src="https://img.shields.io/badge/React Native-61DAFB?style=for-the-badge&logo=React&logoColor=white"> | Typescript와 React를 사용하여 멀티 플랫폼 어플리케이션을 만들기 위해 사용하였습니다 | 
| <img src="https://img.shields.io/badge/Expo Go-000020?style=for-the-badge&logo=Expo&logoColor=white&margin=auto"> | React Native 앱을 더 쉽게 빌드하고 실시간으로 테스트하기 위해 사용하였습니다 |
| <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> | 오류 발생 위험도를 줄이고 코드의 안전성을 높이기 위해 사용하였습니다 |

## 자연어 처리 라이브러리

|                     라이브러리                      |                     채용 이유                     | 
|:-----------------------------------------------:|:----------------------------------------------:|
| <img src="https://user-images.githubusercontent.com/62326659/201982878-ecad8e50-3210-4b8c-a010-5fcef6cd621d.png" width="100" height="120"/> | konlpy의 okt가 파이썬 형태소 분석기 중 합리적인 속도를 가졌고 저희의 프로젝트 주제에 적합한 라이브러리라 생각하여 사용하였습니다. |
| <img src="https://user-images.githubusercontent.com/62326659/201983024-3b69b8e2-be3e-4ebf-ba5b-a7e8e19c6e6b.png" width="200" height="80"/> | 은어가 들어간 문장을 감성분석을 통해 대략적인 분위기를 알 수 있도록 하기 위해 사용하였습니다. | 
<br>

## 실제 어플리케이션 화면
![image](https://user-images.githubusercontent.com/62326659/229184695-bdfc9d79-a2f6-444c-8cd8-7a636e8b132d.png)


<br>

## 환경 설정 과정

```bash
git clone https://github.com/Team-Dowon/Dowon-FE.git
npm install -g expo-cli
npm --force install

visual studio code 재실행
```

## 포스트맨 링크
https://documenter.getpostman.com/view/21736267/VUxSrR38

## 요구사항명세서 및 설계명세서
[요구사항명세서+설계명세서.pdf](https://github.com/Team-Dowon/Dowon-FE/files/10682441/%2B.pdf)

## 라이센스

MIT &copy; [나규태](mailto:ncb6206@gmail.com) [양영재](mailto:y2336789@gmail.com)
