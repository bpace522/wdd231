function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || '';
}


document.getElementById('reviewText').textContent = getQueryParam('review');
document.getElementById('userName').textContent = getQueryParam('username');
document.getElementById('submissionDate').textContent = getQueryParam('installDate');

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

