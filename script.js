// Job 1: Automatically display today's date
// Function to format and display the current date
function displayCurrentDate() {
    // Step 1: Get the current date and time from the system
    const today = new Date();

    // Step 2: Define the formatting options to match our visual design
    // Result format: "DayOfWeek, Day Month Year" (e.g., "Thursday, 23 August 2018")
    const dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    // Step 3: Format the date using standard 'en-GB' locale (Day Month Year order)
    const formattedDate = today.toLocaleDateString('en-GB', dateOptions);

    // Step 4: Find the span element in index.html and update its text
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = formattedDate;
    }
}

// When the HTML document finishes loading, run displayCurrentDate
document.addEventListener('DOMContentLoaded', displayCurrentDate);