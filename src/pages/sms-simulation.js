// ============================================
// ZARAI KALKAN — SMS Simulation Page
// ============================================

import { t } from '../i18n.js';
import { showToast } from '../components/toast.js';

export default function smsSimulationPage(container) {
  const smsFeeds = [
    {
      id: 'sms_1',
      sender: 'ZARAI KALKAN Weather',
      date: '13 Jun, 12:40 PM',
      initialMsg: 'Weather Alert!\nHeatwave Warning: Temp to cross 45C in Bahawalpur. High crop evaporation risk.\nReply:\n1 Irrigation Tip\n2 Insurance Info\n3 Call Advisor',
      options: {
        '1': 'Irrigation Tip: Water your crops between 4 AM - 7 AM only. Do not spray urea during heat peaks.',
        '2': 'Insurance Info: Crop insurance covers extreme heat stress losses. Submit reports within 48h.',
        '3': 'Call Advisor: Submitting call request. Your district advisor Khalid Mahmood will contact you.'
      }
    },
    {
      id: 'sms_2',
      sender: 'ZARAI KALKAN Pest Alert',
      date: '10 Jun, 09:15 AM',
      initialMsg: 'Urgent Locust Pest Swarm Warn in neighboring districts.\nReply:\n1 Pesticide spray tip\n2 Extension Office No\n3 Community Smoke tip',
      options: {
        '1': 'Pesticide spray tip: Spray Lambda-cyhalothrin at sunset when locusts settle on vegetation.',
        '2': 'Extension Office No: Call district office at 062-9250123 for pesticide stock assistance.',
        '3': 'Community Smoke tip: Light organic damp grass fires on borders to prevent swarm landing.'
      }
    },
    {
      id: 'sms_3',
      sender: 'ZARAI KALKAN Insurance',
      date: '08 Jun, 04:30 PM',
      initialMsg: 'Sponsorship Grant Received!\nNGO Al Noor has funded your Kharif Crop Takaful Policy.\nReply:\n1 View Policy Cover\n2 Claim Instructions',
      options: {
        '1': 'View Policy Cover: Your policy ZK-CRP-99882 is ACTIVE. Total coverage: Rs. 100,000.',
        '2': 'Claim Instructions: In case of heavy rains, take photos of damage and file claim on portal.'
      }
    }
  ];

  let selectedFeedIndex = 0;
  let activeScreenState = 'normal'; // 'normal', 'replying', 'replied'
  let activeReplyText = '';

  function render() {
    const feed = smsFeeds[selectedFeedIndex];

    container.innerHTML = `
      <div class="sms-simulation-page animate-fade-in">
        <!-- Page Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">${t('navSMS') || 'Offline SMS Advisory Simulation'}</h2>
            <p class="text-xs text-muted">Simulate the Zarai Kalkan offline SMS feature for low-internet button phones used by rural farmers.</p>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <!-- Feed Selector Panel -->
          <div class="card col-span-1">
            <div class="card-header">
              <h3 class="card-header-title">Incoming SMS Warnings</h3>
            </div>
            <div class="card-body-full" style="padding: 0 var(--space-4) var(--space-4);">
              <div class="flex flex-col gap-2">
                ${smsFeeds.map((f, idx) => `
                  <div class="card card-clickable sms-feed-item" data-idx="${idx}" style="padding: var(--space-3); border: 1.5px solid ${idx === selectedFeedIndex ? 'var(--color-primary)' : 'var(--color-border)'}; background: ${idx === selectedFeedIndex ? 'var(--color-primary-bg)' : 'transparent'};">
                    <div class="flex justify-between items-center text-xs">
                      <strong>${f.sender}</strong>
                      <span class="text-muted" style="font-size: 10px;">${f.date.split(',')[0]}</span>
                    </div>
                    <p class="text-xs truncate mt-1 text-muted">${f.initialMsg.split('\n')[1]}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Phone Simulator Frame -->
          <div class="col-span-2 flex flex-col items-center">
            <div class="sms-phone animate-scale-in" style="box-shadow: 0 20px 50px rgba(0,0,0,0.3); border: 8px solid #3A3D52;">
              <!-- Phone Screen -->
              <div class="sms-screen" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div class="sms-header-text">${feed.sender}</div>
                  
                  ${activeScreenState === 'normal' ? `
                    <div class="sms-message" style="white-space: pre-wrap;">${feed.initialMsg}</div>
                  ` : ''}

                  ${activeScreenState === 'replying' ? `
                    <div class="sms-message" style="white-space: pre-wrap;">${feed.initialMsg}</div>
                    <div style="border-top: 1px solid #1A3A5C; padding-top: 8px; margin-top: 8px; color: #00FF41;">
                      <span style="color: #00BFFF;">Sending:</span> "${activeReplyText}"
                    </div>
                  ` : ''}

                  ${activeScreenState === 'replied' ? `
                    <div style="color: #6B7280; font-size: 11px; margin-bottom: 8px;">Reply sent: "${activeReplyText}"</div>
                    <div class="sms-message" style="color: #00FF41; white-space: pre-wrap; background: rgba(0, 255, 65, 0.08); padding: var(--space-3); border-radius: var(--radius-md); border: 1px dashed rgba(0, 255, 65, 0.3);">
                      ${feed.options[activeReplyText] || 'Error: Invalid option code reply.'}
                    </div>
                  ` : ''}
                </div>

                <div class="flex justify-between items-center text-xs" style="border-top: 1px solid #1A3A5C; padding-top: var(--space-2); color: #00BFFF; font-weight: bold;">
                  <span id="btn-phone-back" style="cursor: pointer;">⬅️ Back</span>
                  <span style="opacity:0.7;">SMS Mode</span>
                  <span id="btn-phone-reset" style="cursor: pointer;">🔄 Clear</span>
                </div>
              </div>

              <!-- Keypad Buttons -->
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 16px; padding: 0 8px;">
                ${['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(key => `
                  <button class="btn btn-secondary phone-key-btn" data-key="${key}" style="background: #2D3142; border: 1px solid #3F445C; color: white; border-radius: var(--radius-md); font-weight: bold; font-size: var(--text-base); padding: var(--space-2) 0;">
                    ${key}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event Bindings
    container.querySelectorAll('.sms-feed-item').forEach(item => {
      item.addEventListener('click', () => {
        selectedFeedIndex = parseInt(item.getAttribute('data-idx'));
        activeScreenState = 'normal';
        activeReplyText = '';
        render();
      });
    });

    document.getElementById('btn-phone-back')?.addEventListener('click', () => {
      activeScreenState = 'normal';
      activeReplyText = '';
      render();
    });

    document.getElementById('btn-phone-reset')?.addEventListener('click', () => {
      activeScreenState = 'normal';
      activeReplyText = '';
      showToast('Simulation cleared', 'info');
      render();
    });

    // Keypad presses
    container.querySelectorAll('.phone-key-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        
        if (activeScreenState === 'normal') {
          activeReplyText = key;
          activeScreenState = 'replying';
          render();
          
          // Simulate network delay
          setTimeout(() => {
            activeScreenState = 'replied';
            showToast('SMS message response received', 'success');
            render();
          }, 800);
        } else if (activeScreenState === 'replying' || activeScreenState === 'replied') {
          showToast('Press Back or Reset first to send another response', 'warning');
        }
      });
    });
  }

  render();
}
