// Adapted from https://stackoverflow.com/questions/68056154/localization-of-static-html-with-i18next-loading-local-json-translation-files
function updateContent() {
  const elements = document.getElementsByClassName("i18nelement");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const k = element.getAttribute("data-i18n");
    element.innerHTML = i18next.t(k);
  }
}

async function i18Loader() {
  const langs = ["en", "sv"];
  const jsons = await Promise.all(
    langs.map((l) => fetch("js/i18/" + l + ".json").then((r) => r.json()))
  );
  const res = langs.reduce((acc, l, idx) => {
    acc[l] = { translation: jsons[idx] };
    return acc;
  }, {});
  await i18next.init({
    lng: "sv",
    debug: true,
    resources: res
  });

  // Initial update
  updateContent();

  // On update language
  i18next.on("languageChanged", () => {
    updateContent();
  });
  
  // If language toggle is clicked
  $(function() {
    $('#language-toggle-event').on("change", function() {
      if ($(this).prop('checked')) {
        i18next.changeLanguage("sv");
      } else {
        i18next.changeLanguage("en");
      }
    })
  })
}

i18Loader();
