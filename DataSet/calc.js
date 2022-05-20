const fs = require("fs");
const keyword_extractor = require("keyword-extractor");

const ProblemDirectory = "./Problems/";

function count(str, find) {
  return str.split(find).length - 1;
}

let fileNames = fs.readdirSync(ProblemDirectory);
fileNames.map((file, i) => {
  fileNames[i] = `${ProblemDirectory}${file}`;
});

const totalNumberOfDocument = fileNames.length;

let allDocContent = "";
fileNames.forEach((file) => {
  let str = fs.readFileSync(file).toString();
  allDocContent += str.toLowerCase();
});

const allDocKeywords = keyword_extractor
  .extract(allDocContent, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  })
  .sort();

allDocKeywords.forEach((keyword) => {
  fs.writeFileSync("keywords.txt", keyword + "\n", { flag: "a+" });
});

let IDFArray = [];

allDocKeywords.forEach((keyword, i) => {
  let t = 0;
  fileNames.forEach((file) => {
    let str = fs.readFileSync(file).toString().toLowerCase();
    if (str.includes(keyword)) {
      t++;
    }
  });
  const idf = Math.log(totalNumberOfDocument / t) + 1;
  IDFArray[i] = idf;
  fs.writeFileSync("IDF.txt", idf + "\n", { flag: "a+" });
});

let magnitudeOfDoc = [];

fileNames.forEach((file, i) => {
  let str = fs.readFileSync(file).toString().toLowerCase();
  const noOfKeyWordInDoc = keyword_extractor.extract(str, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false,
  }).length;
  let val = 0;
  allDocKeywords.forEach((keyword, j) => {
    const idf = IDFArray[j];
    const tf = count(str, keyword) / noOfKeyWordInDoc;
    let ans = idf * tf * 1;
    ans = ans + "";
    if (ans != NaN && ans > 0) {
      fs.writeFileSync("TFIDF.txt", i + " " + j + " " + ans + "\n", {
        flag: "a+",
      });
      val += ans * 1 * (ans * 1);
    }
  });
  magnitudeOfDoc[i] = Math.sqrt(val);
  fs.writeFileSync("magnitude.txt", magnitudeOfDoc[i] + "\n", {
    flag: "a+",
  });
});
