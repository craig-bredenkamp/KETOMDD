function updateProgress() {
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const progress = (checked / total) * 100;
    document.getElementById('progress-bar').value = progress;
}