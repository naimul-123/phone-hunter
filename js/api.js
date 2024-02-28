const loadPhone = async (searchText, isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;

    displayPhone(phones, isShowAll)


}

// loadPhone();

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = ""
    const showAllContainer = document.getElementById("showAllContainer");
    if (phones.length>12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');

    }

    else{
        showAllContainer.classList.add('hidden');
    }
    console.log('is show all:', isShowAll)
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
  
    phones.forEach(phone => {
        // console.log(phone)
        const cardDiv = document.createElement('div');
        cardDiv.classList='card bg-gray-200 shadow-xl justify-center text-center p-4';

        cardDiv.innerHTML = `
        <figure><img src=${phone.image} alt=${phone.phone_name} /></figure>
        <div class="card-body text-center justify-center items-center mx-auto ">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.slug}</p>
          <div class="card-actions">
            <button onclick="handleShowDatils('${phone.slug}');" class="btn btn-primary">Show Details</button>
          </div>
        </div>
    `
    phoneContainer.appendChild(cardDiv)
    });
toggleLoadingSpinner(false)


}

const handleSearch = (isShowAll)=>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
   loadPhone(searchText, isShowAll)
    // console.log(searchText)
}

const toggleLoadingSpinner = (isLoading)=>{
    const loadingSpinner = document.getElementById('loadingSpinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const  handleShowAll = ()=>{
    handleSearch(true);

}

const handleShowDatils= async(id)=>{
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
   const phoneData = data.data;
    showPhoneDetails(phoneData)

}

const showPhoneDetails = (phoneData)=>{
    const showDetails = document.getElementById('showDetails');
    
        showDetails.innerHTML = `<div class="modal-box justify-center items-center">
                
        <figure class="mx-auto w-full"><img src="https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg"alt=${phoneData.name} width="50%" class="text-center"/></figure>
    
        <div>
            <h3 class="font-bold text-lg">${phoneData.name}</h3>
            <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <p><b>Chipset :</b> ${phoneData.mainFeatures.chipSet}</p>
            <p><b>Slug :</b>${phoneData.slug}</p>
            <p><b>Release data :</b>${phoneData.releaseDate}</p>
            <p><b>GPS :</b>${phoneData.others.GPS}</p>
            <p></p><b>Storage :</b>${phoneData.mainFeatures.memory}</p>
            <p><b>Display Size :</b>${phoneData.mainFeatures.displaySize}</p>
        </div>




        <div class="modal-action">
            <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn bg-red-600 text-white">Close</button>
            </form>
        </div>
</div>`
    // console.log(phoneData)
    showDetails.showModal()
}

