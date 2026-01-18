// Smooth scrolling
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Fade-in on scroll
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  section.classList.add("fade-in");
  observer.observe(section);
});

// Back-to-top button
const backToTop = document.createElement("button");
backToTop.innerText = "↑";
backToTop.id = "backToTop";
document.body.appendChild(backToTop);

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

// Travel Modal
const modal = document.getElementById("travelModal");
const modalBody = document.getElementById("modalBody");
const closeBtn = modal.querySelector(".close");

document.querySelectorAll(".gallery-item[data-file]").forEach(item => {
  item.addEventListener("click", () => {
    const file = item.getAttribute("data-file");
    fetch(file)
      .then(res => res.text())
      .then(html => {
        const trimmed = html.trim();
        if (trimmed.startsWith("<!")) {
          const doc = new DOMParser().parseFromString(html, "text/html");
          modalBody.innerHTML = doc.body.innerHTML;
        } else {
          modalBody.innerHTML = html;
        }
        modal.style.display = "flex";
      })
      .catch(err => {
        modalBody.innerHTML = "<p style='color:salmon'>Could not load content.</p>";
        console.error("Error loading travel content:", err);
      });
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modalBody.innerHTML = "";
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalBody.innerHTML = "";
  }
});
