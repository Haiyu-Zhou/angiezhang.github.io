//horizontal scrolling
// let backgroundContainer = document.querySelector(".child-background-container");
//backgroundContainer.addEventListener("wheel", function (mouseScroll) {
  //console.log("mouse scrolled for", mouseScroll);
 // mouseScroll.preventDefault();
 // backgroundContainer.scrollLeft =
   // backgroundContainer.scrollLeft + mouseScroll.deltaY;
//});

//screen width > 700, then horizontal scrolling
let widthW = window.innerWidth;
console.log(widthW);
if (widthW > 700){
let backgroundContainer = document.querySelector(".child-background-container");
backgroundContainer.addEventListener("wheel", function (mouseScroll) {
// console.log("mouse scrolled for", mouseScroll);
  mouseScroll.preventDefault();
  backgroundContainer.scrollLeft =
    backgroundContainer.scrollLeft + mouseScroll.deltaY;
});
}

//step 1: variables
const airtableToken = "patDxyprgeKgSu7gP.5e8d74b49ec46bcd0ec171cf905b659c3d3e74fe0fbe5dd1d4252b60bfd638d4";
const airtableBaseUrl = "https://api.airtable.com/v0";
const airtableBaseId = "apppkcq6q875cTDkb";
const airtableTableName = "Assets";
const airtableUrl = `${airtableBaseUrl}/${airtableBaseId}/${airtableTableName}`;

//step 2: get references to DOM
const jContainerElement = document.querySelector(
  "#ni-child-container"
);
  //step 3: application
//fetch the data
fetch(airtableUrl, {
  headers: {
    Authorization: `Bearer ${airtableToken}`,
  },
})
.then((response) => 
  response.json())
  .then((data) => {
  console.log(data);
  const records = data.records;
  for (let index = 0; index < records.length; index++) {
    const title = records[index].fields.Title;
    const imageUrl = records[index].fields.Assets[0].url;
    const containerElement = document.createElement("div");
    const project = records[index].fields.Project;
    containerElement.classList.add("container");
    containerElement.style.position = "relative";
     //create image element
     const imageElement = document.createElement("img");
     imageElement.classList.add("child-image");
     imageElement.setAttribute("src", imageUrl);
     if (project=="ni wo") {
      jContainerElement.appendChild(containerElement);
      containerElement.appendChild(imageElement);
    }
    }
});