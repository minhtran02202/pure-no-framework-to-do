//add comments and choose color themes
//clean up css

class ColorThemes {
  constructor() {
    this.relaxingTheme = {
      bg_color: "ivory",
      border: "#b3c890",
      btn: "#307b58",
      btn_txt: "#fff",
      intput_bg: "#fff",
      submit_btn: "#31797e",
      txt: "#31797e",
    };

    this.nightOwlTheme = {
      bg_color: "#393646",
      border: "#F4EEE0",
      btn: "#F4EEE0",
      btn_txt: "#4F4557",
      intput_bg: "#6d5d6e",
      submit_btn: "#F4EEE0",
      txt: "#F4EEE0",
    };

    this.minimalTheme = {
      bg_color: "#fff",
      border: "#5f7582",
      btn: "#617482",
      btn_txt: "#fff",
      intput_bg: "#fff",
      submit_btn: "#826161",
      txt: "#292929",
    };

    this.themes = {
      relaxing: this.relaxingTheme,
      night_owl: this.nightOwlTheme,
      minimal: this.minimalTheme,
    };
  }

  changeTheme(userTheme) {
    if (Object.values(this.themes).indexOf(userTheme)) {
      const theme = this.themes[userTheme];
      const root = document.documentElement;

      root.style.setProperty("--bg-color", theme.bg_color);
      root.style.setProperty("--border-color", theme.border);
      root.style.setProperty("--btn-color", theme.btn);
      root.style.setProperty("--btn-txt-color", theme.btn_txt);
      root.style.setProperty("--input-bg-color", theme.intput_bg);
      root.style.setProperty("--submit-btn-color", theme.submit_btn);
      root.style.setProperty("--txt-color", theme.txt);
    }
  }
}

//also set the dropdown to appropriate theme
function saveColorTheme(theme) {
  localStorage.setItem("colorTheme", JSON.stringify(theme));
}

function loadColorTheme(themes) {
  const savedColorTheme = localStorage.getItem("colorTheme");
  const colorThemes = new ColorThemes();
  if (savedColorTheme) {
    const theme = JSON.parse(savedColorTheme);
    themes.value = theme;
    colorThemes.changeTheme(theme);
  } else {
    colorThemes.changeTheme("relaxing");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const themes = document.getElementById("theme_choice");
  loadColorTheme(themes);
  const colorThemes = new ColorThemes();

  themes.addEventListener("change", (e) => {
    const theme = e.target.value;
    colorThemes.changeTheme(theme);
    saveColorTheme(theme);
  });
});
