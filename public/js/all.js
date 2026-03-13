(() => {
  // js/freelancer.js
  $(function() {
    $("body").on("click", ".page-scroll a", function(event) {
      var $anchor = $(this);
      $("html, body").stop().animate({
        scrollTop: $($anchor.attr("href")).offset().top
      }, 1500, "easeInOutExpo");
      event.preventDefault();
    });
  });
  $(".navbar-collapse ul li a").click(function() {
    $(".navbar-toggle:visible").click();
  });

  // js/tabs.js
  (() => {
    const filter = (predicate, obj) => {
      let result = [];
      for (let key in obj)
        predicate(obj[key]) && result.push(obj[key]);
      return result;
    };
    const filterElementNodes = (nodeList) => filter((node) => node.nodeType === 1, nodeList);
    const show = (page, bool = true) => page.style.opacity = page.style.zIndex = Number(!!bool);
    const hide = (page) => show(page, false);
    const tabSelection = document.querySelector("[ tab-selection ]");
    const tabSelectors = filterElementNodes(tabSelection.childNodes);
    const tabSelectorsK = Object.keys(tabSelectors);
    const removeActiveClass = (i) => tabSelectors[i].classList.remove("active");
    const highlightSelector = (target) => {
      tabSelectorsK.forEach(removeActiveClass);
      target.classList.add("active");
    };
    const tabPages = filterElementNodes(document.querySelector("[ tabs ]").childNodes);
    const showPage = (target) => {
      const pageNum = target.getAttribute("select-tab");
      const page = tabPages.filter((n) => n.getAttribute("tab-page") === pageNum)[0];
      tabPages.map((page2) => hide(page2));
      show(page);
    };
    const switchTab = ({ target }) => {
      if (!target.hasAttribute("select-tab")) return;
      highlightSelector(target);
      showPage(target);
    };
    tabPages.map((page) => {
      hide(page);
      page.removeAttribute("hidden");
    });
    show(tabPages[0]);
    tabSelection.addEventListener("click", switchTab);
  })();
})();
/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */
//# sourceMappingURL=all.js.map
