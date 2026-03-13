'use strict';

/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
  $('body').on('click', '.page-scroll a', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
  $('.navbar-toggle:visible').click();
});

(function () {

  var filter = function filter(predicate, obj) {
    var result = [];

    for (var key in obj) {
      predicate(obj[key]) && result.push(obj[key]);
    }return result;
  };

  var filterElementNodes = function filterElementNodes(nodeList) {
    return filter(function (node) {
      return node.nodeType === 1;
    }, nodeList);
  };

  var show = function show(page) {
    var bool = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
    return page.style.opacity = page.style.zIndex = Number(!!bool);
  };
  var hide = function hide(page) {
    return show(page, false);
  };

  var tabSelection = document.querySelector('[ tab-selection ]');
  var tabSelectors = filterElementNodes(tabSelection.childNodes);
  var tabSelectorsK = Object.keys(tabSelectors);

  var removeActiveClass = function removeActiveClass(i) {
    return tabSelectors[i].classList.remove('active');
  };

  var highlightSelector = function highlightSelector(target) {
    tabSelectorsK.forEach(removeActiveClass);
    target.classList.add('active');
  };

  var tabPages = filterElementNodes(document.querySelector('[ tabs ]').childNodes);

  var showPage = function showPage(target) {
    var pageNum = target.getAttribute('select-tab');
    var page = tabPages.filter(function (n) {
      return n.getAttribute('tab-page') === pageNum;
    })[0];

    tabPages.map(function (page) {
      return hide(page);
    });
    show(page);
  };

  var switchTab = function switchTab(_ref) {
    var target = _ref.target;

    if (!target.hasAttribute('select-tab')) return;
    highlightSelector(target);
    showPage(target);
  };

  tabPages.map(function (page) {
    hide(page);
    page.removeAttribute('hidden');
  });

  show(tabPages[0]);

  tabSelection.addEventListener('click', switchTab);
})();
//# sourceMappingURL=all.js.map
