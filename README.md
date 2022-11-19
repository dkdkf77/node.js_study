# node.js_study

### Node.js는 Chrome V8 JavaScript 엔진으로 빌드된

**JavaScript 런타임 = 프로그래밍 언어가 동작하는 환경** 

## 👍Node.js 설치

### 컴퓨터, 크롬 브라우저 ⇒ 자바스크립트 언어를 배워야 한다

자바스크립트 언어 문법으로 컴퓨터와 브라우저를 제어 할 수 있다

### html ,css ,js 로 웹 페이지를 만들면 비효율

컴퓨터에 모듈들을 설치를 하는데 node.js로 자바스크립트 프로그래밍 언어로 변환을 시켜서 

브라우저에서 동작을 시켜줘야 하는 과정을 겪는다

브라우저 검색 ⇒ node.js 

👉설치 ⇒ LTS 버전 = 안정적이고 신뢰도가 높음

            ⇒ 최신버전 = 업데이트가 많고 안정적이지 못함 

### Node Version Manager 설치

버전을 관리 해주는 모듈 

nvm 설치 

nvm 검색  ⇒ git 안 installing and updating 확인 mac = curl 복사 , win = wget 복사

nvm ls ⇒ nvm 버전 확인

nvm install version 숫자 

nvm use verstion 숫자 

nvm uninstall version 숫자

## NPM(Node Package Manager)은

전세계의 개발자들이 만든 다양한 기능(패키지, 모듈)들을 관리

npm init -y 를 입력하면 

package.json 이 깔린다

![스크린샷 2022-11-19 오후 12 46 58](https://user-images.githubusercontent.com/88579497/202836892-28e2aa4f-3c70-4027-907f-b212c2b25314.png)


name ⇒ 폴더 이름 

version ⇒ project version

description ⇒ project 설명 

main ⇒ npm 

# 패키지 설치!

## npm add parcel -D

node_modules 설치

## npm install lodash

lodash 설치

한번 설치를 해놓으면 node_modules를 지워도 npm i , npm install 명령어로 설치 가능!

👍 package-lock.json 파일 과 package.json 파일은 삭제하면 안된다 

# -D 를 붙이면 devDependencies에 설치

안 붙이면 dependencies에 설치 되는데 

-D = 개발용 의존성 패키지 설치 ⇒ $ npm install -D XXX 

그렇지 않으면 일반 의존성 설치  ⇒ $ npm install XXX

### 개발용 의존성이란?

설치한 패키지가 개발할때만 필요하고 그외 웹 브라우저에서 실행할 때는 필요 하지 않는다 

parcel-bundler

### 일반 의존성 설치

웹 브라우저에서 동작할 수 있다는 것을 전재로 사용

lodash

# parcel bundler를 설치하면

openlive server가 필요 없이 terminal 에서 

parcel index.html , zsh: command not found: parcel 라는 오류가 뜬다 

---

![스크린샷 2022-11-19 오후 2 30 08](https://user-images.githubusercontent.com/88579497/202836907-b3773f33-c020-4d0e-aaa1-eb219c74b307.png)

👍 해결법 

pacekage.json 파일 안에 scripts 안 내용에 

"dev": "parcel index.html” 추가 후 

terminal에 npm run dev 를 실행 시켜 주면 된다

![스크린샷 2022-11-19 오후 2 50 08](https://user-images.githubusercontent.com/88579497/202836915-acda1039-400d-42e7-96ab-0ae1cdb44622.png)

dev = 개발자용 

build = 고객들이 보는 것
