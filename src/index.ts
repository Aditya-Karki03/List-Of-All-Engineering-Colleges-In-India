import fs from "fs";
import axios, { AxiosResponse } from "axios";
const statesInIndia: string[] = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
interface dataVal {
  state: string;
  program: string;
  level: string;
}
type objType = {};
//;
const getEducationInstitutionsData = async (data: dataVal) => {
  const { state, program, level } = data;
  const url = `https://facilities.aicte-india.org/dashboard/pages/php/approvedinstituteserver.php?method=fetchdata&year=2024-2025&program=${program}&level=${level}&institutiontype=1&Women=1&Minority=1&state=${state}&course=1`;
  const response: AxiosResponse = await axios.get(url);
  return response.data;
};
const allData: objType[] = [];
async function getAllDataInArray() {
  for (let i = 0; i < statesInIndia.length; i++) {
    const inputData = {
      state: statesInIndia[i],
      program: "Engineering And Technology",
      level: "UG",
    };
    try {
      const data = await getEducationInstitutionsData(inputData);
      allData.push({ data });
    } catch (error) {
      console.log(error);
    }
  }
  fs.writeFile(
    "listOfEngineeringCollegesInIndia.json",
    JSON.stringify(allData, null, 2),
    function (err) {
      if (err) {
        console.log(`This is error file ${err}`);
      }
    }
  );
}
getAllDataInArray();
// if (allData.length > 0) {
//   console.log(allData);
//   console.log("Current working directory:", process.cwd());

// } else {
//
// }
