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
