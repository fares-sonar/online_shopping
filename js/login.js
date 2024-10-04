let email = document.querySelector("#email");
let password = document.querySelector("#password");
let btn = document.querySelector(".login");

let getEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (email.value === "" && password.value === "") {
    alert("Please enter your data");
  } else {
    if (
      getEmail &&
      getEmail.trim() === email.value.trim() &&
      getPassword &&
      getPassword.trim() === password.value.trim()
    ) {
      setTimeout(() => {
        window.location = "./index.html";
      }, 1000);
    } else {
      alert("Email or password is not valid");
    }
  }
});
