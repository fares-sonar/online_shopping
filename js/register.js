let userName = document.querySelector("#user-name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let btn = document.querySelector(".sign-up");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (userName.value === "" || email.value ==="" || password.value == "") {
    alert("Please enter data");
  } else {
    localStorage.setItem("userName", userName.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    setTimeout(() => {
      window.location = "./login.html";
    }, 1000);
  }
});
