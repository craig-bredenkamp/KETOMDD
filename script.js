document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    if (document.getElementById('checklist')) {
        console.log('Checklist page detected');
        loadCheckboxes();
        const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                console.log(`Checkbox ${index} changed to ${checkbox.checked}`);
                saveCheckboxes();
                updateProgress();
            });
        });
    } else {
        console.log('Main page detected');
    }
    
    updateProgress();
    console.log('Initial progress updated');
});

function updateProgress() {
    const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || [];
    const total = checkboxStates.length;
    const checked = checkboxStates.filter(state => state).length;
    const progress = total > 0 ? (checked / total) * 100 : 0;

    console.log(`Updating progress: Total: ${total}, Checked: ${checked}, Progress: ${progress.toFixed(2)}%`);

    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.value = progress;
        console.log(`Progress bar updated to ${progress.toFixed(2)}%`);
    } else {
        console.error('Progress bar element not found');
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
        if (index < checkboxStates.length) {
            checkbox.checked = checkboxStates[index];
        }
    });
    console.log('Checkbox states loaded:', checkboxStates);
}
