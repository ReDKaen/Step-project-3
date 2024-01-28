(function filter () {
    const form = document.getElementById('filter__form')
    const submitBtn = document.getElementById('submit__btn')
    const objFormData = {}
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const formData1 = new FormData(form)
        for(const[key, value] of formData1.entries()){
            objFormData[key] = value
        } 
        console.log(objFormData)
    } )
    
})()