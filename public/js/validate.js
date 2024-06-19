function validateSignUpForm() {
    let form = document.signUp;
    const fname = form.firstName.value;
    const lname = form.lastName.value;
    const email = form.email.value;
    var validRegex = /[a-zA-Z]/;

    if(!fname) {
        document.querySelector("#firstnamediv").classList.add("red_border");
        document.querySelector("#firstnamediv").addEventListener("click", function() {
            this.classList.remove("red_border");
        });

        alert("Please fill up your first name.");
        return false;
    }
    if(!fname.match(validRegex)){
        document.querySelector("#firstnamediv").classList.add("red_border");
        document.querySelector("#firstnamediv").addEventListener("click", function() {
            this.classList.remove("red_border");
        });

        alert("Please fill a valid first name.");
        return false;
    }
    if(!lname) {
        document.querySelector("#lastnamediv").classList.add("red_border");
        document.querySelector("#lastnamediv").addEventListener("click", function() {
            this.classList.remove("red_border");
        });
        alert("Please fill up your last name.");
        return false;
    }
    if(!lname.match(validRegex)){
        document.querySelector("#lastnamediv").classList.add("red_border");
        document.querySelector("#lastnamediv").addEventListener("click", function() {
            this.classList.remove("red_border");
        });

        alert("Please fill a valid last name.");
        return false;
    }
    
    if(!email) {
        document.querySelector("#emaildiv").classList.add("red_border");
        document.querySelector("#emaildiv").addEventListener("click", function() {
            this.classList.remove("red_border");
        });
        alert("Please fill up an email");
        return false;
    }

}

function validateWeather() {
    let weather = document.weatherApp;
    const city = weather.cityName.value;
    var validRegex = /[a-zA-Z]/;

    if(!city) {
        document.querySelector("input").classList.add("red_border");
        document.querySelector("input").addEventListener("click", function() {
            this.classList.remove("red_border");
        });
        
        alert("Please enter a city");
        return false;
    }

    if(!city.match(validRegex)) {
        document.querySelector("input").classList.add("red_border");
        document.querySelector("input").addEventListener("click", function() {
            this.classList.remove("red_border");
        });
        
        alert("Please enter a valid city name");
        return false;
    }
}

function validateCalculator() {
    let calculatorForm = document.form;
    const num1 = calculatorForm.n1.value;
    const num2 = calculatorForm.n2.value;

    if(!num1) {
        document.querySelector("input.nn1").classList.add("red_border");
        document.querySelector("input.nn1").addEventListener("click", function() {
            this.classList.remove("red_border");
        });
        
        alert("Please enter a number");
        return false;
    }
    console.log(typeof(num1));


    if(!num1.isNaN()) {
        num1 = Number(num1);
        document.querySelector("input.nn1").classList.add("red_border");
        document.querySelector("input.nn1").addEventListener("click", function() {
            this.classList.remove("red_border");
        });
        
        alert("Please enter a valid number");
        return false;
    }

    if(!num2) {
        document.querySelector("input.nn2").classList.add("red_border");
        document.querySelector("input.nn2").addEventListener("click", function() {
            this.classList.remove("red_border");
        });
        
        alert("Please enter a number");
        return false;
    }

    if(typeof(num2) !== "number") {
        document.querySelector("input.nn2").classList.add("red_border");
        document.querySelector("input.nn2").addEventListener("click", function() {
            this.classList.remove("red_border");
        });
        
        alert("Please enter a valid number");
        return false;
    }
}