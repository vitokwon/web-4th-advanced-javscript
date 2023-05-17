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
