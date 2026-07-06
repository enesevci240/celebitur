/**
 * Çelebi Turizm — Turlar Sekme Mantığı
 */

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tour-tab');
  const contents = document.querySelectorAll('.tour-content');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const content = document.getElementById(target);
      if (content) content.classList.add('active');
    });
  });
});
