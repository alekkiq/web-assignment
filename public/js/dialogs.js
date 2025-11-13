/**
 * Initializes all `<dialog>` elements with the class `modal`.
 *
 * In order to work properly:
 * - each dialog should have a `<button>` with
 * the class `close-modal` as a child.
 * - each dialog should have a unique id.
 * - the button responsible for opening the dialog should have `data-open-dialog="<dialog-id>"`
 */
export const initDialogs = () => {
  const dialogs = document.querySelectorAll('dialog.modal');

  dialogs.forEach((d) => {
    const openBtns = document.querySelectorAll(`button[data-open-dialog="${d.id}"]`);
    const closeBtn = d.querySelector('button.close-modal');

    openBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        d.showModal();
      });
    });

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      d.close();
    });
  });
}

/**
 * Initializes all tab components with the class `tabs`.
 *
 * In order to work properly:
 * - each tab component should have buttons with the class `tab` as controls.
 * - each tab component should have elements with the class `panel` as content panels.
 * - the order of the buttons should match the order of the panels in the HTML.
 */
export const initTabs = () => {
  const tabsElements = document.querySelectorAll('.tabs');

  tabsElements.forEach((tabs) => {
    const controls = Array.from(tabs.querySelectorAll('button.tab'));
    const panels = Array.from(tabs.querySelectorAll('.panel'));
    if (controls.length === 0 || panels.length === 0) return;

    let activeIndex = controls.findIndex((c) => c.classList.contains('active'));
    if (activeIndex === -1) activeIndex = panels.findIndex((p) => p.classList.contains('active'));
    if (activeIndex === -1) activeIndex = 0;

    controls.forEach((c, i) => c.classList.toggle('active', i === activeIndex));
    panels.forEach((p, i) => p.classList.toggle('active', i === activeIndex));

    tabs.addEventListener('click', (e) => {
      const btn = e.target.closest('button.tab');
      if (!btn || !tabs.contains(btn)) return;
      e.preventDefault();

      const idx = controls.indexOf(btn);
      if (idx === -1 || idx === activeIndex) return;

      controls[activeIndex].classList.remove('active');
      panels[activeIndex].classList.remove('active');
      controls[idx].classList.add('active');
      panels[idx].classList.add('active');

      activeIndex = idx;
    });
  });
}