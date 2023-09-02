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
  cardContainer.innerHTML="";
  // for each
  mainData.forEach((all) => {
    console.log(all );
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
        <figure><img src="${all.thumbnail}" alt="Shoes" /></figure>
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
                <p class="mar"> ${all.authors[0].verified ?  "Verified" :" not Verified"}  </p>
            </div>
            <p>${all.others.views} views</p>
        </div>
    </div>
        `;
    cardContainer.appendChild(div);
  });
};
loadData();
handleLoadData(1000);
