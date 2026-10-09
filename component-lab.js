document.documentElement.classList.add("has-js");

const menuToggle = document.querySelector("#mobile-toggle");
const mainNav = document.querySelector("#main-nav");
function closeMenu(returnFocus = false) {
  menuToggle.setAttribute("aria-expanded", "false");
  mainNav.classList.remove("is-open");
  if (returnFocus) menuToggle.focus();
}
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(expanded));
  mainNav.classList.toggle("is-open", expanded);
});
mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu(true);
  }
});

const actionStatus = document.querySelector("#action-status");
document.querySelector("#normal-action").addEventListener("click", () => {
  actionStatus.textContent = "Action de démonstration confirmée. Rien n’a été envoyé.";
});
document.querySelectorAll("[data-state-action]").forEach((button) => {
  button.addEventListener("click", () => {
    actionStatus.textContent = `État ${button.dataset.stateAction} : action locale confirmée.`;
  });
});
function demonstrateLoading(button, label, completion) {
  button.addEventListener("click", () => {
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    button.textContent = label;
    actionStatus.textContent = "Chargement simulé, aucune requête réseau.";
    window.setTimeout(() => {
      button.disabled = false;
      button.removeAttribute("aria-busy");
      button.textContent = completion;
      actionStatus.textContent = "Simulation terminée. Le contrôle est de nouveau disponible.";
    }, 800);
  });
}
demonstrateLoading(document.querySelector("#loading-action"), "Chargement…", "Simuler le chargement");
demonstrateLoading(document.querySelector("#loading-chip"), "Chargement…", "Charger une suggestion");

function feedback(element, text, state = "") {
  element.textContent = text;
  element.classList.toggle("is-error", state === "error");
  element.classList.toggle("is-success", state === "success");
}

function validateField(field, error, message) {
  const valid = field.value.trim() !== "" && field.validity.valid;
  field.setAttribute("aria-invalid", String(!valid));
  error.textContent = valid ? "" : message;
  return valid;
}
function clearErrors(form) {
  form.querySelectorAll("[aria-invalid]").forEach((field) => field.removeAttribute("aria-invalid"));
  form.querySelectorAll(".field-error").forEach((error) => { error.textContent = ""; });
}

const exampleForm = document.querySelector("#example-form");
const formStatus = document.querySelector("#form-status");
const formRules = [
  ["example-title", "title-error", "Renseignez un nom de projet (80 caractères maximum)."],
  ["example-email", "email-error", "Renseignez un email valide, par exemple demo@example.com."],
  ["example-service", "service-error", "Choisissez une prestation."],
  ["example-date", "date-error", "Choisissez une date valide."]
];
function validateRules(rules) {
  let firstInvalid = null;
  rules.forEach(([id, errorId, message]) => {
    const field = document.getElementById(id);
    if (!validateField(field, document.getElementById(errorId), message) && !firstInvalid) {
      firstInvalid = field;
    }
  });
  return firstInvalid;
}
exampleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const invalid = validateRules(formRules);
  if (invalid) {
    feedback(formStatus, "Validation impossible. Corrigez les champs signalés.", "error");
    invalid.focus();
    return;
  }
  feedback(formStatus, "Formulaire valide — confirmation locale seulement. Aucune demande créée.", "success");
});
exampleForm.addEventListener("input", () => {
  feedback(formStatus, "Formulaire modifié. Validez de nouveau pour confirmer.");
  formRules.forEach(([id, errorId, message]) => {
    const field = document.getElementById(id);
    if (field.hasAttribute("aria-invalid")) {
      validateField(field, document.getElementById(errorId), message);
    }
  });
});
exampleForm.addEventListener("reset", () => {
  clearErrors(exampleForm);
  feedback(formStatus, "Formulaire réinitialisé. Rien n’a été conservé.");
});

document.querySelector("#download-example").addEventListener("click", () => {
  const content = "LE MONDE AIME — FICHE DE DÉMONSTRATION\n\nDossier exemple\nPrestation : Vin d’honneur\nÉtat : Brouillon fictif\nContact : Non renseigné\n\nAucun dossier réel, aucun montant, aucun contrat.\n";
  const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "fiche-demonstration.txt";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  feedback(document.querySelector("#document-status"), "Fiche fictive préparée pour téléchargement. Aucun appel serveur.", "success");
});

const video = document.querySelector("#hero-video-demo");
const videoStatus = document.querySelector("#video-status");
const videoPlaceholder = document.querySelector("#video-placeholder");
let videoUrl = null;
function releaseVideo() {
  video.pause();
  video.removeAttribute("src");
  video.load();
  if (videoUrl) URL.revokeObjectURL(videoUrl);
  videoUrl = null;
}
document.querySelector("#video-file").addEventListener("change", (event) => {
  releaseVideo();
  videoPlaceholder.hidden = false;
  const file = event.target.files[0];
  if (!file) {
    feedback(videoStatus, "Pas de média chargé. Le fichier reste sur votre appareil.");
    return;
  }
  if (!file.type.startsWith("video/")) {
    feedback(videoStatus, "Choisissez un fichier vidéo valide. Aucun fichier transmis.", "error");
    event.target.value = "";
    return;
  }
  videoUrl = URL.createObjectURL(file);
  video.src = videoUrl;
  feedback(videoStatus, "Chargement du fichier local…");
});
video.addEventListener("loadedmetadata", () => {
  videoPlaceholder.hidden = true;
  feedback(videoStatus, "Vidéo locale prête. Utilisez les contrôles natifs pour lire et mettre en pause.", "success");
});
video.addEventListener("error", () => {
  videoPlaceholder.hidden = false;
  feedback(videoStatus, "Format non lisible ou fichier indisponible. Essayez un autre fichier local.", "error");
});
window.addEventListener("pagehide", () => {
  if (videoUrl) URL.revokeObjectURL(videoUrl);
});

const slides = [
  { photo: "1532712938310-34cb3982ef74", caption: "Cérémonie — photographie illustrative", alt: "Couple dans un jardin — photographie illustrative." },
  { photo: "1519225421980-715cb0215aed", caption: "Réception — photographie illustrative", alt: "Table de réception fleurie — photographie illustrative." },
  { photo: "1511192336575-5a79af67a629", caption: "Saxophone — photographie illustrative", alt: "Musicien au saxophone — photographie illustrative." }
];
let slideIndex = 0;
function showSlide(index) {
  slideIndex = (index + slides.length) % slides.length;
  const slide = slides[slideIndex];
  const image = document.querySelector("#instant-image");
  image.src = `https://images.unsplash.com/photo-${slide.photo}?auto=format&fit=crop&w=800&q=80`;
  image.alt = slide.alt;
  document.querySelector("#instant-caption").textContent = slide.caption;
  document.querySelector("#instant-status").textContent = `${slideIndex + 1} / ${slides.length} — ${slide.caption}`;
  document.querySelectorAll("[data-slide]").forEach((button) => {
    if (Number(button.dataset.slide) === slideIndex) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });
}
document.querySelector("#instant-prev").addEventListener("click", () => showSlide(slideIndex - 1));
document.querySelector("#instant-next").addEventListener("click", () => showSlide(slideIndex + 1));
document.querySelectorAll("[data-slide]").forEach((button) => {
  button.addEventListener("click", () => showSlide(Number(button.dataset.slide)));
});
document.querySelector(".instant-carousel").addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showSlide(slideIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});

const galleryDialog = document.querySelector("#gallery-dialog");
let galleryTrigger = null;
document.querySelectorAll("[data-gallery]").forEach((button) => {
  button.addEventListener("click", () => {
    galleryTrigger = button;
    document.querySelector("#gallery-title").textContent = `${button.dataset.gallery} — fiche illustrative`;
    document.querySelector("#gallery-description").textContent = "Structure de galerie indépendante, sans vidéo ni données du site Matt Mez Sax.";
    galleryDialog.showModal();
  });
});
galleryDialog.addEventListener("close", () => galleryTrigger?.focus());
galleryDialog.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    galleryDialog.querySelector("button").focus();
  }
});

const editorForm = document.querySelector("#editor-form");
const editorStatus = document.querySelector("#editor-status");
const saveButton = document.querySelector("#save-draft");
const editorFields = ["title", "description", "cta", "service"];
const defaultDraft = Object.fromEntries(editorFields.map((key) => [
  key, document.getElementById(`draft-${key}`).value
]));
let savedDraft = { ...defaultDraft };
let saveGeneration = 0;
let saving = false;
function readDraft() {
  return Object.fromEntries(editorFields.map((key) => [
    key, document.getElementById(`draft-${key}`).value.trim()
  ]));
}
function renderCard(container, data) {
  const fragment = document.querySelector("#landing-card-template").content.cloneNode(true);
  fragment.querySelector("[data-card-service]").textContent = data.service;
  fragment.querySelector("[data-card-title]").textContent = data.title || "Titre à renseigner";
  fragment.querySelector("[data-card-description]").textContent = data.description || "Description à renseigner";
  const cta = fragment.querySelector("[data-card-cta]");
  cta.textContent = data.cta || "Action à renseigner";
  cta.disabled = !data.cta;
  cta.addEventListener("click", () => {
    feedback(document.querySelector("#preview-action-status"), "Action de démonstration uniquement. Aucun parcours client déclenché.", "success");
  });
  container.replaceChildren(fragment);
}
function renderPreviews() {
  const draft = readDraft();
  document.querySelectorAll("[data-preview]").forEach((container) => {
    renderCard(container, container.dataset.preview === "saved" ? savedDraft : draft);
  });
}
function setSaving(value) {
  saving = value;
  saveButton.disabled = value;
  saveButton.textContent = value ? "Sauvegarde locale…" : "Sauvegarder en mémoire";
  if (value) saveButton.setAttribute("aria-busy", "true");
  else saveButton.removeAttribute("aria-busy");
}
const editorRules = [
  ["draft-title", "draft-title-error", "Renseignez un titre (80 caractères maximum)."],
  ["draft-description", "draft-description-error", "Renseignez une description (240 caractères maximum)."],
  ["draft-cta", "draft-cta-error", "Renseignez un libellé (40 caractères maximum)."]
];
editorFields.forEach((key) => {
  document.getElementById(`draft-${key}`).addEventListener("input", () => {
    renderPreviews();
    editorRules.forEach(([id, errorId, message]) => {
      const field = document.getElementById(id);
      if (field.hasAttribute("aria-invalid")) validateField(field, document.getElementById(errorId), message);
    });
    if (!saving) {
      const changed = JSON.stringify(readDraft()) !== JSON.stringify(savedDraft);
      feedback(editorStatus, changed ? "Brouillon modifié, non enregistré. La vue publique est inchangée." : "Brouillon identique à la version enregistrée.");
    }
  });
});
editorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (saving) return;
  const invalid = validateRules(editorRules);
  if (invalid) {
    feedback(editorStatus, "Sauvegarde impossible. Corrigez les champs signalés ; la version enregistrée est conservée.", "error");
    invalid.focus();
    return;
  }
  const snapshot = readDraft();
  const simulateError = document.querySelector("#save-error").checked;
  const generation = ++saveGeneration;
  setSaving(true);
  feedback(editorStatus, "Sauvegarde simulée en cours. Aucun serveur contacté.");
  window.setTimeout(() => {
    if (generation !== saveGeneration) return;
    setSaving(false);
    if (simulateError) {
      feedback(editorStatus, "Échec simulé : le brouillon et la version enregistrée sont conservés. Désactivez l’erreur puis réessayez.", "error");
      return;
    }
    savedDraft = snapshot;
    renderPreviews();
    const changed = JSON.stringify(readDraft()) !== JSON.stringify(savedDraft);
    feedback(editorStatus, changed ? "Version sauvegardée en mémoire ; des modifications plus récentes restent dans le brouillon." : "Sauvegardé en mémoire. Public, brouillon et mobile utilisent les mêmes valeurs. Rien n’est publié.", "success");
  }, 800);
});
document.querySelector("#reset-draft").addEventListener("click", () => {
  saveGeneration += 1;
  setSaving(false);
  editorForm.reset();
  savedDraft = { ...defaultDraft };
  clearErrors(editorForm);
  renderPreviews();
  feedback(editorStatus, "Démonstration réinitialisée. Aucune donnée réelle modifiée.");
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab, focus = false) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute("aria-controls")).hidden = !selected;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectTab(tabs[next], true);
    }
  });
});
renderPreviews();
