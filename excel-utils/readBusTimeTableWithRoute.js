const xlsx = require("xlsx");
const path = require("path");
const express = require("express");
const router = express.Router();

function getTotalEmptyCels(obj = {}) {
  let counter = 0;
  Object.keys(obj).forEach((key) => {
    if (key.indexOf("__EMPTY") > -1) {
      counter++;
    }
  });
  return counter;
}

function collectEmptyCellsTiming(
  data,
  emptyCels,
  currentIndex,
  extraEmptyCells = {}
) {
  const nextIndex = currentIndex;
  // console.log(currentIndex);
  let emptyCellsCounter = emptyCels;
  if (!data[currentIndex]) return extraEmptyCells;
  Object.keys(data[currentIndex]).forEach((key) => {
    if (key.indexOf("__EMPTY") > -1) {
      extraEmptyCells[`__EMPTY_${emptyCellsCounter}`] = data[currentIndex][key];
      emptyCellsCounter++;
    } else {
      extraEmptyCells[key] = data[currentIndex][key];
    }
  });

  if (data[nextIndex + 1] && !("ROUTE NO" in data[nextIndex + 1])) {
    console.log('++', currentIndex, nextIndex);
   return collectEmptyCellsTiming(
      data,
      emptyCellsCounter,
      ++currentIndex,
      extraEmptyCells
    );
  }
  return { tt: extraEmptyCells, yy: currentIndex };
}
let finalData = [];
let nextIndex = 0;
function prepareJsonData(data = [], index = 0) {
  if (!data[index]) return finalData;
  nextIndex = index + 1;
  let currentObj = {};
  currentObj[data[index]["ROUTE NO"]] = { ...data[index] };
  const emptyCels = getTotalEmptyCels(currentObj[data[index]["ROUTE NO"]]);
  if (data[index + 1] && !("ROUTE NO" in data[index + 1])) {
    const { tt, yy } = collectEmptyCellsTiming(data, emptyCels, nextIndex, {});
    nextIndex = yy;
    // console.log({...currentObj[data[index]['ROUTE NO']], ...tt});
    currentObj = { ...currentObj[data[index]["ROUTE NO"]], ...tt };
    console.log("----");
    console.log('?? ', index, yy);
  }
  finalData.push(currentObj);
  if (nextIndex < data.length - 1) {
    prepareJsonData(data, nextIndex + 1);
  }
  // console.log(finalData);
  return finalData;
}

function readExcel() {
  // Path to your Excel file
  const filePath = path.join(__dirname, "../pmpl-bus-timetable.xlsx");

  // Read the Excel file
  const workbook = xlsx.readFile(filePath);

  // Get the first sheet name
  const sheetName = workbook.SheetNames[0];

  // Get the worksheet
  const worksheet = workbook.Sheets[sheetName];

  // Convert the worksheet to JSON
  const data = xlsx.utils.sheet_to_json(worksheet);

  return data;
}

router.get("/preparedata", async (req, res) => {
  finalData = [];
  nextIndex = 0;
  const data = [
    {
      SCHEDULE: 4,
      "ROUTE NO": "2A UP",
      ROUTE: "KATRAJ TO SHIVAJINAGAR",
      __EMPTY: "6.00AM",
      __EMPTY_1: "6.30AM",
      __EMPTY_2: "7.00AM",
      __EMPTY_3: "7.25AM",
      __EMPTY_4: "7.50AM",
      __EMPTY_5: "8.20AM",
    },
    {
      __EMPTY: "8.50AM",
      __EMPTY_1: "9.15AM",
      __EMPTY_2: "9.40AM",
      __EMPTY_3: "10.10AM",
      __EMPTY_4: "10.40AM",
      __EMPTY_5: "11.05AM",
    },
    {
      __EMPTY: "12.00PM",
      __EMPTY_1: "12.30PM",
      __EMPTY_2: "1.00PM",
      __EMPTY_3: "1.25PM",
      __EMPTY_4: "2.00PM",
      __EMPTY_5: "2.30PM",
    },
    {
      __EMPTY: "2.55PM",
      __EMPTY_1: "3.20PM",
      __EMPTY_2: "3.50PM",
      __EMPTY_3: "4.20PM",
      __EMPTY_4: "4.45PM",
      __EMPTY_5: "5.10PM",
    },
    {
      __EMPTY: "5.40PM",
      __EMPTY_1: "6.10PM",
      __EMPTY_2: "6.35PM",
      __EMPTY_3: "7.00PM",
      __EMPTY_4: "8.00PM",
      __EMPTY_5: "8.30PM",
    },
    { __EMPTY: "8.55PM", __EMPTY_1: "9.25PM" },
  ];
  const result = prepareJsonData(readExcel());
  // console.log(result);
  res.send({ message: "Done", result });
});
router.get("/read", async (req, res) => {
  res.send(readExcel());
});

router.get("/chatgpt", async (req, res) => {
  function mergeScheduleData(scheduleArray) {
    let result = [];
    let currentRoute = null;

    scheduleArray.forEach((entry) => {
      if (entry.SCHEDULE || entry["ROUTE NO"]) {
        // If the entry contains SCHEDULE or ROUTE NO, it starts a new route
        if (currentRoute) {
          result.push(currentRoute);
        }
        currentRoute = { ...entry };
      } else {
        // If the entry does not contain SCHEDULE or ROUTE NO, it's a continuation
        if (currentRoute) {
          // Find the highest index for the __EMPTY keys in the currentRoute
          let keys = Object.keys(currentRoute).filter((key) =>
            key.startsWith("__EMPTY")
          );
          let highestIndex =
            keys.length > 0
              ? Math.max(...keys.map((key) => parseInt(key.split("_")[1])))
              : -1;

          // Add the new __EMPTY keys with incremented indices
          for (let [key, value] of Object.entries(entry)) {
            highestIndex++;
            currentRoute[`__EMPTY_${highestIndex}`] = value;
          }
        }
      }
    });

    // Push the last route object if it exists
    if (currentRoute) {
      result.push(currentRoute);
    }

    return { message: "Done", result: result };
  }

  res.send(mergeScheduleData(readExcel()));
});
module.exports = router;
