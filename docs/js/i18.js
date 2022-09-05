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

  // Get browser language
  var userLang = navigator.language || navigator.userLanguage || "en";
  if (userLang) userLang = userLang.substring(0, 2); // Only take the first two letters

  // Get selected language, if selected previosly
  storedLang = localStorage.getItem("lang")
  if (storedLang !== null) {
    userLang = storedLang;
  }

  // Set default language if language is not supported
  if (userLang !== "en" && userLang !== "sv") {
    userLang = "en";
  }

  localStorage.setItem("lang", userLang)
  await i18next.init({
    lng: userLang,
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
        localStorage.setItem("lang", "sv")
      } else {
        i18next.changeLanguage("en");
        localStorage.setItem("lang", "en")
      }
    })
  })
}

i18Loader();

// Set the language toggle correctly for the given language
window.onload = function() {
  //dom not only ready, but everything is loaded
  console.log("DOM is ready, language is set to " + i18next.language);
  console.log("1: Toggle checked:", $('#language-toggle-event').prop('checked'))
  if (i18next.language == 'en') {
    if ($('#language-toggle-event').prop('checked')) {
      console.log("Setting toggle off");
      $('#language-toggle-event').bootstrapToggle('off')
    }
  } else if (i18next.language == 'sv') {
    if (!$('#language-toggle-event').prop('checked')) {
      console.log("Setting toggle on");
      $('#language-toggle-event').bootstrapToggle('on')
    }
    if (document.title == "Contact us | Frossarbo Ängar") {
      document.title = "Kontakta oss | Frossarbo Ängar"
    }
  }
  console.log("2: Toggle checked:", $('#language-toggle-event').prop('checked'))
};