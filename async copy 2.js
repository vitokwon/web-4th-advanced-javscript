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
