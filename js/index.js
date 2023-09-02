const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => res.json())
    .then((data) => showCategory(data.data));
};
const showCategory = (categories) => {
  console.log(categories);
  const categoryContainer = document.getElementById("category-container");

  categories.forEach((category) => {
    // console.log(category.category_id);
    const div = document.createElement("div");

    div.innerHTML = `
    <button onclick="handleLoadData('${category.category_id}')" class="btn btn-active">${category.category}</button>
    `;
    categoryContainer.appendChild(div);
  });
};

// handle load 4 data
const handleLoadData = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const mainData = data.data;
  console.log(mainData);

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  // for each
  if (mainData.length == 0) {
    const div = document.createElement("div");
    div.classList.add("special-class");
    div.innerHTML = `
     
        <img width="300px" src="./images/icon.png" alt="">
        <h2 class="text-3xl font-bold">Oops!! Sorry, There is no <br> content here</h2>
      
    `;
    cardContainer.appendChild(div);
  }

  let array = [];

  mainData.forEach((all) => {
    // console.log( typeof all.others.views);
    // sorting

    let viewsString = all.others.views;
    let viewNumber = parseInt(viewsString);
    array.push(viewNumber);
    console.log(array, viewNumber);

    let int = parseInt(all.others.posted_date);
    let intMin = Math.floor(int / 60);
    let intHour = Math.floor(intMin / 60);

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
        <figure><img class="image-container" src="${
          all.thumbnail
        }" alt=""  /></figure>
        <p class="overlay-text" >${intHour} hrs ${intMin} min ago</p>
        <div class="card-body">
            <h2 class="card-title">
                <figcaption class="flex items-center justify-center space-x-3">
                    <img   class="rounded-full w-9 h-9"
                        src="${all.authors[0].profile_picture}"
                        alt="profile picture">
                    <div class="text-base space-y-0.5 font-bold dark:text-white text-left">
                        <div>${all.title}</div>
                    </div>
                </figcaption>
            </h2>
            <div class="flex justify-start ">
                <p><small> ${all.authors[0].profile_name} </small></p>
                <p class="mar">  ${
                  all.authors[0].verified
                    ? '<i class="fa-solid fa-check"></i>'
                    : ""
                }</p>
            </div>
            <p>${all.others.views} views</p>
        </div>
         
    </div>
        `;
    cardContainer.appendChild(div);
  });
};

//

const newPage = () => {
  window.location.href = "blank.html";
};
loadData();
handleLoadData(1000);
