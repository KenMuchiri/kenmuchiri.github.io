// change project title on work page
document.querySelectorAll(".work-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const projectTitle = document.getElementById("project-title");
    projectTitle.textContent = this.getAttribute("data-title"); // Set project title from data attribute
  });

  // Optional: Reset title when mouse leaves the item
  item.addEventListener("mouseleave", function () {
    const projectTitle = document.getElementById("project-title");
    projectTitle.textContent = "[Project Title]"; // Reset or leave blank
  });
});

// scroll opacity effect for the work page
const workDesc = document.querySelectorAll(".work-item");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + window.innerHeight / 2; // Middle of the viewport

  workDesc.forEach((description, index) => {
    const rect = description.getBoundingClientRect();

    // Apply opacity change for items toward the bottom of the viewport
    if (rect.top > window.innerHeight * 0.75) {
      const fadeFactor =
        (window.innerHeight - rect.top) / (window.innerHeight * 0.5);
      workDesc.style.opacity = Math.max(fadeFactor, 0.1);
    } else {
      workDesc.style.opacity = "100";
    }
  });
});

// Scroll effect for the service page
const services = document.querySelectorAll(".service-item");
const descriptions = document.querySelectorAll(".service-description");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + window.innerHeight / 2; // Middle of the viewport

  descriptions.forEach((description, index) => {
    const serviceItem = services[index];
    const rect = description.getBoundingClientRect();

    // Highlight the service item when it's in the center of the viewport
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      serviceItem.classList.add("text-white", "font-bold", "opacity-100");
      description.classList.remove("hidden");
    } else {
      serviceItem.classList.remove("text-white", "font-bold", "opacity-100");
      description.classList.add("block");
    }

    // Apply opacity change for items toward the bottom of the viewport
    if (rect.top > window.innerHeight * 0.75) {
      const fadeFactor =
        (window.innerHeight - rect.top) / (window.innerHeight * 0.5);
      description.style.opacity = Math.max(fadeFactor, 0.1);
    } else {
      description.style.opacity = "100";
    }
  });
});

// Scroll effect for the about page
// JavaScript to trigger opacity change on scroll
const scrollTriggerElements = document.querySelectorAll(".scroll-trigger");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100");
        entry.target.classList.remove("opacity-0");
      }
    });
  },
  { threshold: 0.1 } // Adjust this to control how much of the element must be visible
);

scrollTriggerElements.forEach((el) => observer.observe(el));

// Get the current year
const currentYear = new Date().getFullYear();
// Set the year in the span with id="year"
document.getElementById("year").textContent = currentYear;

// JavaScript for displaying live time
function updateClock() {
  const clockElement = document.getElementById("clock");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

// OpenWeatherMap API key
const apiKey = "21c8cebe607ea06ab61ff9523dbc97b9";

// Geolocation API to get user location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("location").textContent =
      "[Geolocation not supported]";
  }
}

// Function to display location
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Fetch city name using OpenWeatherMap reverse geocoding API
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const city = data.name || "Unknown Location";
      document.getElementById("location").textContent = `${city}`;
    })
    .catch((error) => {
      document.getElementById("location").textContent =
        "[Location unavailable]";
    });
}

// Handle geolocation errors
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("location").textContent =
        "[Location permission denied]";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("location").textContent =
        "[Location unavailable]";
      break;
    case error.TIMEOUT:
      document.getElementById("location").textContent =
        "[Location request timeout]";
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById("location").textContent = "[Unknown error]";
      break;
  }
}

// Call the function to get location
getLocation();

// section nav
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  const observerOptions = {
    root: null,
    threshold: 0.5, // Trigger when 50% of the section is in view
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const link = document.getElementById(entry.target.id + "-link");
      if (entry.isIntersecting) {
        link.classList.remove("text-white");
        link.classList.add("text-green-500");
      } else {
        link.classList.remove("text-green-500");
        link.classList.add("text-white");
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
});
//about section animations
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("hidden", "opacity-0");
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((el) => {
    observer.observe(el);
  });
});
// Services section
document.querySelectorAll(".service-item").forEach((item) => {
  item.addEventListener("mouseenter", (event) => {
    const service = event.target;
    const serviceDescription = service.querySelector(".service-description");
    const image = event.target.getAttribute("data-image");

    // Show service description
    serviceDescription.classList.remove("hidden");
    serviceDescription.classList.add("block");

    // Change image
    document.getElementById("service-image").src = `src/images/${image}`;
  });

  item.addEventListener("mouseleave", (event) => {
    const serviceDescription = event.target.querySelector(
      ".service-description"
    );

    // Hide service description
    serviceDescription.classList.remove("block");
    serviceDescription.classList.add("hidden");
  });
});
// Work Section
document.querySelectorAll(".work-item").forEach((item) => {
  item.addEventListener("mouseover", (event) => {
    const work = event.target;
    const workDescription = work.querySelector(".work-description");
    const image = event.target.getAttribute("data-image");

    // Show work description
    workDescription.classList.remove("hidden");
    workDescription.classList.add("block");

    // Change image
    document.getElementById("work-image").src = `src/images/${image}`;

    // Remove 'hovered' class from all items
    workDescription.forEach((item) => item.classList.remove("hovered"));
    // Add 'hovered' class to the current item
    item.classList.add("hovered");
  });

  item.addEventListener("mouseleave", (event) => {
    const workDescription = event.target.querySelector(".work-description");

    // Hide work description
    workDescription.classList.remove("block");
    workDescription.classList.add("hidden");

    //remove hovered class from the current item
    item.classList.remove("hovered");
  });
});

// Form Submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const formMessages = document.getElementById("form-messages");

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          form.reset();
          formMessages.innerHTML = `
            <p class="text-green-500 font-tickerbit">
              Thank you! Your message has been sent.
            </p>
          `;
          // Redirect to thank you page
          window.location.href = "../pages/thankyou.html";
        } else {
          formMessages.innerHTML = `
            <p class="text-red-500 font-tickerbit">
              Oops! Something went wrong. Please try again.
            </p>
          `;
        }
      })
      .catch((error) => {
        formMessages.innerHTML = `
          <p class="text-red-500 font-pixeloid">
            Oops! Something went wrong. Please try again. ${error}
          </p>
        `;
      });
  });
