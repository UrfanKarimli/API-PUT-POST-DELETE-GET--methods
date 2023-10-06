// *form
const nameInput = document.querySelector("#exampleInputName")
const mail = document.querySelector("#exampleInputEmail1")
const password = document.querySelector("#exampleInputPassword1");
const btnUpdate = document.querySelector("#update");
const tableBody = document.querySelector("#tableBody");
const mainForm = document.querySelector("#mainForm")


// ? base url
const BASE_URL = "http://localhost:9000";

let id1 = JSON.parse(sessionStorage.getItem("id"));
// console.log("id1: ", id1);

// ?======================================================== GET ===============================
fetch(`http://localhost:9000/get-data`)
    .then((response) => response.json())
    .then((data) => {

        // console.log(data.data);
        data.data.map((item) => {
            if (item.id === id1) {
                tableBody.innerHTML += `
        <tr>
        <td>${item.id}</td>
        <td>${item.username}</td>
        <td>${item.email}</td>
        <td>${item.password}</td>
        <td id="delete"><button type="button" class="btn btn-danger btn-sm" id="delBtn" onclick="deleteItem(${item.id})">delete</button></td>
    </tr>
    `;
            }

        })
        data.data.map((item) => {
            if (item.id === id1) {
                mainForm.innerHTML += `
                <button type="button" class="btn btn-primary" id="update" onclick="updateItem(${item.id})" >update</button>
                `
            }
        })
    })


// ! ==================================================== DELETE ==================================

function deleteItem(id) {
    fetch(`${BASE_URL}/delete-data:${id}`, {
        method: "Delete",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((res) => {
        location.reload();
        })
    // console.log(id)
    alert("Melumatlari silmek istediyimizden eminsiniz?")
}

// *========================================================= PUT =================================

function updateItem(id) {
    let data = {
        id: id,
        username: nameInput.value,
        email: mail.value,
        password: password.value,
    };
    console.log(id);

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
