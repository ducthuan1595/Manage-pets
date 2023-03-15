"use strict";

///////////////////////////////////////////////////////////
// selected elements
const sidebar = document.querySelector("#sidebar");
const sidebarIcon = document.querySelector(".sidebar-header");
// selected element
const submitBtn = document.getElementById("submit-btn");
const healthBtn = document.getElementById("healthy-btn");
// const BMIbtn = document.getElementById("bmi-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");


/////////////////////////////////////////////////////////
// init
//////////////////////////////////////////////////
// get data petArr from local storage
let petArr = JSON.parse(getFromStorage("petArr")) ?? [];

// display breed table UI
const displayBreedTable = () => {
  breedInput.innerHTML = "<option>Select Breed</option>";
  // get data from local storage
  const data = JSON.parse(getFromStorage("breedArr"));

  // handle breed with type dogs
  if (typeInput.value === "Dog") {
    const dogs = data.filter((item) => item.type === "Dog");
    dogs.map((item) => {
      renderBreed(item);
    });
  }
  // get breed with type cats
  if (typeInput.value === "Cat") {
    const cats = data.filter((item) => item.type === "Cat");
    cats.map((item) => {
      renderBreed(item);
    });
  }
};
displayBreedTable();

// render breed
const renderBreed = (data) => {
  const option = document.createElement("option");
  option.innerHTML = `${data.breed}`;
  breedInput.appendChild(option);
};

// render breeds array when change type input
typeInput.addEventListener("change", displayBreedTable);


/////////////////////////////////////////////////
// hand logic
////////////////////////////////////////////////////

// when hit submit
submitBtn.addEventListener("click", function (e) {
  let data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    age: parseInt(ageInput.value),
    color: colorInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: formatDate(),
    bmi: "?",
  };

  // hand validate field in form
  if (validate(data)) {
    // console.log(petArr);
    // add pet into petArr
    petArr.push(data);
    if (petArr.length > 0) {
      renderTableData(petArr);
      // clear input
      clearInput();
    }
  }
  // save localStorage
  if (petArr) {
    saveStorage("petArr", JSON.stringify(petArr));
  }
});

// render pet for table
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated === true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized === true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    }"></i></td>
    <td>${petArr[i].date}</td>
    <td><button type="button" class="btn btn-danger" onClick="deletePet('${
      petArr[i].id
    }')">Delete</button>
    </td>
  `;
    tableBodyEl.appendChild(row);
  }
}
renderTableData(petArr);

// delete pet
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === petId) {
        petArr.splice(i, 1);
        renderTableData(petArr);
        saveStorage("petArr", JSON.stringify(petArr));
      }
    }
  }
};

// validate fields in the form
const validate = (data) => {
  let isInvalid = true;
  if (data.id.trim().length === 0) {
    isInvalid = false;
    alert("Please input for id!");
  }
  if (data.name.trim().length === 0) {
    isInvalid = false;
    alert("Please input for name!");
  }
  if (data.type === "Select Type") {
    isInvalid = false;
    alert("Please input for type!");
  }
  if (isNaN(data.age) || data.age < 1 || data.age > 15) {
    isInvalid = false;
    alert("Age must be between 1 and 15!");
  }
  if (isNaN(data.length) || data.length < 1 || data.length > 100) {
    isInvalid = false;
    alert("Length must be between 1 and 100!");
  }
  if (isNaN(data.weight) || data.weight < 1 || data.weight > 15) {
    isInvalid = false;
    alert("Weight must be between 1 and 15!");
  }
  if (data.breed === "Select Breed") {
    isInvalid = false;
    alert("Please input for breed!");
  }
  // validate with id unit
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === data.id) {
      isInvalid = false;
      alert("Id must be unit!");
    }
  }

  return isInvalid;
};

// format date
const formatDate = () => {
  let d = new Date();
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}-${mo}-${ye}`;
};

// clear input
const clearInput = () => {
  idInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  nameInput.value = "";
  ageInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};
//////////////////////////////////////////////////
// display pet healthy
// declaration health yes or no
let isShowpetHealthy = true;
healthBtn.addEventListener("click", () => {
  if (isShowpetHealthy) {
    let arrPetHealthy = [];
    for (let i = 0; i < petArr.length; i++) {
      if (
        petArr[i].vaccinated === true &&
        petArr[i].dewormed === true &&
        petArr[i].sterilized === true
      ) {
        arrPetHealthy.push(petArr[i]);
        renderTableData(arrPetHealthy);
        healthBtn.textContent = "Show All Pet";
        isShowpetHealthy = false;
      }
    }
  } else {
    renderTableData(petArr);
    healthBtn.textContent = "Show Healthy Pet";
    isShowpetHealthy = true;
  }
});

// calc BMI
// BMIbtn.addEventListener('click', ()=> {
//   for(let i= 0; i < petArr.length; i++) {
//     const dogBMI = ((petArr[i].weight * 703) / (petArr[i].length * petArr[i].length)).toFixed(2);
//     const catBMI = ((petArr[i].weight * 886) / (petArr[i].length * petArr[i].length)).toFixed(2);

//     petArr[i].type === 'Dog' ? petArr[i].bmi = dogBMI : petArr[i].bmi = catBMI;
//     renderTableData(petArr);
//   }
//   console.log(petArr)
// })

// handle event when click sidebar
sidebarIcon.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar.classList.toggle("active");
});
