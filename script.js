document.addEventListener('DOMContentLoaded', () => {
    loadCheckboxes();
    updateProgress();
    
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveCheckboxes();
            updateProgress();
        });
    });
});

function updateProgress() {
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const progress = (checked / total) * 100;
    
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.value = progress;
    }
}

function saveCheckboxes() {
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    const checkboxStates = Array.from(checkboxes).map(checkbox => checkbox.checked);
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
}

function loadCheckboxes() {
    const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || [];
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = checkboxStates[index] || false;
    });
}