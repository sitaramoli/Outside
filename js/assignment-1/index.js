let main = document.querySelector("#main");
let container = document.createElement("div");
container.classList.add("container");
main.append(container);

// password length
let lengthDiv = document.createElement("div");
lengthDiv.classList.add("length-div");
container.append(lengthDiv);
let lengthLabel = document.createElement("label");
lengthLabel.setAttribute("for", "length");
lengthLabel.append("Password Length");
lengthDiv.append(lengthLabel);
let lengthInput = document.createElement("input");
lengthInput.setAttribute("type", "number");
lengthInput.setAttribute("name", "length");
lengthInput.setAttribute("id", "length");
lengthDiv.append(lengthInput);

// uppercase
let uppercaseDiv = document.createElement("div");
uppercaseDiv.classList.add("uppercase-div");
container.append(uppercaseDiv);
let uppercaseLabel = document.createElement("label");
uppercaseLabel.setAttribute("for", "uppercase");
uppercaseLabel.append("A-Z");
uppercaseDiv.append(uppercaseLabel);
let uppercaseCheckbox = document.createElement("input");
uppercaseCheckbox.setAttribute("type", "checkbox");
uppercaseCheckbox.setAttribute("name", "uppercase");
uppercaseCheckbox.setAttribute("id", "uppercase");
uppercaseDiv.append(uppercaseCheckbox);

// lowercase
let lowercaseDiv = document.createElement("div");
lowercaseDiv.classList.add("lowercase-div");
container.append(lowercaseDiv);
let lowercaseLabel = document.createElement("label");
lowercaseLabel.setAttribute("for", "lowercase");
lowercaseLabel.append("a-z");
lowercaseDiv.append(lowercaseLabel);
let lowercaseCheckbox = document.createElement("input");
lowercaseCheckbox.setAttribute("type", "checkbox");
lowercaseCheckbox.setAttribute("name", "lowercase");
lowercaseCheckbox.setAttribute("id", "lowercase");
lowercaseDiv.append(lowercaseCheckbox);

// number
let numberDiv = document.createElement("div");
numberDiv.classList.add("number-div");
container.append(numberDiv);
let numberLabel = document.createElement("label");
numberLabel.setAttribute("for", "number");
numberLabel.append("0-9");
numberDiv.append(numberLabel);
let numberCheckbox = document.createElement("input");
numberCheckbox.setAttribute("type", "checkbox");
numberCheckbox.setAttribute("name", "number");
numberCheckbox.setAttribute("id", "number");
numberDiv.append(numberCheckbox);

// special
let specialDiv = document.createElement("div");
specialDiv.classList.add("special-div");
container.append(specialDiv);
let specialLabel = document.createElement("label");
specialLabel.setAttribute("for", "special");
specialLabel.append("@#$");
specialDiv.append(specialLabel);
let specialCheckbox = document.createElement("input");
specialCheckbox.setAttribute("type", "checkbox");
specialCheckbox.setAttribute("name", "special");
specialCheckbox.setAttribute("id", "special");
specialDiv.append(specialCheckbox);

// result
let resultDiv = document.createElement("div");
resultDiv.classList.add("result");
resultDiv.append("Result: ");
container.append(resultDiv);


// button
let btn = document.createElement("button");
btn.classList.add("btn");
btn.append("Generate password");
btn.addEventListener("click", generatePassword);
container.append(btn);

let checkboxes = ["uppercase", "lowercase", "number", "special"];
let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercase = "abcdefghijklmnopqrstuvwxyz";
let number = "0123456789";
let special = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

function generatePassword() {
    let inputLength = document.querySelector("#length").value;
    let checkedBox =[];
    if (inputLength == '') {
        document.querySelector(".result").innerHTML = "Password length is required";
        return;
    }
    for (let i = 0; i < checkboxes.length; i++) {
        if (document.getElementById(checkboxes[i]).checked) {
            checkedBox.push(checkboxes[i]);
        }
    }
    if (inputLength > checkedBox.length) {
        document.querySelector(".result").innerHTML = "Less checkbox selected than the required length";
        return;
    }
    let password ='';
    // for(let j = 0;j<inputLength;j++){
    //     password = password + uppercase[Math.floor(Math.random()*uppercase.length)];
    //     password = password + number[Math.floor(Math.random()*number.length)];
    //     password = password + lowercase[Math.floor(Math.random()*lowercase.length)];
    //     password = password + special[Math.floor(Math.random()*special.length)];
    // }
    document.querySelector(".result").innerHTML = `Result: ${password}`;
}