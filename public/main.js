const toNax = document.querySelector('Naxxramas-button')
const toUld = document.querySelector('Ulduar-button')
const toIce = document.querySelector('Icecrown_Citadel-button')

toNax.addEventListener('click', _ => {
    // Send PUT Request here
    fetch('/raid/Naxxramas', {
        method: 'get',
        
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
  })