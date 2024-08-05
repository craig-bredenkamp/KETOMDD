document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    loadCheckboxes();
    updateProgress();
    console.log('Initial progress updated');

    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            console.log(`Checkbox ${index} changed to ${checkbox.checked}`);
            saveCheckboxes();
            updateProgress();
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
    console.log('Checkbox states saved:', checkboxStates);
}

function loadCheckboxes() {
    const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || [];
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = checkboxStates[index] || false;
    });
    console.log('Checkbox states loaded:', checkboxStates);
}