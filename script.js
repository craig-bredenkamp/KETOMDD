document.addEventListener('DOMContentLoaded', () => {
    loadCheckboxes();
    updateProgress();
    console.log('Page loaded and scripts executed');

    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveCheckboxes();
            updateProgress();
            console.log('Checkbox state changed');
        });
    });
});

function updateProgress() {
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const progress = total > 0 ? (checked / total) * 100 : 0;
    
    console.log(`Total checkboxes: ${total}, Checked: ${checked}, Progress: ${progress}`);

    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        if (isFinite(progress)) {
            progressBar.value = progress;
            console.log(`Progress bar updated to ${progress}`);
        } else {
            console.error('Calculated progress is not finite:', progress);
        }
    } else {
        console.log('Progress bar not found');
    }
}

function saveCheckboxes() {
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    const checkboxStates = Array.from(checkboxes).map(checkbox => checkbox.checked);
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
    console.log('Checkbox states saved');
}

function loadCheckboxes() {
    const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || [];
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = checkboxStates[index] || false;
    });
    console.log('Checkbox states loaded');
}