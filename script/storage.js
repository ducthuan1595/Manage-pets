'use strict';

// save to localStorage
function saveStorage(key, value) {
  localStorage.setItem(key, value);
}

// get data from localStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}
