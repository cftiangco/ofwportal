let isString = (str) => {
  var isChar = /^[a-zA-Z\s]*$/;
  if(isChar.test(str) === true) {
      return true;
  } else {
      return false;
  }
};

let isNumber = (num) => {
    var isNum = /^\d+$/;
    if(isNum.test(num) === true) {
        return true;
    } else {
        return false;
    }
}

  
let formValidation = () => {
  
  let lastname = document.getElementById('last_name');
  let lastnameValidation = document.getElementById('lastname-validation');

  let firstname = document.getElementById('first_name');
  let firstnameValidation = document.getElementById('firstname-validation');

  let middlename = document.getElementById('middle_name');
  let middlenameValidation = document.getElementById('middlename-validation');

  let contact = document.getElementById('contact_no');
  let contactValidation = document.getElementById('contact-validation');

  let nationality = document.getElementById('nationality');
  let nationalityValidation = document.getElementById('nationality-validation');

  let address = document.getElementById('address');
  let addressValidation = document.getElementById('address-validation')



/* LASTNAME VALIDATION */
    if(lastname.value === "") {
        lastnameValidation.innerHTML = 'Warning: This input cannot be empty.'
        lastnameValidation.style.display = 'block';
        return false;
    } else {
        lastnameValidation.style.display = 'none';
    }
    if(isString(lastname.value) === false) {
        lastnameValidation.innerHTML = 'Warning: This input cannot contain any special character or number.'
        lastnameValidation.style.display = 'block';
        return false;
    } else {
        lastnameValidation.style.display = 'none';
    }
  
    if(lastname.value.length < 2 || lastname.value.length > 30) {
      lastnameValidation.innerHTML = 'Warning: This input must be between 2 and 30 characters long.'
      lastnameValidation.style.display = 'block';
      return false;
    } else {
        lastnameValidation.style.display = 'none';
    }
/* FIRSTNAME VALIDATION */
    if(firstname.value === "") {
        firstnameValidation.innerHTML = 'Warning: This input cannot be empty.'
        firstnameValidation.style.display = 'block';
        return  false;
    } else {
        firstnameValidation.style.display = 'none';
    }
    if(isString(firstname.value) === false) {
        firstnameValidation.innerHTML = 'Warning: This input cannot contain any special character or number.'
        firstnameValidation.style.display = 'block';
        return false;
    } else {
        firstnameValidation.style.display = 'none';
    }
  
    if(firstname.value.length < 2 || firstname.value.length > 30) {
      firstnameValidation.innerHTML = 'Warning: This input must be between 2 and 30 characters long.'
      firstnameValidation.style.display = 'block';
      return false;
    } else {
        firstnameValidation.style.display = 'none';
    }
/* MIDDLENAME VALIDATION */
    if(middlename.value === "") {
        middlenameValidation.innerHTML = 'Warning: This input cannot be empty.'
        middlenameValidation.style.display = 'block';
        return  false;
    } else {
        middlenameValidation.style.display = 'none';
    }
    if(isString(middlename.value) === false) {
        middlenameValidation.innerHTML = 'Warning: This input cannot contain any special character or number.'
        middlenameValidation.style.display = 'block';
        return false;
    } else {
        middlenameValidation.style.display = 'none';
    }

    if(middlename.value.length < 2 || middlename.value.length > 30) {
        middlenameValidation.innerHTML = 'Warning: This input must be between 2 and 30 characters long.'
        middlenameValidation.style.display = 'block';
    return false;
    } else {
        middlenameValidation.style.display = 'none';
    }
/*CONTACT_NO VALIDATION */
    if(contact.value === "") {
        contactValidation.innerHTML = 'Warning: This input cannot be empty.'
        contactValidation.style.display = 'block';
        return false;
    } else {
        contactValidation.style.display = 'none';
    }

    if(contact.value.length <=6 || contact.value.length >= 15) {
        contactValidation.innerHTML = 'Warning: Contact number must be between 6 and 15 digits long.'
        contactValidation.style.display = 'block';
        return false;
    }

    if(isNumber(contact.value) === false) {
        contactValidation.innerHTML = 'Warning: This input cannot contain any letters.'
        contactValidation.style.display = 'block';
        return false;
    } else {
        contactValidation.style.display = 'none';
    }
/* NATIONALITY VALIDATION*/
    if(nationality.value === "") {
        nationalityValidation.innerHTML = 'Warning: This input cannot be empty.'
        nationalityValidation.style.display = 'block';
        return false;
    } else {
        nationalityValidation.style.display = 'none';
    }
    if(isString(nationality.value) === false) {
        nationalityValidation.innerHTML = 'Warning: This input cannot contain any special character or number.'
        nationalityValidation.style.display = 'block';
        return false;
    } else {
        nationalityValidation.style.display = 'none';
    }

    if(nationality.value.length < 5 || nationality.value.length > 15) {
    nationalityValidation.innerHTML = 'Warning: This input must be between 5 and 15 characters long.'
    nationalityValidation.style.display = 'block';
    return false;
    } else {
        nationalityValidation.style.display = 'none';
    }
/* ADDRESS VALIDATION */
    if(address.value === "") {
        addressValidation.innerHTML = 'Warning: This input cannot be empty.'
        addressValidation.style.display = 'block';
        return false;
    } else {
        addressValidation.style.display = 'none';
    }

    if(address.value.length < 10 || address.value.length > 180) {
        addressValidation.innerHTML = 'Warning: This input must be between 10 and 180 characters long.'
        addressValidation.style.display = 'block';
        return false;
        } else {
            addressValidation.style.display = 'none';
    }
}
