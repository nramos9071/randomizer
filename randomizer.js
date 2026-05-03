
function generateItems() {
    const resultsDiv = document.getElementById('foundItems');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedWords = Array.from(checkboxes).map((checkbox) => checkbox.value);
    const itemCountInput = document.getElementById('itemCount');
    const numToSelect = parseInt(itemCountInput.value, 10);

    if (!resultsDiv) {
        return;
    }

    if (selectedWords.length === 0) {
        resultsDiv.innerHTML = '<p>Please select at least one item.</p>';
        return;
    }

    const shuffled = [...selectedWords].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numToSelect);

    resultsDiv.innerHTML = 'Results ' + selected.join(', ');
}

