'use strict';

/////////////////////////////////////////////////
//selected element
const tbodyTable = document.getElementById("tbody");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById('find-btn');

const sidebar = document.querySelector("#sidebar");
const sidebarIcon = document.querySelector(".sidebar-header");

//////////////////////////////////////////
// init
//////////////////////////////////////////
// get data from local storage
const data = JSON.parse(getFromStorage("petArr"));

// render data with table
const renderTable = (petArr) => {
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
  
`;
    tbodyTable.appendChild(row);
  });
};
renderTable(data);

// render Breed for form
const renderBreed = (data) => {
  const option = document.createElement("option");
  option.innerHTML = `${data.breed}`;
  breedInput.appendChild(option);
};

const displayBreedTable = (item) => {
  // get data from local storage
  const data = JSON.parse(getFromStorage("breedArr"));
  if (data && data.length > 0) {
    data.forEach((item) => {
      renderBreed(item);
    });
  }
};
displayBreedTable();

////////////////////////////////////////////////
// hand logic
//////////////////////////////////////////////////////////
// get data input from form
const dataFromForm = () => {
  const dataInput = {
    id: idInput.value,
    name: nameInput.value.toLowerCase(),
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  return dataInput;
}

// hande even find all pet match form input
findBtn.addEventListener('click', ()=> {
  const dataInput = dataFromForm();
  let petArr = data;

  // find pet with id
  if(dataInput.id.trim().length > 0) {
    petArr = petArr.filter(pet => pet.id.includes(dataInput.id));
  };
  // find pet with name
  if(dataInput.name.trim().length > 0) {
    petArr = petArr.filter(pet => pet.name.toLowerCase().includes(dataInput.name));
  }
  // find pet with type
  if(dataInput.type !== 'Select Type') {
    petArr = petArr.filter(pet => pet.type === dataInput.type);
  }
  // find pet with breed
  if(dataInput.breed !== 'Select Breed') {
    petArr = petArr.filter(pet => pet.breed === dataInput.breed);
  }
  // find pet with vaccinated
  if(dataInput.vaccinated) {
    petArr = petArr.filter(pet => pet.vaccinated === true);
  }
  // find pet with vaccinated
  if(dataInput.dewormed) {
    petArr = petArr.filter(pet => pet.dewormed === true);
  }
  // find pet with vaccinated
  if(dataInput.sterilized) {
    petArr = petArr.filter(pet => pet.sterilized === true);
  }
  console.log(petArr);

  renderTable(petArr);
})

// handle event when click sidebar
sidebarIcon.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar.classList.toggle("active");
});

