 // Function to save form data to local storage
 function saveFormData() {
    const formData = {};
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        formData[checkbox.value] = checkbox.checked;
    });
    localStorage.setItem('formData', JSON.stringify(formData));
    console.log(formData);
}


// Function to load form data from local storage
function loadFormData() {
    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (formData[checkbox.value]) {
            checkbox.checked = formData[checkbox.value];
        }
    });
}

function submitForm() {
    saveFormData();
}

// Call loadFormData when the page loads
window.onload = loadFormData();