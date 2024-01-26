(function filter () {
    const form = document.getElementById('filter__form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        console.log(data)
    })
})()