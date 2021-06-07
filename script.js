var siteNameInp = document.getElementById("siteName");
var siteUrlInp = document.getElementById("siteUrl");
var formBtn = document.getElementById("formBtn");
var inputs = document.getElementsByTagName("input");
var nameRegex = /^[a-zA-Z ]{1,15}$/;
var urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/;
var listItems = [];

if (localStorage.getItem("myList") == null) {
    listItems = [];
}
else {
    listItems = JSON.parse(localStorage.getItem("myList"));
    displayList();
}

formBtn.onclick = function () {
    if (nameRegex.test(siteNameInp.value) == true) {
        if (urlRegex.test(siteUrlInp.value) == true) {
            addLink();
            displayList();
            clearInp();
        }

        else {
            alert("The Url is in-valid");
        };

    }
    else {
        alert("The Name is in-valid");
    }
};

function addLink() {
    var link = {
        name: siteNameInp.value,
        url: siteUrlInp.value
    };
    listItems.push(link);
    localStorage.setItem("myList", JSON.stringify(listItems));
    alert("The Bookmark is added")

}

function clearInp() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function deleteUrl(index) {
    listItems.splice(index, 1);
    localStorage.setItem("myList", JSON.stringify(listItems));
    displayList()
}

function displayList() {
    var abdo = "";
    for (var i = 0; i < listItems.length; i++) {
        abdo += `<div class="my-3">
        <div class="row bg-gray px-3 py-5 justify-content-between">
        <h2 class="pr-5 w-25">${listItems[i].name}</h2>
        <div class="ml-auto w-50">
        <a class="btn btn-primary ml-auto px-3 py-2 " href="http://${listItems[i].url}" target="_blanck">visit</a>
        <button class="btn btn-danger ml-3 py-2" onclick="deleteUrl(${i})">Delete</button>
        </div>
        </div>
        </div>`;
    }
    document.getElementById("siteList").innerHTML = abdo;
}
