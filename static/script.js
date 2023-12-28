    document.addEventListener("DOMContentLoaded", function() {
        const button = document.querySelector("input");
        const output = document.getElementById("decision-results");
        const form = document.getElementById("decision-form");
        const customOptionInput = document.getElementById("custom-option");
        const addOptionButton = document.getElementById("add-option");

        let decisionOptions = {
            'food': [
                'chinese',
                'indian',
                'american',
                'mexican',
                'japanese',
                'french',
            ],
            'activity': [
                'hiking',
                'biking',
                'reading',
                'gardening',
                'cooking',
                'painting',
            ],
            'movie': [
                'action',
                'comedy',
                'drama',
                'sci-fi',
                'thriller',
                'animation',
            ],
            'place': [
                'beach',
                'mountains',
                'city',
                'countryside',
                'historic site',
                'park',
            ]
        };

        let selectedCategory = 'food';

        button.addEventListener("click", rollDice);
        addOptionButton.addEventListener("click", addCustomOption)
        
        function rollDice() {
            const categoryOptions = decisionOptions[selectedCategory];
            const randomElement = categoryOptions[Math.floor(Math.random() * categoryOptions.length)];
            output.textContent = randomElement;
        }

        function addCustomOption() {
            const customOption = customOptionInput.value.trim();
            if (customOption !== '') {
                decisionOptions.push(customOption);
                customOptionInput.value = ''; // Clear the input field
                console.log('Updated Options:', decisionOptions);
            }
        }

        form.addEventListener("change", function(event) {
            selectedCategory = event.target.value;
            console.log('Selected Category:', selectedCategory);
        });
    });