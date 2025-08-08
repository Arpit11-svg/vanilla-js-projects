let currentDisplay = '';
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    if (button.classList.contains('advanced')) return;

    button.addEventListener('click', () => {
        const value = button.textContent.trim();
        const action = button.getAttribute('data-action')

        if (value === 'AC') {
            currentDisplay = '';
        }
        else if (value === '00') {
            currentDisplay += value;
        }
        else if (value === 'ƒx') {
            return;
            //don't display
        }
        else if (value === '=') {
            const needed = autoCloseParens(currentDisplay);
            if (needed > 0) {
                currentDisplay += ')'.repeat(needed);
            }

            try {
                const result = math.evaluate(currentDisplay);
                currentDisplay = result.toString();
            }
            catch {
                currentDisplay = 'Invalid Input';
            }
        }
        else if (action === 'back') {
            currentDisplay = currentDisplay.slice(0, -1);
        }
        else {
            if ("+-*/.%".includes(value)) {
                const lastChar = currentDisplay.slice(-1);
                if (currentDisplay === '' && value === '-') {
                    //    will add 
                }
                else if ("+-*/.%".includes(lastChar)) return; // Prevent duplicate operators
            }
            currentDisplay += value;
        }
        display.value = currentDisplay;
    });
});


// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key === 'Enter' || key === '=') {
        const needed = autoCloseParens(currentDisplay);
        if (needed > 0) {
            currentDisplay += ')'.repeat(needed);
        }
        event.preventDefault();
        try {
            console.log("DEBUG in keyboard: ", currentDisplay);
            const result = math.evaluate(currentDisplay);
            currentDisplay = result.toString();//use .toString, if we want to add something in answer after calculate, then also works
        }
        catch {
            currentDisplay = "Invalid Input"
        }
    }
    else if ("()".includes(key)) {
        currentDisplay += key;
    }
    else if (key === 'Backspace') {
        currentDisplay = currentDisplay.slice(0, -1);
    }
    else if (key.toLowerCase() === 'c') {
        currentDisplay = '';
    }
    else if ("+-*/.%".includes(key)) {
        const lastChar = currentDisplay.slice(-1);
        if (currentDisplay === '' && key === '-') {
            // will add
        }
        else if ("+-*/.%".includes(lastChar)) {
            return;
        }
        currentDisplay += key;
    }
    else if ("0123456789".includes(key)) {
        currentDisplay += key;
    }
    display.value = currentDisplay;
});

// Add Advance panel
document.querySelector('#toggle-advanced').addEventListener('click', () => {
    const advPanel = document.getElementById('advanced-buttons');
    const down = document.getElementById('down');
    const up = document.getElementById('up');
    const isHidden = getComputedStyle(advPanel).display === 'none';

    advPanel.style.display = isHidden ? 'grid' : 'none';
    down.style.display = isHidden ? 'none' : 'inline';
    up.style.display = isHidden ? 'inline' : 'none';


});

document.querySelectorAll('#advanced-buttons .button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === '√') {
            currentDisplay += 'sqrt(';
        } else if (value === 'π') {
            currentDisplay += 'pi';
        } else if (value === '^') {
            currentDisplay += '^';
        } else if (value === 'log') {
            currentDisplay += 'log(';
        } else if (value === 'sin') {
            currentDisplay += 'sin(';
        } else if (value === 'cos') {
            currentDisplay += 'cos(';
        }
        else {
            currentDisplay += value;
        }
        display.value = currentDisplay;
    })
})

function autoCloseParens(expr) {
    const openCount = (expr.match(/\(/g) || []).length;
    const closeCount = (expr.match(/\)/g) || []).length;// e.g. "a+(b)+((c)".match(/\(/g) → ["(", "(", "("]
    // in case of balanced '()' it gives null so to avoid it use '[]'
    return openCount - closeCount;  // e.g. 2 opens, 1 close → returns 1
}

const date=document.querySelector('.date');
let currentDate=new Date();
date.innerHTML=currentDate.getFullYear()