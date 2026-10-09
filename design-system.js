document.querySelectorAll("[data-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(selected));
    button.classList.toggle("selected", selected);
  });
});

const input = document.querySelector("#demo-input");
const messages = document.querySelector("#messages");
const status = document.querySelector("#demo-status");

document.querySelectorAll("[data-suggest]").forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.dataset.suggest;
    input.focus();
  });
});

document.querySelector("#demo-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (document.querySelector("#chat-error").checked) {
    status.textContent = "Indisponibilité simulée. Votre texte est conservé : désactivez la simulation puis réessayez.";
    status.classList.add("is-error");
    input.focus();
    return;
  }
  const text = input.value.trim();
  if (!text) {
    status.textContent = "Écrivez quelques mots avant d’afficher votre message.";
    input.focus();
    return;
  }
  const bubble = document.createElement("p");
  bubble.className = "bubble user-bubble";
  bubble.textContent = text;
  messages.append(bubble);
  while (messages.children.length > 21) {
    messages.children[1].remove();
  }
  messages.scrollTop = messages.scrollHeight;
  input.value = "";
  status.classList.remove("is-error");
  status.textContent = "Message affiché localement. Aucun envoi, aucune réponse IA.";
  input.focus();
});

document.querySelector("#chat-error").addEventListener("change", (event) => {
  status.classList.toggle("is-error", event.target.checked);
  status.textContent = event.target.checked
    ? "Indisponibilité simulée : le prochain message restera dans le champ."
    : "Démonstration disponible. Aucun envoi, aucune réponse IA.";
});

function revealLinkedDetails() {
  const target = document.getElementById(location.hash.slice(1));
  if (target instanceof HTMLDetailsElement) {
    target.open = true;
    target.scrollIntoView({ block: "start" });
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.getElementById(link.hash.slice(1));
    if (target instanceof HTMLDetailsElement) {
      target.open = true;
    }
  });
});

window.addEventListener("hashchange", revealLinkedDetails);
revealLinkedDetails();
