let userScores = [];

const addScores = () => {
    userScores.sort(function (a, b){
        return b.score - a.score;
    });    
    console.log(userScores);
        let tbody = document.getElementById('scores-table').getElementsByTagName('tbody')[0];
       
                    for (i = 0; i < userScores.length; i++) {
                        let newRow = tbody.insertRow();
                        let newCell1 = newRow.insertCell();
                        let newText1 = document.createTextNode(userScores[i].initials);
                        newCell1.appendChild(newText1);
                        let newCell2 = newRow.insertCell();
                        let newText2 = document.createTextNode(userScores[i].score);
                        newCell2.appendChild(newText2);
                        };
                };


const renderScores = () => {
    if (localStorage.getItem('userScores') === null) {
        document.getElementById('scores-table').style.display = 'none';
        document.getElementById('no-scores').style.display = 'block';
}    else {
    let retrieveScores = localStorage.getItem('userScores') || [];
    userScores = JSON.parse(retrieveScores);
    addScores();
};
}


window.addEventListener('load', function (){
    renderScores();
});

document.getElementById('reset-scores').addEventListener('click', function() {
        localStorage.removeItem('userScores');
        renderScores();
});
