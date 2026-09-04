// Ken Muchiri — Site V2 — core interactions

// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  // Mark active nav link
  const path = window.location.pathname.replace(/\/index\.html$/, "/");
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (href === "/" && path === "/")) {
      a.classList.add("active");
    }
  });

  // Scroll reveal — only hide content once JS proves it can reveal it again
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    document.documentElement.classList.add("js-ready");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // Contact form — basic client-side handling (Formspree endpoint)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msgBox = document.getElementById("form-messages");
      const btn = form.querySelector("button[type=submit]");
      const originalText = btn.textContent;
      btn.textContent = "Sending...";
      btn.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          window.location.href = "/thankyou/";
        } else {
          if (msgBox) {
            msgBox.textContent =
              "Something went wrong — please email me directly instead.";
          }
        }
      } catch (err) {
        if (msgBox) {
          msgBox.textContent =
            "Something went wrong — please email me directly instead.";
        }
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  }
});
