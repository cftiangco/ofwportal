let customeAdd = () => {
  if(confirm("Are you sure do you want to add this Record?")) {
    return true;
  } else {
    return false;
  }
}

let customeUpdate = () => {
  if(confirm("Are you sure do you want to update this Record?")) {
    return true;
  } else {
    return false;
  }
}

let customeClear = () => {
  let examiner = document.getElementById('examiner');
  if(confirm("Are you sure do you want to Cancel?")) {
    window.history.back();
  }
}

let customeDelete = () => {
  if(confirm("Are you sure do you want to delete this Record?")) {
    return true;
  } else {
    return false;
  }
}

