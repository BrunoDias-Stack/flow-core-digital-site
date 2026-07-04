const WHATSAPP_NUMBER = "";
const CONTACT_EMAIL = "contact@flowcoredigital.com";

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const form = document.querySelector("[data-contact-form]");
const formFeedback = document.querySelector("[data-form-feedback]");
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");

function updateHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
  nav?.classList.remove("is-open");
  menuToggle?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function toggleMenu() {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
  menuToggle?.classList.toggle("is-open", isOpen);
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
}

function setupContactPlaceholders() {
  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento para um projeto digital."
  );
  const whatsappHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`
    : "#contato";

  whatsappLinks.forEach((link) => {
    link.setAttribute("href", whatsappHref);
  });

  document.querySelectorAll("[data-contact-email]").forEach((link) => {
    link.setAttribute("href", `mailto:${CONTACT_EMAIL}`);
  });
}

function formatPhone(value) {
  const startsWithPlusOne = value.trim().startsWith("+1");
  const digits = value.replace(/\D/g, "").slice(0, 13);

  if (!digits) return "";

  if (startsWithPlusOne || digits.startsWith("1")) {
    const localNumber = digits.startsWith("1") ? digits.slice(1, 11) : digits.slice(0, 10);
    const area = localNumber.slice(0, 3);
    const prefix = localNumber.slice(3, 6);
    const line = localNumber.slice(6, 10);

    if (localNumber.length <= 3) return `+1 ${area}`;
    if (localNumber.length <= 6) return `+1 (${area}) ${prefix}`;
    return `+1 (${area}) ${prefix}-${line}`;
  }

  const localDigits = digits.slice(0, 11);
  const hasNineDigits = localDigits.length > 10;
  const firstPart = localDigits.slice(0, 2);
  const secondPart = localDigits.slice(2, hasNineDigits ? 7 : 6);
  const thirdPart = localDigits.slice(hasNineDigits ? 7 : 6);

  if (localDigits.length <= 2) return firstPart;
  if (localDigits.length <= (hasNineDigits ? 7 : 6)) return `(${firstPart}) ${secondPart}`;
  return `(${firstPart}) ${secondPart}-${thirdPart}`;
}

function setupForm() {
  if (!form) return;

  const phoneInput = form.querySelector("#telefone");

  phoneInput?.addEventListener("input", (event) => {
    event.target.value = formatPhone(event.target.value);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get("nome")?.toString().trim();
    const phone = data.get("telefone")?.toString().trim();
    const projectType = data.get("tipo")?.toString().trim();
    const message = data.get("mensagem")?.toString().trim();

    if (!name || !phone || !projectType || !message) {
      formFeedback.textContent = "Preencha todos os campos para enviar sua solicitação.";
      return;
    }

    const subject = encodeURIComponent(`Novo projeto digital - ${name}`);
    const body = encodeURIComponent(
      [
        "Olá, Flow Core Digital.",
        "",
        "Tenho interesse em um projeto digital.",
        "",
        `Nome: ${name}`,
        `Telefone: ${phone}`,
        `Tipo de projeto: ${projectType}`,
        "",
        "Mensagem:",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    formFeedback.textContent = "Abrindo seu aplicativo de e-mail para enviar a solicitação.";
    form.reset();
  });
}

menuToggle?.addEventListener("click", toggleMenu);

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("scroll", updateHeaderState, { passive: true });

setupContactPlaceholders();
setupForm();
updateHeaderState();
