// ============================================
// ZARAI KALKAN — Weather & Emergency Dashboard
// ============================================

import { renderRiskMeter } from '../components/risk-meter.js';
import { formatShortDate, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { showToast } from '../components/toast.js';

export default function weatherPage(container) {
  // Demo weather data
  const weatherData = {
    temp: '37°C',
    humidity: '52%',
    windSpeed: '12 km/h',
    rainChance: '10%',
    location: 'Bahawalpur',
    updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    alerts: [
      { id: 'al_1', date: '2026-06-13', title: 'Severe Heatwave Alert', level: 'yellow', description: 'Temperature expected to cross 45°C. Water evaporation rate is high. Irrigate crops in early morning hours.', tips: ['Water crops between 4 AM - 7 AM', 'Apply organic mulch to retain soil moisture', 'Provide shade for cattle under ventilated sheds'] },
      { id: 'al_2', date: '2026-06-08', title: 'Locust Pest Threat Warn', level: 'red', description: 'Swarms sighted in adjacent districts. Crop inspection recommended every 12 hours.', tips: ['Check leaves underside for eggs/larvae', 'Notify agricultural department extension office', 'Coordinate community smoke screens at dawn'] },
      { id: 'al_3', date: '2026-05-24', title: 'Heavy Rainfall & Gusty Winds', level: 'yellow', description: 'Thunderstorm expected within 48 hours. Clear drainage channels to prevent waterlogging.', tips: ['Clear silt and debris from main drains', 'Delay fertilizer spraying by 3 days', 'Secure harvest stacks under tarpaulin sheets'] },
      { id: 'al_4', date: '2026-05-15', title: 'Normal Agronomic Conditions', level: 'green', description: 'Weather conditions within seasonal baseline. Ideal time for wheat fertilizer application.', tips: ['Ideal temperature for urea absorption', 'Monitor soil nitrogen level', 'No crop damage risk reported'] }
    ]
  };

  let activeAlert = weatherData.alerts[0]; // Default to heatwave

  function render() {
    const meterLevel = activeAlert.level;
    const meterValue = activeAlert.level === 'green' ? 'SAFE' : (activeAlert.level === 'yellow' ? 'WARNING' : 'DANGER');

    container.innerHTML = `
      <div class="weather-page animate-fade-in">
        <!-- Page Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">${t('navWeather') || 'Weather & Emergency Warning'}</h2>
            <p class="text-xs text-muted">Real-time local forecasts, agricultural crop safety advisories, and pest warnings.</p>
          </div>
          <span class="badge badge-success badge-dot">Live Area: ${weatherData.location}</span>
        </div>

        <div class="grid grid-cols-3 gap-6 mb-6">
          <!-- Current Weather Card -->
          <div class="card col-span-2" style="background: linear-gradient(135deg, #134e5e 0%, #71b280 100%); color: white; display: flex; flex-direction: column; justify-content: space-between; padding: var(--space-6);">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold" style="font-size: var(--text-lg); color: white;">Current Climate Conditions</h3>
                <p class="text-xs opacity-75">Bahawalpur Region • Updated at ${weatherData.updatedAt}</p>
              </div>
              <span style="font-size: 3.5rem;">☀️</span>
            </div>
            
            <div class="flex items-baseline gap-2" style="margin: var(--space-6) 0;">
              <h1 class="font-bold" style="font-size: 4rem; line-height: 1; color: white;">${weatherData.temp}</h1>
              <span style="font-size: var(--text-lg); opacity: 0.85;">Sunny Sky</span>
            </div>

            <div class="grid grid-cols-4 gap-4 text-center" style="background: rgba(255, 255, 255, 0.12); padding: var(--space-4); border-radius: var(--radius-xl); backdrop-filter: blur(10px);">
              <div>
                <div class="text-xs opacity-80">Humidity</div>
                <div class="font-bold" style="font-size: var(--text-base);">${weatherData.humidity}</div>
              </div>
              <div>
                <div class="text-xs opacity-80">Wind Speed</div>
                <div class="font-bold" style="font-size: var(--text-base);">${weatherData.windSpeed}</div>
              </div>
              <div>
                <div class="text-xs opacity-80">Rain Probability</div>
                <div class="font-bold" style="font-size: var(--text-base);">${weatherData.rainChance}</div>
              </div>
              <div>
                <div class="text-xs opacity-80">UV Index</div>
                <div class="font-bold" style="font-size: var(--text-base);">9 (Extreme)</div>
              </div>
            </div>
          </div>

          <!-- Risk Meter Card -->
          <div class="card flex flex-col items-center justify-center text-center" style="padding: var(--space-6);">
            <h4 class="font-bold mb-4" style="font-size: var(--text-sm);">Current Agricultural Risk</h4>
            
            ${renderRiskMeter(meterLevel, 'Status', meterValue)}

            <div class="flex gap-4 mt-6 text-xs" style="font-size: 10px;">
              <span class="flex items-center gap-1">🟢 Safe</span>
              <span class="flex items-center gap-1">🟡 Warning</span>
              <span class="flex items-center gap-1">🔴 Danger</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <!-- Alert Timeline -->
          <div class="card col-span-2">
            <div class="card-header">
              <h3 class="card-header-title">Advisory & Warnings History</h3>
            </div>
            <div class="card-body-full" style="padding: 0 var(--space-6) var(--space-6);">
              <div class="timeline" style="padding-inline-start: var(--space-2);">
                ${weatherData.alerts.map(a => {
                  const isActive = a.id === activeAlert.id;
                  const dotColor = a.level === 'green' ? '' : (a.level === 'yellow' ? 'warning' : 'danger');
                  return `
                    <div class="timeline-item alert-timeline-item" data-id="${a.id}" style="cursor: pointer; padding: var(--space-4); border-radius: var(--radius-lg); background: ${isActive ? 'var(--color-bg)' : 'transparent'}; transition: background var(--transition-fast);">
                      <div class="timeline-marker">
                        <div class="timeline-dot ${dotColor}"></div>
                        <div class="timeline-line"></div>
                      </div>
                      <div class="timeline-content">
                        <div class="flex justify-between items-center">
                          <h4 class="timeline-title font-bold" style="color: ${isActive ? 'var(--color-primary-dark)' : 'var(--color-text)'};">${a.title}</h4>
                          <span class="text-xs text-muted">${formatShortDate(a.date)}</span>
                        </div>
                        <p class="timeline-description text-xs mt-1" style="line-height: 1.5; color: var(--color-text-secondary);">${a.description}</p>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Emergency Crop Tips & SMS simulation -->
          <div class="flex flex-col gap-6">
            <!-- Crop Tips -->
            <div class="card" style="border: 1px solid var(--color-border-light);">
              <div class="card-header" style="background: var(--color-bg-alt); padding: var(--space-3) var(--space-5);">
                <h4 class="font-bold text-xs text-primary">Agronomist Tips: ${activeAlert.title}</h4>
              </div>
              <div class="card-body">
                <ul class="flex flex-col gap-3" style="list-style: none; padding: 0; font-size: var(--text-xs); color: var(--color-text-secondary);">
                  ${activeAlert.tips.map(tip => `
                    <li style="display: flex; gap: 8px; align-items: flex-start;">
                      <span style="font-size: var(--text-sm); line-height: 1;">📝</span>
                      <span>${tip}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            <!-- SMS Simulation Card -->
            <div class="card" style="padding: var(--space-4); border: 1px solid var(--color-border-light);">
              <h4 class="font-bold text-xs mb-3 text-center">Interactive SMS Advisory Alert</h4>
              <div class="sms-phone">
                <div class="sms-screen">
                  <div class="sms-header-text">ZARAI KALKAN SMS</div>
                  <div class="sms-message">
                    <strong>Weather Alert!</strong><br>
                    Level: ${activeAlert.level.toUpperCase()}<br>
                    ${activeAlert.title}<br>
                    Reply:<br>
                    <span class="sms-option" id="sms-opt-details">1 Details</span><br>
                    <span class="sms-option" id="sms-opt-insurance">2 Insurance</span><br>
                    <span class="sms-option" id="sms-opt-help">3 Support Help</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Click alert history to change tips
    container.querySelectorAll('.alert-timeline-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        activeAlert = weatherData.alerts.find(a => a.id === id);
        render();
      });
    });

    // SMS Options
    document.getElementById('sms-opt-details')?.addEventListener('click', () => {
      showToast(`SMS Reply Sent: "1". Response: ${activeAlert.description}`, 'info');
    });

    document.getElementById('sms-opt-insurance')?.addEventListener('click', () => {
      showToast('SMS Reply Sent: "2". Response: Crop insurance cover protects against this threat. Apply claim on dashboard.', 'info');
    });

    document.getElementById('sms-opt-help')?.addEventListener('click', () => {
      showToast('SMS Reply Sent: "3". Response: Request support help. District agronomist will call you shortly.', 'info');
    });
  }

  render();
}
