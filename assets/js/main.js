// *form
const nameInput = document.querySelector("#exampleInputName")
const mail = document.querySelector("#exampleInputEmail1")
const password = document.querySelector("#exampleInputPassword1");
const btnRegister = document.querySelector("#register");
// !table
const tableBody = document.querySelector("#tableBody");
// ? base url
const BASE_URL = "http://localhost:9000";




// ?======================================================== GET ===============================

fetch(`${BASE_URL}/get-data`)
    .then((response) => response.json())
    .then((data) => {
        data.data.map((item) => {
            tableBody.innerHTML += `
            <tr>
            <td>${item.email}</td>
            <td class="text-success fw-bold">Succesfully created </td>
            <td id="view" class="d-flex justify-content-center"><button type="button" class="btn btn-info btn-sm" id="viewLink" onclick="viewData(${item.id})" >View result</button></td>
        </tr>
        `
        })
    })

// ! ==================================================== DELETE ==================================

function deleteItem(id) {
    fetch(`${BASE_URL}/delete-data:${id}`, {
        method: "Delete",
    })
    .then((response) => response.json())
    .then((res) => 
    location.reload())
    // console.log(id)
    alert("Melumatlar ugurla silindi")
}

// *========================================================= PUT =================================

function updateItem(id) {
    let data = {
        id: id,
        username: nameInput.value,
        email: mail.value,
        password: password.value,
    };

if (nameInput.value.trim() == "" || mail.value.trim() == "" || password.value.trim() == "") {
        alert("xanalari bos saxlamayin")
    }else {
        fetch(`${BASE_URL}/update-data:${id}`, {
            method: "Put",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => response.json())
        .then((res) => {
            location.reload();
        });
    }
}

// ?===================================================== POST ==================================


function createItem (){
    let data = {
        id: Date.now(),
        username: nameInput.value,
        email: mail.value,
        password: password.value,
    };
    if (nameInput.value.trim() == "" || mail.value.trim() == "" || password.value.trim() == "") {
        alert("xanalari bos saxlamayin")
    } else {
        fetch(`${BASE_URL}/create-data`, {
            method: "Post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },

        }).then((response) => response.json())
        .then((res) => {
            location.reload();
        });
    }
}
// !====================================================== BUTTON CLICK =================================
btnRegister.addEventListener("click", () => {
    createItem ()

});


// *===================================================== VIEW DATA =================================

function viewData(id) {
    sessionStorage.setItem("id", id)
    window.open("./view.html", "_blank")
    // console.log("id", id)
}


