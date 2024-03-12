document.getElementById('nextBtn').addEventListener('click', function () {
    var selectElement = document.getElementById('exampleSelect');
    var selectedValue = selectElement.value;

    if (selectedValue == '1 player') {
        window.location.href = 'http://127.0.0.1:5500/1playergame.html'
    }

});
