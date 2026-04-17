document.getElementById('testButton').addEventListener('click', function() {
    
    // 1. Získání prvků
    const input = document.getElementById('userInput');
    const vysledekDiv = document.getElementById('result');
    const textUkolu = input.value.trim();

    // 2. Kontrola, jestli není prázdno
    if (textUkolu === "") {
        alert("Napiš nějaký úkol!");
        return;
    }

    // 3. Smazání úvodního textu, pokud tam ještě je
    if (vysledekDiv.innerHTML.includes("prázdný")) {
        vysledekDiv.innerHTML = "";
    }

    // 4. Vytvoření nového úkolu
    const novyUkol = document.createElement('div');
    novyUkol.className = 'ukol-polozka';
    novyUkol.innerHTML = `<span>📌 ${textUkolu}</span>`;
    
    // Bonus: Kliknutím na úkol ho "splníte" (přeškrtnete)
    novyUkol.addEventListener('click', function() {
        this.style.textDecoration = "line-through";
        this.style.opacity = "0.5";
    });

    // 5. Přidání do seznamu a vyčištění políčka
    vysledekDiv.appendChild(novyUkol);
    input.value = "";
    input.focus(); // Vrátí kurzor do políčka
});
