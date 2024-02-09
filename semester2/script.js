AOS.init();
// Parallax
let text = document.querySelector(".parallax-text");
let scrollPosition = window.scrollY;
text.style.top = "calc(50% + " + scrollPosition * 0.7 + "px)";

document.addEventListener("DOMContentLoaded", function () {
  // Set the initial top position based on the scroll position

  function updateParallax() {
    // Update the top position during scrolling
    text.style.top = "calc(50% + " + scrollPosition * 0.7 + "px)";
  }

  function handleScroll() {
    // Update the scroll position and request animation frame for smoothness
    scrollPosition = window.scrollY;
    requestAnimationFrame(updateParallax);
  }

  window.addEventListener("scroll", handleScroll);

  // Initial call to set the initial position
  updateParallax();
});

// Form submit
async function loadResponses() {
  let response = await fetch(
    "https://api.getform.io/v1/forms/5c963276-8266-4a30-ad5d-8aec0c09de6a?token=JOwtmhmuL5qUiqup2OO0XcXmJnHMnoABd8ygQTJvsiF184inszViF7rBIdQV"
  );
  let json = await response.json();
  let submissions = json.data.submissions;

  var panels = document.getElementById("accordionPanelsStayOpenExample");
  submissions.reverse();
  submissions.forEach((submission, index) => {
    panels.innerHTML += `<div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-${index + 1}"
        aria-expanded="true"
        aria-controls="panelsStayOpen-${index + 1}"
      >
        ${index + 1}. ${submission.name}
      </button>
    </h2>
    <div id="panelsStayOpen-${index + 1
      }" class="accordion-collapse collapse p-3">
      <a href="${submission.link}">${submission.link}</a>
    </div>
  </div>`;
  });
}

loadResponses();

const form = document.getElementById("form");
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  // Check if form is empty (all fields are empty)
  if (isFormEmpty(formData)) {
    swal({
      title: "خطأ",
      text: "يرجى ملئ المعلومات بشكل صحيح!",
      icon: "error",
    })
    return;
  }

  fetch("https://getform.io/f/5c963276-8266-4a30-ad5d-8aec0c09de6a", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      swal({
        title: "تم الاستلام",
        text: "تم استلام منتجك بنجاح!",
        icon: "success",
      }).then(() => {
        location.href = "/";
      });
    })
    .catch((error) => console.log(error));
}

function isFormEmpty(formData) {
  for (const value of formData.values()) {
    console.log(value)
    if (value.trim() == "") {
      return true; // Form is not empty
    }
  }
  return false; // Form is empty
}

// Loading Screen
document.addEventListener("DOMContentLoaded", function () {
  // Show loading screen
  document.getElementById("loading-screen").style.display = "flex";

  // Simulate loading delay (replace this with your actual data loading)
  setTimeout(function () {
    // Add fade-out class to the loading screen
    document.getElementById("loading-screen").classList.add("fade-out");

    // Show main content after fade-out transition completes
    setTimeout(function () {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 1000); // Same duration as the fade-out transition
  }, 2000); // Adjust the duration as needed
});