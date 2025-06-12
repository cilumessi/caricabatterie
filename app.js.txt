function addMinutes(timeStr, minAdd) {
  const [h, m] = timeStr.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m + minAdd);
  return d.toTimeString().slice(0,5);
}

function calcola() {
  const t0 = document.getElementById('startTime').value;
  const p0 = parseFloat(document.getElementById('startPercent').value);
  const out = document.getElementById('result');
  if(!t0 || isNaN(p0)) return out.textContent = 'Compila tutti i campi';

  let html = '';
  [50, 90, 100].forEach(target => {
    const delta = target - p0;
    const minuti = delta / 20 * 60;
    const t1 = addMinutes(t0, minuti);
    const t2 = addMinutes(t1, minuti);
    html += `<strong>${target}%:</strong><br>`
         + `– Prima batteria staccare a <b>${t1}</b><br>`
         + `– Seconda batteria staccare a <b>${t2}</b><br><br>`;
  });
  out.innerHTML = html;
}
