"use strict";

///////////////////////////////////////////////////////////
// selected elements
const tbodyTable = document.getElementById("tbody");
const containerForm = document.getElementById("container-form");
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

const sidebar = document.querySelector("#sidebar");
const sidebarIcon = document.querySelector(".sidebar-header");

////////////////////////////////////////////////
// init
////////////////////////////////////////////////
// get data from local storage
const petArr = JSON.parse(getFromStorage("petArr"));
// console.log(data);

// render Breed for form
const renderBreed = (data) => {
  const option = document.createElement("option");
  option.innerHTML = `${data.breed}`;
  breedInput.appendChild(option);
};

const displayBreedTable = (item) => {
  breedInput.innerHTML = `<option>${item.breed}</option>`;
  // get data breeds from local storage
  const data = JSON.parse(getFromStorage("breedArr"));
  // handle with type of dogs
  if (typeInput.value === "Dog") {
    const dogs = data.filter((item) => item.type === "Dog");
    dogs.map((item) => {
      renderBreed(item);
    });
    // handle with type cats
  } else if (typeInput.value === "Cat") {
    const cats = data.filter((item) => item.type === "Cat");
    cats.map((item) => {
      renderBreed(item);
    });
  }
};

typeInput.addEventListener("click", displayBreedTable);


///////////////////////////////////////////////////////////////////
// render data with table
const renderTable = () => {
  tbodyTable.innerHTML = "";

  petArr.map((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
  <th scope="row">${item.id}</th>
  <td>${item.name}</td>
  <td>${item.age}</td>
  <td>${item.type}</td>
  <td>${item.weight} kg</td>
  <td>${item.length} cm</td>
  <td>${item.breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${item.color}"></i>
  </td>
  <td><i class="bi ${
    item.vaccinated === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    item.dewormed === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    item.sterilized === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td>${item.date}</td>
  <td><button type="button" class="btn btn-warning btn-sm btn-edit" data-set="${
    item.id
  }" onClick="handEdit('${item.id}')">Edit</button>
  </td>
`;
    tbodyTable.appendChild(row);
  });
};
renderTable();


///////////////////////////////////////////////////////////
// logic
//////////////////////////////////////////////////////////////
// handle even edit
const handEdit = (id) => {
  petArr.forEach((item) => {
    // position save
    if (item.id === id) {
      if (containerForm && containerForm.classList.contains("hide")) {
        // show form with current data
        containerForm.classList.remove("hide");
        // display current data of pet
        renderCurrentData(item);
        // display table after edit
        displayBreedTable(item);
      }
    }
  });
};


// save data when edit
submitBtn.addEventListener('click', () => {
  // changed data input
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
  };
  if (validation(data)) {
    // check position of pet in petArr
    const index = petArr.findIndex(item => item.id === data.id);
    // save to local storage
    petArr[index] = data;
    saveStorage("petArr", JSON.stringify(petArr));
    // hidden container form
    containerForm.classList.add("hide");
    // render again table pet after edited
    renderTable();
  }
});

// render data current of pet
const renderCurrentData = (item) => {
  idInput.value = item.id;
  nameInput.value = item.name;
  typeInput.value = item.type;
  ageInput.value = item.age;
  colorInput.value = item.color;
  weightInput.value = item.weight;
  lengthInput.value = item.length;
  breedInput.value = item.breed;
  vaccinatedInput.checked = item.vaccinated;
  dewormedInput.checked = item.dewormed;
  sterilizedInput.checked = item.sterilized;
};

// handle validate
const validation = (data) => {
  let isInvalid = true;
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


// handle event when click sidebar
sidebarIcon.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar.classList.toggle("active");
});

