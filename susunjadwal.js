var form = document.querySelector("#siak-form")
var hasil = document.querySelector('#hasil')

hasil.innerHTML = "ugh coudf"


form.addEventListener('submit', function(event){
        // Prevent the default form submission behavior
        event.preventDefault();

        var siakValue = document.getElementById('input-siak').value;

        hasil.innerHTML = siakValue
    }
)