// Pomocná funkce pro zobrazení dnešního data
function zobrazDatum() {
    const d = new Date();
    const dny = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
    const mesice = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"];
    
    const formatovaneDatum = dny[d.getDay()] + ", " + d.getDate() + ". " + mesice[d.getMonth()];
    document.getElementById('currentDate').innerText = formatovaneDatum;
}

// Spustíme zobrazení data hned při načtení
zobrazDatum();


// Hlavní funkce aplikace (id prvků zůstávají stejná)
document.getElementById('testButton').addEventListener('click', function() {
    
    const vstup = document.getElementById('userInput');
    const vysledekDiv = document.getElementById('result');
    const textUkolu = vstup.value.trim();

    // Odstraníme případnou starou chybu
    const staraChyba = vysledekDiv.querySelector('.error-text');
    if (staraChyba) staraChyba.remove();

    // 1. KONTROLA PRÁZDNÉHO VSTUPU
    if (textUkolu === "") {
        // Vytvoříme chybovou hlášku
        const errorP = document.createElement('p');
        errorP.className = 'error-text';
        errorP.innerHTML = '<i class="fas fa-exclamation-circle"></i> Napiš prosím text úkolu!';
        // Vložíme ji na začátek seznamu
        vysledekDiv.prepend(errorP);
        return; // Ukončíme funkci, dál nic neděláme
    }

    // 2. ODSTRANĚNÍ "EMPTY STATE" (Zatím žádné úkoly)
    const emptyState = vysledekDiv.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }

    // 3. VYTVOŘENÍ NOVÉHO ÚKOLU (Profi struktura)
    const novyUkol = document.createElement('div');
    novyUkol.className = 'ukol-polozka';

    // Sestavíme vnitřek úkolu: Text + Tlačítka (HOTOVO a SMAZAT)
    novyUkol.innerHTML = `
        <span class="task-text">${textUkolu}</span>
        <div class="task-buttons">
            <button class="action-btn check-btn"><i class="fas fa-check"></i></button>
            <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
        </div>
    `;

    // 4. PŘIDÁNÍ FUNKCÍ PRO TLAČÍTKA UVNITŘ ÚKOLU

    // Funkce pro tlačítko "HOTOVO" (Check)
    novyUkol.querySelector('.check-btn').addEventListener('click', function() {
        // Přepne třídu 'completed' (přeškrtne/odškrtne)
        novyUkol.classList.toggle('completed');
    });

    // Funkce pro text úkolu (kliknutím se také označí jako hotový)
    novyUkol.querySelector('.task-text').addEventListener('click', function() {
        novyUkol.classList.toggle('completed');
    });

    // Funkce pro tlačítko "SMAZAT" (Trash)
    novyUkol.querySelector('.delete-btn').addEventListener('click', function() {
        // Jednoduše odstraní celý řádek s úkolem
        novyUkol.remove();
        
        // Bonus: Pokud smazáním vyprázdníme seznam, vrátíme "empty state"
        if (vysledekDiv.querySelectorAll('.ukol-polozka').length === 0) {
            vysledekDiv.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tasks fa-3x"></i>
                    <p>Zatím žádné úkoly. Odpočiň si!</p>
                </div>
            `;
        }
    });

    // 5. PŘIDÁNÍ ÚKOLU DO SEZNAMU A VYČIŠTĚNÍ
    vysledekDiv.appendChild(novyUkol);
    vstup.value = "";
    vstup.focus(); // Vrátí kurzor
});
