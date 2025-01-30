const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

const loadCategoryPet = (id) => {
    showSpinner();
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeClass();
            const HoverBtn = document.getElementById(`btn-${id}`);
            HoverBtn.classList.add('hoverpets-btn');
            displayAllPetsData(data.data);
        })
        .finally(() => hideSpinner()) 
        .catch(error => {
            console.log(error);
            hideSpinner(); 
        });
};





const sortPetsByPrice = () => {
    showSpinner();
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => {
            let pets = data.pets;

            if (!isSortedByPrice) {
                pets.sort((a, b) => b.price - a.price);
                isSortedByPrice = true;
            } else {
                loadAllPetsData(); 
                return; 
            }
            displayAllPetsData(pets);
        })
        .finally(() => hideSpinner()) 
        .catch(error => {
            console.log(error);
            hideSpinner(); 
        });
};

const loadcategoriesData = () => {
    showSpinner(); 
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayShow(data.categories))
        .catch(error => console.log(error))
        .finally(() => hideSpinner()); 
};

const loadAllPetsData = () => {
    showSpinner();
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayAllPetsData(data.pets))
        .catch(error => console.log(error))
        .finally(() => hideSpinner()); 
};





const likeBtn = (petId, imageUrl) => {
    const petsAllData = document.getElementById('like-pets');
    const likedPetDiv = document.createElement('div');
    likedPetDiv.className = "liked-pet mb-4";
    likedPetDiv.innerHTML = `
        <img class="rounded-[8px] h-full w-full" src="${imageUrl}" alt="Liked pet image">
    `;
    petsAllData.appendChild(likedPetDiv);
   
};

const removeClass = () => {
    const buttons = document.getElementsByClassName('category-btn')
    for (btnButton of buttons) {
        btnButton.classList.remove('hoverpets-btn')
    }

}

const loadDetails = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then(res => res.json())
        .then(data => displayDetails(data.petData))
        .catch(error => console.error(error)); 
};

const displayDetails = (petData) => {
    console.log(petData);
    const detailsContainer = document.getElementById('modal-content');
    detailsContainer.innerHTML = `
        <img class='w-full rounded-lg mb-5' src="${petData.image}" alt="Pet Image"/>
        <div class='grid grid-cols-2 mb-4'>
        <div class="flex mb-1 items-center"><p class='mb-1'><div> <img class='mr-2' src="images/Frame (1).png"></div> Breed:${petData.breed}</p></div>
        <div class="flex mr-2 items-center"><p><div><img src="images/gender.png"></div> Gender:${petData.gender}</p></div>
        <div class="flex mb-1 mr-2 items-center"><p><div><img class='mr-2' src="images/birth.png"></div> Birth:${petData.date_of_birth}</p></div>
        <div class="flex mr-2 items-center"><p><div><img src="images/price.png"></div> Price: ${petData.price}</p></div>
      
        </div>
        <div class="divider"></div>
        <div>
        <p class='text-lg font-black mb-5'>Details Information</p>
        <p>Vaccinated status:${petData.pet_details}</p>
        
        </div>

    `;
    document.getElementById('my_modal_5').showModal();
};

document.addEventListener("DOMContentLoaded", () => {

});


const displayAllPetsData = (pets) => {
    const petsAllData = document.getElementById('All-Pets')
    if (pets.length == 0) {
        petsAllData.classList.remove('grid')
        petsAllData.innerHTML = `
             <div class="md:h-[400px] md:w-[780px] w-full bd flex flex-col gap-5 justify-center items-center">
                <img src="images/error.webp" alt="">
                <h1 class="text-xl font-black">No Information Available !</h1>
                <p class="text-sm font-medium text-center w-4/5 md:mx-auto">It seems there’s no specific information available. However, I can help create a similar text or provide information on a topic of your choice. What would you like to know more about?</p>
            </div>
        `
        return
    } else {
        petsAllData.classList.add('grid')
    }
    petsAllData.innerHTML = ""
    pets.forEach(pet => {

        const card = document.createElement('div')
        card.classList = 'card'
        card.innerHTML = `

                <div class="card glass p-4 max-w-[270px] w-full flex mx-auto">
                <figure>
                    <img class='w-full rounded-lg object-cover' src="${pet.image}" alt="Image of ${pet.breed}" />
                </figure>
                <div class="mt-3">
                    <p class="text-xl font-black">
                        ${pet.pet_name}
                    </p>
                   <p class='flex-row mt-2'>
                    <img class='me-2 w-4' src="/images/Frame (1).png" />
                    <span class='text-sm'> Breed: </span> <span class="${pet.breed && pet.breed.length > 0 ? '' : 'text-red-500'} text-sm">
                     ${pet.breed && pet.breed.length > 0 ? pet.breed : 'Not found !'}
                    </span>
                    </p>
                    <div class='flex'>
                    <p class='flex-row mt-1'>
                    <img class='me-2 w-5' src="/images/birth.png" /><span class='text-sm'> Birth: </span>
                        <span class="${pet.date_of_birth && pet.date_of_birth.length > 0 ? '' : 'text-red-500'} text-sm">
                        ${pet.date_of_birth && pet.date_of_birth.length > 0 ? pet.date_of_birth : 'Not found !'}
                    </span>
                    </p>
                    </div>

                    <p class='flex-row mt-1'>
                        <img class='me-2' src="/images/gender.png"/><span class='text-sm'> Gender: </span>
                       <span class="${pet.gender && pet.gender.length > 0 ? '' : 'text-red-500'} text-sm"> 
                        ${pet.gender && pet.gender.length > 0 ? pet.gender : "Gender Not available!"}
                        </span>
                    </p>
                    <p class='flex-row mt-1'>
                        <img class='' src="/images/price.png" alt="Price icon" /><span class='text-sm'> Price: </span>
                        <span class="${pet.price > 0 ? '' : 'text-red-500'} text-sm"> 
                        ${pet.price > 0 ? pet.price : "price Not found.."}
                        </span>
                    </p>
                     <div class='flex-row justify-between mt-4 lg:p-4 md:mr-10'>
                     <button onclick="likeBtn('${pet.petId}', '${pet.image}')" class="text-[18px] text-[#0E7A81] text-btn-primary md:px-3 lg:px-5 py-[6px] px-4 border  border-solid border-[rgb(14, 122, 129, 0.15)] rounded-[8px] text-xl font-bold">
                        <i class="fa-regular fa-thumbs-up"></i>
                        </button>
                        <button class="text-[#0E7A81] border-[rgb(14, 122, 129, 0.15)] py-2 px-4 lg:px-5 button-border rounded-lg" onclick="adopt()">Adopt</button>
                        <button onclick="loadDetails(${pet.petId})" class="text-[#0E7A81] border-[rgb(14, 122, 129, 0.15)] py-2 px-4 lg:px-5 button-border rounded-lg">Details</button>
                    </div>
                </div>
            </div>
    
    `;
        petsAllData.appendChild(card)
    });
}







let isSortedByPrice = false; 


const displayShow = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach(item => {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('mb-24','flex','items-center','container','justify-center')
        buttonContainer.innerHTML = `

        <button id="btn-${item.category}" onclick="loadCategoryPet('${item.category}')" class='flex categories-button rounded-2xl items-center justify-center gap-2 py-3 px-14 category-btn text-xl font-black'>
        ${item.category}
        <div class='w-10 h-12'> <img class='w-14' src="${item.category_icon}" </div>
        </button>
        `;
       
        categoryContainer.appendChild(buttonContainer);
    });
};

loadcategoriesData()
loadAllPetsData()

const adopt = () => {
    let num = 3; 
    const time = document.getElementById('time');

  
    time.textContent = num;

    const clockTime = setInterval(() => {
        num--; 
        if (num < 1) { 
            clearInterval(clockTime);
            document.getElementById("my_modal_1").close();l
            return; 
        }
        time.textContent = num; 
    }, 1000);

    document.getElementById("my_modal_1").showModal();
}

