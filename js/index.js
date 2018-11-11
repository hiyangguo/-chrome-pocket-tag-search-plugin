const wrapper = $("#pagenav_tagfilter .popover-new-list")[0];

const observer = new MutationObserver(function() {
  stopObserver();
  const $li = $(
    `<li class="plugin-li"><input class="plugin-input" placeholder="输入标签进行搜索"/></li>`
  );
  const $input = $li.find("input");
  $input.on("click", () => false);
  $input.on(
    "input",
    _.debounce(function() {
      const word = $(this).val();
      const $lis = $(wrapper).find("li[val]:not([val='edit'])");
      if (word.length === 0) {
        $lis.show();
        return;
      }
      $lis.each(function() {
        const tagName = decodeURIComponent($(this).attr("val"));
        const toggle = tagName.toLowerCase().includes(word.toLowerCase())
          ? "show"
          : "hide";
        $(this)[toggle]();
      });
    }, 300)
  );
  $(wrapper).prepend($li);
  startObserver();
});

function startObserver() {
  observer.observe(wrapper, {
    attributes: false,
    childList: true,
    subtree: false
  });
}

function stopObserver() {
  observer.disconnect();
}

startObserver();
