'use strict';

//////////////////////////////////////////////////////
// selected element
const inputBreed = document.getElementById('input-breed');
const inputType = document.getElementById('input-type');
const btnSubmit = document.getElementById('submit-btn');
const renderTable = document.getElementById('tbody');

const sidebar = document.querySelector("#sidebar");
const sidebarIcon = document.querySelector(".sidebar-header");

///////////////////////////////////////////////
// init
/////////////////////////////////////////////////
// declaration
let breedArr = JSON.parse(getFromStorage('breedArr')) ?? [];

///////////////////////////////////////////////
// handle logic
// when hit submit
btnSubmit.addEventListener('click', () => {
  const data = {
    breed: inputBreed.value,
    type: inputType.value,
  };

  if(validate(data)) {

    breedArr.push(data);
    // console.log(breedArr)

    // save localStorage renderUI
    if(breedArr.length > 0) {
      renderBreedTable(breedArr);
      clearInput();
      saveStorage('breedArr', JSON.stringify(breedArr));
    }
  }
})

// validate input
const validate = (data) => {
  let isInvalid = true;
  if(data.breed.trim().length === 0) {
    alert('Please input for breed!');
    isInvalid = false;
  }
  if(data.type === 'Select Type') {
    alert('Please input for type!');
    isInvalid = false;
  }
  return isInvalid;
}

// clear input
const clearInput = ()=> {
  inputBreed.value = '';
  inputType.checked = 'Select Type';
}

//display breed bet
const renderBreedTable = (breedArr) => {
  renderTable.innerHTML = '';
  breedArr.map((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <th scope="col">${index + 1}</th>
    <th scope="col">${item.breed}</th>
    <th scope="col">${item.type}</th>
    <th scope="col"><button class="btn btn-danger btn-sm" onClick="deleteBreed('${index}')">Delete</button></th>
    `;
    renderTable.appendChild(row);
  });
}
renderBreedTable(breedArr);

// delete breedArr
const deleteBreed = (position) => {
  if(confirm('Are you sure?')){
    console.log('delete')
    breedArr.forEach((item, index) => {
      if(index === Number(position)) {
        console.log('delete')
        breedArr.splice(index, 1);
        renderBreedTable(breedArr);
        saveStorage('breedArr', JSON.stringify(breedArr));
      }
    });
  }
}

// handle event when click sidebar
sidebarIcon.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar.classList.toggle("active");
});


