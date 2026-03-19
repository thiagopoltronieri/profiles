(function () {
    var contentRoot = window.profileContent;
    if (!contentRoot || !contentRoot.languages) {
        return;
    }

    var languageButtons = Array.prototype.slice.call(document.querySelectorAll("[data-lang-button]"));
    var storageKey = "thiago-poltronieri-language";
    var supportedLanguages = Object.keys(contentRoot.languages);

    function getInitialLanguage() {
        var queryParams = new URLSearchParams(window.location.search);
        var queryLang = queryParams.get("lang");
        var storedLang = null;

        try {
            storedLang = window.localStorage.getItem(storageKey);
        } catch (error) {
            storedLang = null;
        }

        if (supportedLanguages.indexOf(queryLang) !== -1) {
            return queryLang;
        }

        if (supportedLanguages.indexOf(storedLang) !== -1) {
            return storedLang;
        }

        return contentRoot.defaultLanguage;
    }

    function setText(id, value) {
        var element = document.getElementById(id);

        if (element) {
            element.textContent = value;
        }
    }

    function setLink(id, href, label, isDownload) {
        var element = document.getElementById(id);

        if (!element) {
            return;
        }

        element.href = href;
        element.textContent = label;

        if (isDownload) {
            element.setAttribute("download", "");
        } else {
            element.removeAttribute("download");
        }
    }

    function renderList(id, items, itemRenderer) {
        var element = document.getElementById(id);

        if (!element) {
            return;
        }

        element.innerHTML = items.map(itemRenderer).join("");
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function renderLinkedText(item, fallbackKey) {
        if (item.href && item.linkText) {
            return [
                escapeHtml(item.labelPrefix || ""),
                "<a class=\"text-link\" href=\"", escapeHtml(item.href), "\" target=\"_blank\" rel=\"noopener noreferrer\">",
                escapeHtml(item.linkText),
                "</a>",
                escapeHtml(item.labelSuffix || "")
            ].join("");
        }

        return escapeHtml(item[fallbackKey]);
    }

    function renderLanguage(languageKey) {
        var language = contentRoot.languages[languageKey];
        var metaDescription = document.getElementById("meta-description");

        document.documentElement.lang = language.htmlLang;
        document.title = language.title;

        if (metaDescription) {
            metaDescription.setAttribute("content", language.metaDescription);
        }

        setLink("resume-view-link", language.resumePage, language.labels.resumeView, false);
        setLink("resume-download-link", language.resumePdf, language.labels.resumeDownload, true);
        setLink("hero-download-link", language.resumePdf, language.labels.heroDownload, true);
        setLink("hero-resume-link", language.resumePage, language.labels.heroResume, false);
        setLink("footer-resume-link", language.resumePdf, language.labels.footerResume, true);

        setText("skip-link", language.labels.skipLink);
        setText("brand-title", language.labels.brandTitle);
        setText("portrait-badge", language.labels.portraitBadge);
        setText("nav-about", language.labels.navAbout);
        setText("nav-expertise", language.labels.navExpertise);
        setText("nav-experience", language.labels.navExperience);
        setText("nav-initiatives", language.labels.navInitiatives);
        setText("nav-connect", language.labels.navConnect);
        setText("nav-contact", language.labels.navContact);
        setText("footer-copy", language.labels.footerCopy);

        var languageSwitcher = document.getElementById("language-switcher");
        var brandMark = document.getElementById("brand-mark");
        var sectionNav = document.getElementById("section-nav");
        var heroPills = document.getElementById("hero-pill-list");
        var heroStats = document.getElementById("hero-stat-list");
        var portraitImage = document.getElementById("portrait-image");
        var floatingWhatsapp = document.getElementById("floating-whatsapp");

        if (languageSwitcher) {
            languageSwitcher.setAttribute("aria-label", language.labels.languageGroup);
        }

        if (brandMark) {
            brandMark.setAttribute("aria-label", language.labels.brandLinkAria);
        }

        if (sectionNav) {
            sectionNav.setAttribute("aria-label", language.labels.sectionNavAria);
        }

        if (heroPills) {
            heroPills.setAttribute("aria-label", language.labels.heroPillsAria);
        }

        if (heroStats) {
            heroStats.setAttribute("aria-label", language.labels.heroStatsAria);
        }

        if (portraitImage) {
            portraitImage.setAttribute("alt", language.labels.portraitAlt);
        }

        if (floatingWhatsapp) {
            floatingWhatsapp.setAttribute("aria-label", language.labels.whatsappAria);
        }

        setText("hero-eyebrow", language.hero.eyebrow);
        setText("hero-name", language.hero.name);
        setText("hero-role", language.hero.role);
        setText("hero-summary", language.hero.summary);

        renderList("hero-pill-list", language.hero.pills, function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
        });

        renderList("hero-stat-list", language.hero.stats, function (item) {
            return [
                "<article class=\"stat-card\">",
                "<span class=\"stat-card__value\">", escapeHtml(item.value), "</span>",
                "<span class=\"stat-card__label\">", renderLinkedText(item, "label"), "</span>",
                "</article>"
            ].join("");
        });

        setText("about-eyebrow", language.about.eyebrow);
        setText("about-title", language.about.title);
        setText("snapshot-eyebrow", language.about.snapshotEyebrow);
        setText("snapshot-title", language.about.snapshotTitle);

        renderList("about-copy", language.about.paragraphs, function (item) {
            return "<p>" + escapeHtml(item) + "</p>";
        });

        renderList("snapshot-list", language.about.snapshot, function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
        });

        setText("expertise-eyebrow", language.expertise.eyebrow);
        setText("expertise-title", language.expertise.title);
        setText("expertise-description", language.expertise.description);

        renderList("expertise-grid", language.expertise.items, function (item) {
            return [
                "<article class=\"expertise-card\">",
                "<h3>", escapeHtml(item.title), "</h3>",
                "<ul>",
                item.points.map(function (point) {
                    return "<li>" + escapeHtml(point) + "</li>";
                }).join(""),
                "</ul>",
                "</article>"
            ].join("");
        });

        setText("differentiators-eyebrow", language.differentiators.eyebrow);
        setText("differentiators-title", language.differentiators.title);

        renderList("differentiators-list", language.differentiators.items, function (item) {
            return [
                "<article class=\"value-card\">",
                "<h3>", escapeHtml(item.title), "</h3>",
                "<p>", escapeHtml(item.description), "</p>",
                "</article>"
            ].join("");
        });

        setText("audiences-eyebrow", language.audiences.eyebrow);
        setText("audiences-title", language.audiences.title);

        renderList("audiences-list", language.audiences.items, function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
        });

        setText("experience-eyebrow", language.experience.eyebrow);
        setText("experience-title", language.experience.title);
        setText("experience-description", language.experience.description);

        renderList("experience-list", language.experience.jobs, function (item) {
            return [
                "<article class=\"timeline-card\">",
                "<div class=\"timeline-card__meta\">",
                "<span class=\"timeline-card__company\">", escapeHtml(item.company), "</span>",
                "<span>", escapeHtml(item.period), " | ", escapeHtml(item.location), "</span>",
                "</div>",
                "<h3 class=\"timeline-card__title\">", escapeHtml(item.title), "</h3>",
                "<p class=\"timeline-card__summary\">", escapeHtml(item.summary), "</p>",
                item.featured ? [
                    "<div class=\"timeline-card__highlight-grid\">",
                    item.featured.map(function (feature) {
                        return [
                            "<article class=\"timeline-card__highlight\">",
                            "<span class=\"timeline-card__highlight-tag\">", escapeHtml(feature.tag), "</span>",
                            "<h4>", escapeHtml(feature.title), "</h4>",
                            "<p>", renderLinkedText(feature, "description"), "</p>",
                            "</article>"
                        ].join("");
                    }).join(""),
                    "</div>"
                ].join("") : "",
                "<ul>",
                item.bullets.map(function (point) {
                    return "<li>" + escapeHtml(point) + "</li>";
                }).join(""),
                "</ul>",
                "</article>"
            ].join("");
        });

        setText("initiatives-eyebrow", language.initiatives.eyebrow);
        setText("initiatives-title", language.initiatives.title);

        renderList("initiatives-list", language.initiatives.items, function (item) {
            return [
                "<article class=\"initiative-card\">",
                "<span class=\"initiative-card__meta\">", escapeHtml(item.tag), "</span>",
                "<h3>", escapeHtml(item.title), "</h3>",
                "<p>", escapeHtml(item.description), "</p>",
                "</article>"
            ].join("");
        });

        setText("languages-eyebrow", language.values.eyebrow);
        setText("languages-title", language.values.title);

        renderList("languages-list", language.values.items, function (item) {
            return [
                "<article class=\"mini-card\">",
                "<strong>", escapeHtml(item.title), "</strong>",
                "<span>", escapeHtml(item.text), "</span>",
                "</article>"
            ].join("");
        });

        setText("connect-eyebrow", language.connect.eyebrow);
        setText("connect-title", language.connect.title);
        setText("connect-description", language.connect.description);

        renderList("connect-links", language.connect.links, function (item) {
            return [
                "<a class=\"link-card\" href=\"", escapeHtml(item.href), "\" target=\"_blank\" rel=\"noopener noreferrer\">",
                "<span class=\"link-card__tag\">", escapeHtml(item.tag), "</span>",
                "<h3>", escapeHtml(item.title), "</h3>",
                "<p>", escapeHtml(item.description), "</p>",
                "<span class=\"link-card__arrow\">", escapeHtml(language.labels.openLink), "</span>",
                "</a>"
            ].join("");
        });

        setText("contact-eyebrow", language.contact.eyebrow);
        setText("contact-title", language.contact.title);
        setText("contact-description", language.contact.description);

        renderList("contact-links", language.contact.links, function (item) {
            return [
                "<a class=\"link-card link-card--contact\" href=\"", escapeHtml(item.href), "\" target=\"_blank\" rel=\"noopener noreferrer\">",
                "<span class=\"link-card__tag\">", escapeHtml(item.tag), "</span>",
                "<h3>", escapeHtml(item.title), "</h3>",
                "<p>", escapeHtml(item.description), "</p>",
                "<span class=\"link-card__arrow\">", escapeHtml(language.labels.openLink), "</span>",
                "</a>"
            ].join("");
        });

        languageButtons.forEach(function (button) {
            var isActive = button.getAttribute("data-lang-button") === languageKey;

            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", isActive ? "true" : "false");
        });

        try {
            window.localStorage.setItem(storageKey, languageKey);
        } catch (error) {
            /* no-op */
        }
    }

    languageButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            renderLanguage(button.getAttribute("data-lang-button"));
        });
    });

    renderLanguage(getInitialLanguage());
})();
