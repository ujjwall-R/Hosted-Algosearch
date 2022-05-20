const express = require("express");
var path = require("path");
const router = new express.Router();
const fs = require("fs");
const keyword_extractor = require("keyword-extractor");

function count(str, find) {
  return str.split(find).length - 1;
}

const ProblemDirectory = "./DataSet/Problems/";
let fileNames = fs.readdirSync(ProblemDirectory);
fileNames.map((file, i) => {
  fileNames[i] = `./${ProblemDirectory}${file}`;
});
const totalNumberOfDocument = fileNames.length;

const IDFArray = fs.readFileSync("./DataSet/IDF.txt").toString().split("\n");

const TFIDFArrayAsString = fs
  .readFileSync("./DataSet/TFIDF.txt")
  .toString()
  .split("\n");

const TFIDFArray = TFIDFArrayAsString.map((elem) => {
  return elem.split(" ");
});
// console.log(TFIDFArray); //[[nth doc,mth keyword,tfIdf vale],[...],[..],[...]]

const AllKeyWords = fs
  .readFileSync("./DataSet/keywords.txt")
  .toString()
  .split("\n");
// console.log(AllKeyWords);

//@description:testing
router.get("/hi", async (req, res) => {
  try {
    res.send("Route working.");
  } catch (error) {
    res.status(400).send();
  }
});

//@description:search a text
//public
//
router.post("/search/text", async (req, res) => {
  try {
    const text = req.body.text.toString().toLowerCase();

    const NoOfKeyWordsInDoc = keyword_extractor.extract(text, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false,
    }).length;

    let TfOfText = [];
    let TFIDFOfText = [];
    AllKeyWords.forEach((keyword, i) => {
      TfOfText[i] = count(text, keyword) / NoOfKeyWordsInDoc;
      TFIDFOfText[i] = TfOfText[i] * (1 * IDFArray[i]);
      if (!TFIDFOfText[i]) TFIDFOfText[i] = 0;
    });
    let DotProDocumentWise = [];
    fileNames.forEach((f, i) => {
      DotProDocumentWise[i] = [0, i];
    });
    TFIDFArray.forEach(([i, j, val]) => {
      i = i * 1;
      j = j * 1;
      val = val * 1;
      if (val * TFIDFOfText[j])
        DotProDocumentWise[i][0] += val * TFIDFOfText[j];
    });
    DotProDocumentWise = DotProDocumentWise.sort().reverse();

    if (DotProDocumentWise[10][0] > 0)
      search_result = DotProDocumentWise.slice(0, 10);
    else if (DotProDocumentWise[5][0] > 0)
      search_result = DotProDocumentWise.slice(0, 5);
    else search_result = [];

    let questionsFound = [];
    let urls = [];
    let titles = [];
    let contents = [];
    search_result.forEach((element, i) => {
      questionsFound[i] = fileNames[element[1]];
    });
    questionsFound.forEach((element, i) => {
      titles[i] = element.substring(element.lastIndexOf("/") + 1);
      titles[i] = titles[i].slice(0, -4);
      contents[i] =
        fs
          .readFileSync(`./DataSet/Problems/${titles[i]}.txt`)
          .toString()
          .slice(2, 350) + "...";
    });
    titles.forEach((element, i) => {
      urls[i] = `https://www.codechef.com/problems/${element}`;
    });

    res.send({ questionsFound, urls, titles, contents });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
