
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

function pickWeightedItem(options) {
    const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);

    if (totalWeight <= 0) {
        return null;
    }

    let roll = Math.random() * totalWeight;

    for (const option of options) {
        roll -= option.weight;

        if (roll < 0) {
            return option.value;
        }
    }

    return options[options.length - 1].value;
}

function generateMimic() {
    const resultDiv = document.getElementById('mimicResult');
    const firstEnabled = document.getElementById('mimicWord1Enabled');
    const secondEnabled = document.getElementById('mimicWord2Enabled');
    const firstWordInput = document.getElementById('mimicWord1');
    const secondWordInput = document.getElementById('mimicWord2');
    const firstWeightInput = document.getElementById('mimicWeight1');
    const secondWeightInput = document.getElementById('mimicWeight2');

    if (!resultDiv || !firstEnabled || !secondEnabled || !firstWordInput || !secondWordInput || !firstWeightInput || !secondWeightInput) {
        return;
    }

    const options = [
        {
            value: firstWordInput.value.trim(),
            weight: parseInt(firstWeightInput.value, 10) || 0,
            enabled: firstEnabled.checked,
        },
        {
            value: secondWordInput.value.trim(),
            weight: parseInt(secondWeightInput.value, 10) || 0,
            enabled: secondEnabled.checked,
        },
    ].filter((option) => option.enabled && option.value.length > 0);

    if (options.length === 0) {
        resultDiv.textContent = 'Turn on at least one word.';
        return;
    }

    const selectedWord = pickWeightedItem(options);

    if (!selectedWord) {
        resultDiv.textContent = 'Give at least one word a weight above 0.';
        return;
    }

    resultDiv.textContent = `It is... ${selectedWord}`;
}