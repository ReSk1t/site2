document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const uploadButton = document.getElementById("upload-btn");
    const loadingDiv = document.getElementById("loading");
    const selectedFilesDiv = document.getElementById("selected-files");
    const filtersSection = document.getElementById("filters-section");
    const scheduleTableContainer = document.getElementById("schedule-table-container");
    const scheduleTable = document.getElementById("schedule-table");
    const filtersContainer = document.getElementById("filters");
    const applyFiltersButton = document.getElementById("apply-filters");
    const resetFiltersButton = document.getElementById("reset-filters");

    let schedules = [];
    let filters = {
        "группа": "",
        "преподаватель": "",
        "аудитория": "",
        "тип предмета": "",
        "название предмета": "",
    };

    uploadButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", handleFileChange);

    function handleFileChange(event) {
        const files = event.target.files;
        if (files.length === 0) return;

        const fileNames = Array.from(files).map(file => file.name);
        selectedFilesDiv.innerHTML = `<h3>Выбранные файлы:</h3><ul>${fileNames.map(name => `<li>${name}</li>`).join('')}</ul>`;
        loadingDiv.style.display = "block";

        // Simulate file processing
        setTimeout(() => {
            parseSchedule(files)
                .then(parsedSchedules => {
                    schedules = parsedSchedules;
                    filtersSection.style.display = "block";
                    scheduleTableContainer.style.display = "block";
                    loadingDiv.style.display = "none";
                    renderTable(schedules);
                })
                .catch(error => {
                    loadingDiv.style.display = "none";
                    alert("Ошибка при обработке файлов.");
                });
        }, 1000);
    }

    async function parseSchedule(files) {
        // This is a placeholder function, replace with actual Excel parsing logic
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { group: "A", teacher: "Иванов", classroom: "101", subjectType: "Лекция", subjectName: "Математика" },
                    { group: "B", teacher: "Петров", classroom: "102", subjectType: "Лабораторная", subjectName: "Физика" },
                    { group: "A", teacher: "Сидоров", classroom: "103", subjectType: "Лекция", subjectName: "Информатика" }
                ]);
            }, 500);
        });
    }

    function renderTable(schedules) {
        scheduleTable.innerHTML = `
            <thead>
                <tr>
                    <th>Группа</th>
                    <th>Преподаватель</th>
                    <th>Аудитория</th>
                    <th>Тип предмета</th>
                    <th>Название предмета</th>
                </tr>
            </thead>
            <tbody>
                ${schedules.map(schedule => `
                    <tr>
                        <td>${schedule.group}</td>
                        <td>${schedule.teacher}</td>
                        <td>${schedule.classroom}</td>
                        <td>${schedule.subjectType}</td>
                        <td>${schedule.subjectName}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;
    }

    applyFiltersButton.addEventListener("click", applyFilters);

    function applyFilters() {
        const filteredSchedules = schedules.filter(schedule => {
            return Object.keys(filters).every(key => {
                const value = filters[key];
                if (!value) return true;
                return schedule[key].toLowerCase().includes(value.toLowerCase());
            });
        });

        renderTable(filteredSchedules);
    }

    resetFiltersButton.addEventListener("click", () => {
        filters = {
            "группа": "",
            "преподаватель": "",
            "аудитория": "",
            "тип предмета": "",
            "название предмета": "",
        };
        renderTable(schedules);
    });

    function renderFilters() {
        filtersContainer.innerHTML = Object.keys(filters).map(key => {
            return `
                <div>
                    <label for="${key}">${key}</label>
                    <input type="text" id="${key}" value="${filters[key]}" oninput="updateFilter('${key}', this.value)">
                </div>
            `;
        }).join('');
    }

    function updateFilter(key, value) {
        filters[key] = value;
    }

    renderFilters();
});