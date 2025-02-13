const countryInput = document.getElementById("input");
const searchButton = document.getElementById("btn");
const daynight = document.getElementById("daynight");

// Функция запроса данных
async function fetchApi(countryName) {
    try {
        const url = `https://restcountries.com/v3.1/name/${countryName}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Страна не найдена!");

        const data = await res.json();
        const country = data[0];

        // Удаляем предыдущую карточку, если есть
        const oldCard = document.getElementById("countryInfo");
        if (oldCard) oldCard.remove();

        // Создаём новый div для карточки
        const countryInfo = document.createElement("div");
        countryInfo.id = "countryInfo";
        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Столица:</strong> ${country.capital ? country.capital[0] : "Нет данных"}</p>
            <p><strong>Население:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Континент:</strong> ${country.continents}</p>
            <img src="${country.flags.svg}" alt="Флаг" width="120" style="margin-top: 10px;">
        `;

        // Стили для карточки
        countryInfo.style.width = "350px";
        countryInfo.style.padding = "15px";
        countryInfo.style.backgroundColor = "var(--card-bg)";
        countryInfo.style.color = "var(--card-text)";
        countryInfo.style.border = "1px solid var(--card-border)";
        countryInfo.style.boxShadow = "0 0 10px rgba(0, 255, 255, 0.7)";
        countryInfo.style.borderRadius = "15px";
        countryInfo.style.margin = "30px auto";
        countryInfo.style.textAlign = "center";

        // Добавляем карточку в body
        document.body.appendChild(countryInfo);
    } catch (error) {
        alert(error.message);
    }
}

// Обработчик кнопки поиска
searchButton.addEventListener("click", () => {
    const country = countryInput.value.trim();
    if (country) {
        fetchApi(country);
    }
});

// Переключатель тем
daynight.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Устанавливаем начальные стили
const styles = document.createElement("style");
styles.innerHTML = `
    :root {
        --card-bg: #f0fff0;
        --card-text: #005f47;
        --card-border: #00cc99;
    }

    .dark-mode {
        --card-bg: #333;
        --card-text: #f0fff0;
        --card-border: #444;
        background-color: #222;
        color: #f0f0f0;
    }

    .dark-mode button {
        background-color: #444;
        color: #fff;
    }

    .dark-mode input, .dark-mode button {
        border: 1px solid #888;
    }
`;

document.head.appendChild(styles);
