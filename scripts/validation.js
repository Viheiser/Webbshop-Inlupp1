let form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  let name = document.getElementById("name");
  let phoneNumber = document.getElementById("phoneNumber");
  let email = document.getElementById("email");
  let address = document.getElementById("address");

  let errorMsgForName = document.getElementById("errorForName");
  let errorMsgForEmail = document.getElementById("errorForEmail");
  let errorMsgForPhoneNumber = document.getElementById("errorForPhoneNumber");
  let errorMsgForAddress = document.getElementById("errorForAddress");

  let valid = true;

  if (!validName(name.value)) {
    showErrorMessage(errorMsgForName);
    valid = false;
  } else hideErrorMessage(errorMsgForName);

  if (!validEmail(email.value)) {
    showErrorMessage(errorMsgForEmail);
    valid = false;
  } else hideErrorMessage(errorMsgForEmail);

  if (!validPhoneNumber(phoneNumber.value)) {
    showErrorMessage(errorMsgForPhoneNumber);
    valid = false;
  } else hideErrorMessage(errorMsgForPhoneNumber);

  if (!validAddress(address.value)) {
    showErrorMessage(errorMsgForAddress);
    valid = false;
  } else hideErrorMessage(errorMsgForAddress);

  if (!valid) event.preventDefault();
  else
    saveCustomerInfo(name.value, email.value, phoneNumber.value, address.value);
});

function validName(name) {
  if (name == null || name == "" || name.split(" ").length < 2) return false;

  return true;
}

/**
 * Returns true if valid returns false if not valid
 */
function validEmail(email) {
  let atposition = email.indexOf("@");
  let dotposition = email.lastIndexOf(".");
  if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= email.length
  ) {
    return false;
  }

  return true;
}

function validPhoneNumber(phoneNumber) {
  if (
    isNaN(phoneNumber) ||
    phoneNumber.length > 10 ||
    phoneNumber.length < 7 ||
    phoneNumber == "" ||
    phoneNumber == null
  )
    return false;

  return true;
}

function validAddress(address) {
  let split = address.split(" ");
  if (isNaN(split[0]) && !isNaN(split[1])) return true;

  return false;
}

function showErrorMessage(msgElement) {
  if (msgElement.hasAttribute("hidden")) msgElement.hidden = false;
}

function hideErrorMessage(msgElement) {
  if (!msgElement.hasAttribute("hidden")) msgElement.hidden = true;
}
