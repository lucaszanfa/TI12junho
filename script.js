var stars = document.querySelectorAll('.star-icon');
var selectedRating = 1;
var submitButton = document.getElementById('submit-btn');
var thankYouMessage = document.getElementById('thank-you-message');
var hasSubmitted = false; // Variável de controle para verificar se a avaliação já foi enviada
var evaluationCount = 0; // Contador para o número de avaliações realizadas

// Função para salvar a avaliação no localStorage
function saveEvaluation(rating) {
    // Obter o próximo ID da avaliação
    var evaluationId = localStorage.getItem('evaluationId') || 1;
    // Armazenar a avaliação
    localStorage.setItem('evaluation-' + evaluationId, rating);
    // Incrementar o ID da avaliação
    localStorage.setItem('evaluationId', parseInt(evaluationId) + 1);
}

stars.forEach(function(star, index) {
    var evaluationId = 'evaluation-' + (index + 1); // Criar ID único para cada avaliação
    star.setAttribute('id', evaluationId); // Definir ID para a estrela atual
    star.addEventListener('click', function(e) {
        if (!hasSubmitted) {
            var classStar = e.target.classList;
            if (!classStar.contains('ativo')) {
                stars.forEach(function(star) {
                    star.classList.remove('ativo');
                });
                classStar.add('ativo');
                selectedRating = e.target.getAttribute('data-avaliacao');
            }
        }
    });
});

submitButton.addEventListener('click', function() {
    if (!hasSubmitted) {
        console.log('A avaliação foi de ' + selectedRating + ' estrelas!');
        saveEvaluation(selectedRating); // Salvar a avaliação no localStorage
        thankYouMessage.style.display = 'block';
        hasSubmitted = true; // Marcar que a avaliação foi enviada
        // Remover eventos de clique das estrelas e do botão de envio após a avaliação ser enviada
        stars.forEach(function(star) {
            star.removeEventListener('click', starClickHandler);
        });
        submitButton.removeEventListener('click');
    }
});

function updateStarIcons(rating) {
    stars.forEach(function(star, index) {
        if (index < rating) {
            star.classList.add('ativo');
        } else {
            star.classList.remove('ativo');
        }
    });
}