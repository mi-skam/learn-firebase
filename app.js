// async function addToCollection(name, data) {
//   let docRef;
//   try {
//     docRef = await db.collection(name).add(data);
//   } catch (err) {
//     console.error(err);
//   }
// }

const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

// getting data
// async function getCollection(name, cb) {
//   const collections = await db.collection(name).get();
//   collections.docs.forEach((doc) => {
//     cb(doc);
//   });
// }

// real-time listener
db.collection("cafes").orderBy("city").onSnapshot;

// saving data

form.addEventListener("submit", (evt) => {
  evt.preventDefault(); // don't reload the page!
  db.collection("cafes").add({
    name: form.name.value,
    city: form.city.value,
  });
  form.name.value = "";
  form.city.value = "";
});

// create element and render cafe
function _renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data()?.name;
  city.textContent = doc.data()?.city;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  cafeList.appendChild(li);

  cross.addEventListener("click", (evt) => {
    evt.stopPropagation();
    let id = evt.target.parentElement.getAttribute("data-id");
    db.collection("cafes").doc(id).delete();
  });
}

// addToCollection("cafes", { first: "Ada", last: "Lovelace", born: 1815 });
// getCollection("cafes", _renderCafe);
db.collection("cafes")
  .orderBy("city")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type === "added") {
        _renderCafe(change.doc);
      } else if (change.type === "removed") {
        let li = cafeList.querySelector(`[data-id=${change.doc.id}]`);
        cafeList.removeChild(li);
      }
    });
  });
