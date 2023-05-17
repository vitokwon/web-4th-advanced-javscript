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