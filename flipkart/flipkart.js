document
  .querySelector(".credit-card-details")
  .addEventListener("submit", submitForm);

function printSavedDetails() {
  var savedDetails = Card.getSavedDetails();
  if (savedDetails) {
    for (key in savedDetails) {
      createDetailsCard(savedDetails[key]);
    }
  }
}

class detailsCard {
  constructor() {
    var savedDetails = this.getSavedDetails();
    if (savedDetails) {
      var keys = Object.keys(savedDetails);
      var max = 0;
      for (var k = 0; k < keys.length; k++) {
        if (keys[k] > max) {
          max = keys[k];
        }
      }
      this.id = max;
    } else {
      this.id = 0;
    }
  }

  saveDetails(obj) {
    var savedDetails = this.getSavedDetails();
    savedDetails[this.id] = obj;
    window.localStorage.setItem("card-details", JSON.stringify(savedDetails));
    return this.id++;
  }

  getSavedDetails() {
    return JSON.parse(window.localStorage.getItem("card-details")) || {};
  }

  deleteDetails(id) {
    console.log("deleting id ", id);
    var savedDetails = this.getSavedDetails();
    delete savedDetails[id];
    window.localStorage.setItem("card-details", JSON.stringify(savedDetails));
  }
}

var Card = new detailsCard();

function createDetailsCard(obj) {
  var parentDiv = document.getElementById("saved-card-details");
  var textNode = document.createTextNode(JSON.stringify(obj));
  var detailsDiv = document.createElement("div");
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    Card.deleteDetails(obj.id);
  });
  detailsDiv.appendChild(textNode);
  detailsDiv.appendChild(deleteButton);
  parentDiv.appendChild(detailsDiv);
}

printSavedDetails();

function addToList(obj) {
  createDetailsCard(obj);
}

// submitting form details
function submitForm(e) {
  e.preventDefault();
  var cvv = document.getElementById("cvv").value;
  var params = {};
  params["cardNumber"] = document.getElementById("card-number").value;
  params["month"] = document.getElementById("month").value;
  params["year"] = document.getElementById("year").value;
  var id = Card.saveDetails(params);
  params["id"] = id;
  addToList(params);
}
