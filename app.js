function addMinutes(timeStr, minAdd) {
  const [h, m] = timeStr.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m + minAdd);
  return d.toTimeString().slice(0,5);
}

function minutesBetween(t1, t2) {
  const [h1, m1] = t1.split(':').map(Number);
  const [h2, m2] = t2.split(':').map(Number);
  return (h2 * 60 + m2) - (h1 * 60 + m1);
}

function calcolaTarget() {
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
         + `– Prima batteria stacca a <b>${t1}</b><br>`
         + `– Seconda batteria stacca a <b>${t2}</b><br><br>`;
  });
  out.innerHTML = html;
}

function calcolaTempo() {
  const t0 = document.getElementById('startTime2').value;
  const tEnd = document.getElementById('endTime').value;
  const p0 = parseFloat(document.getElementById('startPercent2').value);
  const out = document.getElementById('result');
  if (!t0 || !tEnd || isNaN(p0)) return out.textContent = 'Compila tutti i campi';

  const totMin = minutesBetween(t0, tEnd);
  const perBatteria = Math.floor(totMin / 2);
  const incremento = perBatteria / 60 * 20;
  const finale = Math.round((p0 + incremento) * 10) / 10;

  const cambio = addMinutes(t0, perBatteria);

  out.innerHTML =
    `<strong>Tempo disponibile:</strong> ${totMin} minuti<br>` +
    `– Carica prima batteria fino alle <b>${cambio}</b><br>` +
    `– Poi carica la seconda fino alle <b>${tEnd}</b><br><br>` +
    `⚡ Entrambe arriveranno a circa <b>${finale}%</b>`;
}

document.getElementById('mode').addEventListener('change', (e) => {
  document.getElementById('form-target').style.display = e.target.value === 'target' ? 'block' : 'none';
  document.getElementById('form-tempo').style.display = e.target.value === 'tempo' ? 'block' : 'none';
});
