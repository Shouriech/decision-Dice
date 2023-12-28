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
        let rollHistory = [];
        let currentPage = 1;
        const rollsPerPage = 10;
        
        button.addEventListener("click", rollDice);
        addOptionButton.addEventListener("click", addCustomOption)

        function rollDice() {
            const categoryOptions = decisionOptions[selectedCategory];
            const randomElement = categoryOptions[Math.floor(Math.random() * categoryOptions.length)];
            output.textContent = randomElement;

            let roll = {
                id: Date.now(), // use the current timestamp as a unique identifier
                value: randomElement
            };
            rollHistory.push(roll);
            updateHistory();
        }

        function addCustomOption() {
            const customOption = customOptionInput.value.trim();
            if (customOption !== '') {
                decisionOptions[selectedCategory].push(customOption);
                customOptionInput.value = ''; // Clear the input field
                console.log('Updated Options:', decisionOptions);
            }
        }

        form.addEventListener("change", function(event) {
            selectedCategory = event.target.value;
            console.log('Selected Category:', selectedCategory);

        });

        function updateHistory() {
            let historyDiv = document.getElementById('history-list');
            historyDiv.innerHTML = ''; // clear the history list
        
            // calculate start and end indices for the rolls to display
            let start = (currentPage - 1) * rollsPerPage;
            let end = start + rollsPerPage;
        
            // only display the rolls for the current page
            for(let i = start; i < end && i < rollHistory.length; i++) {
                let roll = rollHistory[i];
                let rollDiv = document.createElement('div');
        
                let rollLink = document.createElement('a');
                rollLink.textContent = roll.value;
                rollLink.href = 'https://www.google.com/search?q=' + encodeURIComponent(roll.value);
                rollLink.target = '_blank'; // open the link in a new tab
                rollDiv.appendChild(rollLink);
        
                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'my-button';
                deleteButton.dataset.id = roll.id; // store the roll id in a data attribute
                deleteButton.addEventListener('click', function() {
                    rollHistory = rollHistory.filter(r => r.id !== roll.id); // remove the roll from the history
                    updateHistory(); // update the history display
                });
        
                rollDiv.appendChild(deleteButton);
                historyDiv.appendChild(rollDiv);
            }
        
            // create "Previous" and "Next" buttons
            let prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.className = 'my-button';
            prevButton.addEventListener('click', function() {
                if(currentPage > 1) {
                    currentPage--;
                    updateHistory();
                }
            });
            historyDiv.appendChild(prevButton);
        
            let nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.className = 'my-button';
            nextButton.addEventListener('click', function() {
                if(end < rollHistory.length) {
                    currentPage++;
                    updateHistory();
                }
            });
            historyDiv.appendChild(nextButton);
        }
    });
