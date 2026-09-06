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

  // Image sandbox — the secret stays on the server, never in the page.
  const imageForm = document.getElementById("image-sandbox-form");
  if (imageForm) {
    imageForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const prompt = document.getElementById("image-prompt").value.trim();
      const status = document.getElementById("image-sandbox-status");
      const output = document.getElementById("image-sandbox-output");
      const button = imageForm.querySelector("button[type=submit]");
      const buttonText = button.querySelector("span");

      if (!prompt) return;
      button.disabled = true;
      buttonText.textContent = "Making image...";
      status.classList.remove("error");
      status.textContent = "Qwen is working on it...";

      try {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error("The image service could not generate that image. Please try again.");
        }

        const image = document.createElement("img");
        image.src = URL.createObjectURL(await response.blob());
        image.alt = `Generated image for: ${prompt}`;
        output.replaceChildren(image);
        status.textContent = "Image ready.";
      } catch (error) {
        status.classList.add("error");
        status.textContent = error.message || "Unable to generate an image right now.";
      } finally {
        button.disabled = false;
        buttonText.textContent = "Generate image";
      }
    });
  }
});
