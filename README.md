# 비동기 코드 & 콜백 함수, 비동기 코드 에러 처리, 프로미스, async와 await 

## 비동기 코드와 콜백함수

```JavaScript
// 1) 비동기 코드와 콜백함수

const fs = require("fs");

function readFile() {
  let fileData;

  fileData = fs.readFileSync("data.txt");
  // 1) Sync = Synchronous (동기)
  // Operation must be completed before following operations can be started and executed.
  // 해당 구문의 실행이 완료되기 전까지 다음 구문 실행 안됨.
  // 만약 용량이 큰 파일이거나 읽는 데 시간이 오래걸린다면?
  // 동시의 장기 작업이 필요할 경우?

  console.log(fileData);
  // 출력 : '<Buffer 54 68 69 73 20 ~~'
  console.log(fileData.toString());
  // 출력 : 'This works - data from the text file!'
  console.log("Hi There!");

  // 출력 순서 (동기, 순서대로 코드 진행)
  // 1. '<Buffer 54 68 69 73 20 ~~'
  // 2. 'This works - data from the text file!'
  // 3. 'Hi There!'

  // 2) Asynchronous (비동기)
  // Operations can be executed simultanousely with other operations
  // NOT block the execution of following code.
  // fileData = fs.readFile("data.txt", function() { // 값을 반환하지 않음.
  fs.readFile("data.txt", function (error, fileData) {
    // 'readFile'의 콜백함수로 매개변수(error,fileData) 수신
    console.log("File parsing done!");
    console.log(fileData.toString()); // 함수 내부에서만 실행 가능.
  });

  // console.log(fileData.toString());
  // 에러 발생, Cannot read properties of undefined (reading 'toString')
  // 'data.txt'파일을 읽음과 동시에 다음 코드 실행하기 때문. (비동기)

  console.log("Hi There!");

  // 출력 순서 (비동기, 완료되는 코드부터 출력)
  // 1. 'Hi There!'이 가장 먼저 출력 후,
  // 2. 'File parsing done!' 출력
  // 3. 'This works - data from the text file!' 출력.
}
readFile();

```

## 프로미스, 프로미스 체인, asynch와 await

```javascript
// 2) 프로미스 (파일시스템 패키지)

const fs = require("fs");
const fs2 = require("fs/promises"); // 파일시스템 프로미스 버전

function readFile() {
  // 콜백함수 없음. 프로미스 반환, then() 메소드.
  fs2.readFile("data.txt").then(function (fileData) {
    // 콜백함수를 'readFile'에 전달하지 않음
    // 'readFile'을 'then'에 전달하여 호출
    console.log("File parsing done!");
    console.log(fileData.toString());
  });

  console.log("Hi there!");
}
readFile();

```

```javascript
// 2) 프로미스 이점, 프로미스 체인 (파일시스템 패키지)
// 구조화된 작업 가능
// 콜백함수 내부의 콜백함수 = 콜백지옥
const fs = require("fs");
const fs2 = require("fs/promises"); // 파일시스템 프로미스 버전

function readFile() {
  // 콜백함수 없음. 프로미스 반환, then() 메소드.
  // 프로미스 체인
  fs2
    .readFile("data.txt")
    .then(function (fileData) {
      // 콜백함수를 'readFile'에 전달하지 않음
      // 'readFile'을 'then'에 전달하여 호출
      console.log("File parsing done!");
      console.log(fileData.toString());

      return anotherAsynchOperation; // 값 반환
    })
    .then(function () {
      console.log("something");
    });

  console.log("Hi there!");
}
readFile();
```

```javascript
// 4) 프로미스 추가기능 (async / await로 코드 개선)
// 'async'로 비동기 함수로 선언하고 항상 promise 반환 함.
// 'await'로 promise가 완료될때까지 비동기 작업 실행 일시 중단
// 'await'뒤에는 promise가 오고, promise가 처리될 때까지 대기하다가 처리 결과 반환

const fs = require("fs");
const fsPromise = require("fs/promises");

// 비동기 함수로 선언 'async', promise 반환
async function readFile() {
  // 'await' 선언
  // 비동기적, then이 포함되어 값을 반환
  // try/catch 사용가능
  try {
    const fileData = await fsPromise.readFile("data.txt");
    console.log("File parsing done!");
    console.log(fileData.toString());    
  } catch(error) {
    console.log(error)
  }

  console.log("Hi there!");
}
readFile();
```

## 비동기 코드 오류 처리

```javascript
// 3) 비동기 코드 오류 처리

const fs = require("fs");
const fs2 = require("fs/promises"); // 파일시스템 프로미스 버전

// 1) 콜백함수 에러 처리 (if 사용)
function readFile() {
  fs.readFile("data.txt", function (error, fileData) {
    if (error) {
      //....something
    }
    console.log("File parsing done!");
    console.log(fileData.toString());
  });

  console.log("Hi there!");
}
readFile();

// 2) 프로미스 에러 처리 (catch 메소드)
function readFile2() {
  fs2
    .readFile("data.txt")
    .then(function (fileData) {
      console.log("File parsing done!");
      console.log(fileData.toString());
      return anotherAsynchOperation; // 값 반환
    })
    // catch 메소드로 에러 처리
    .catch(function (error) {
      console.log("error");
    })
    .then(function () {
      console.log("something");
    });

  console.log("Hi there!");
}
readFile();
readFile2();

```