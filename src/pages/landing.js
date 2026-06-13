// ============================================
// ZARAI KALKAN — Landing Page
// Role selection with beautiful hero design
// ============================================

import { t } from '../i18n.js';

export default function landing(container) {
  container.innerHTML = `
    <div class="landing-page">
      <div class="landing-hero">
        <div class="landing-hero-bg"></div>
        <div class="landing-content">
          <div class="landing-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="landing-logo-svg">
              <path d="M32 4 L56 16 L56 36 Q56 52 32 60 Q8 52 8 36 L8 16 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
              <path d="M32 8 L52 18 L52 35 Q52 49 32 56 Q12 49 12 35 L12 18 Z" fill="#4CAF50" opacity="0.3"/>
              <ellipse cx="32" cy="20" rx="3.5" ry="7" fill="#F9A825"/>
              <ellipse cx="26" cy="24" rx="3" ry="6" fill="#F9A825" transform="rotate(-15 26 24)"/>
              <ellipse cx="38" cy="24" rx="3" ry="6" fill="#F9A825" transform="rotate(15 38 24)"/>
              <line x1="32" y1="20" x2="32" y2="48" stroke="#8D6E63" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M32 36 Q26 32 24 36" fill="none" stroke="#2E7D32" stroke-width="1.5"/>
              <path d="M32 36 Q38 32 40 36" fill="none" stroke="#2E7D32" stroke-width="1.5"/>
              <path d="M32 42 Q27 38 25 42" fill="none" stroke="#2E7D32" stroke-width="1.5"/>
              <path d="M32 42 Q37 38 39 42" fill="none" stroke="#2E7D32" stroke-width="1.5"/>
            </svg>
          </div>
          <h1 class="landing-title">${t('appName')}</h1>
          <p class="landing-urdu-title">زرعی کلکن</p>
          <p class="landing-subtitle">${t('appSubtitle')}</p>

          <div class="landing-features">
            <div class="landing-feature">
              <span class="landing-feature-icon">🛡️</span>
              <span>Financial Protection</span>
            </div>
            <div class="landing-feature">
              <span class="landing-feature-icon">📒</span>
              <span>Smart Accounting</span>
            </div>
            <div class="landing-feature">
              <span class="landing-feature-icon">🌦️</span>
              <span>Weather Alerts</span>
            </div>
            <div class="landing-feature">
              <span class="landing-feature-icon">🤝</span>
              <span>Community Support</span>
            </div>
          </div>

          <h2 class="landing-select-title">${t('selectRole')}</h2>

          <div class="landing-roles">
            <button class="landing-role-card" onclick="selectRole('farmer')">
              <div class="landing-role-icon">🌾</div>
              <div class="landing-role-name">${t('farmer')}</div>
              <div class="landing-role-desc">Crops, livestock, dairy farming</div>
              <div class="landing-role-urdu">کسان</div>
            </button>

            <button class="landing-role-card" onclick="selectRole('shopkeeper')">
              <div class="landing-role-icon">🏪</div>
              <div class="landing-role-name">${t('shopkeeper')}</div>
              <div class="landing-role-desc">Kiryana stores, vendors, traders</div>
              <div class="landing-role-urdu">دکاندار</div>
            </button>

            <button class="landing-role-card" onclick="selectRole('women')">
              <div class="landing-role-icon women-icon">👩‍💼</div>
              <div class="landing-role-name">${t('womenEntrepreneur')}</div>
              <div class="landing-role-desc">Home business, handicrafts, embroidery</div>
              <div class="landing-role-urdu">خاتون کاروباری</div>
            </button>

            <button class="landing-role-card" onclick="selectRole('ngo')">
              <div class="landing-role-icon">🏛️</div>
              <div class="landing-role-name">${t('ngo')}</div>
              <div class="landing-role-desc">Welfare organizations, donors</div>
              <div class="landing-role-urdu">این جی او</div>
            </button>

            <button class="landing-role-card" onclick="selectRole('admin')">
              <div class="landing-role-icon">⚙️</div>
              <div class="landing-role-name">${t('admin')}</div>
              <div class="landing-role-desc">Platform management & monitoring</div>
              <div class="landing-role-urdu">ایڈمنسٹریٹر</div>
            </button>
          </div>

          <div class="landing-footer">
            <p class="landing-disclaimer">
              ⚠️ This is a prototype/demo project for educational purposes. No real transactions, insurance, loans, or donations are processed.
            </p>
            <div class="landing-tech">
              <span>Built with</span>
              <span class="landing-tech-badge">Vite</span>
              <span class="landing-tech-badge">Vanilla JS</span>
              <span class="landing-tech-badge">Chart.js</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .landing-page {
        min-height: 100vh;
        background: linear-gradient(180deg, #F7F9F8 0%, #E8F5E9 100%);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .landing-hero {
        width: 100%;
        max-width: 900px;
        padding: 3rem 1.5rem;
        position: relative;
      }

      .landing-content {
        text-align: center;
        position: relative;
        z-index: 1;
      }

      .landing-logo-svg {
        width: 80px;
        height: 80px;
        margin: 0 auto;
        filter: drop-shadow(0 4px 12px rgba(46, 125, 50, 0.3));
        animation: fadeInUp 0.6s ease;
      }

      .landing-title {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--color-primary);
        margin: 1rem 0 0.25rem;
        animation: fadeInUp 0.6s ease 0.1s backwards;
      }

      .landing-urdu-title {
        font-family: var(--font-urdu);
        font-size: 1.8rem;
        color: var(--color-primary-dark);
        margin-bottom: 0.5rem;
        direction: rtl;
        animation: fadeInUp 0.6s ease 0.15s backwards;
      }

      .landing-subtitle {
        font-size: 1rem;
        color: var(--color-text-muted);
        margin-bottom: 2rem;
        animation: fadeInUp 0.6s ease 0.2s backwards;
      }

      .landing-features {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        flex-wrap: wrap;
        margin-bottom: 2.5rem;
        animation: fadeInUp 0.6s ease 0.25s backwards;
      }

      .landing-feature {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        color: var(--color-text-secondary);
        font-weight: 500;
      }

      .landing-feature-icon {
        font-size: 1.2rem;
      }

      .landing-select-title {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--color-text);
        margin-bottom: 1.5rem;
        animation: fadeInUp 0.6s ease 0.3s backwards;
      }

      .landing-roles {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        max-width: 820px;
        margin: 0 auto 2.5rem;
        animation: fadeInUp 0.6s ease 0.35s backwards;
      }

      .landing-role-card {
        background: white;
        border: 2px solid var(--color-border);
        border-radius: var(--radius-xl);
        padding: 1.5rem 1rem;
        cursor: pointer;
        transition: all 0.25s ease;
        text-align: center;
        font-family: inherit;
        position: relative;
        overflow: hidden;
      }

      .landing-role-card:hover {
        border-color: var(--color-primary);
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(46, 125, 50, 0.15);
      }

      .landing-role-card:active {
        transform: translateY(-2px) scale(0.98);
      }

      .landing-role-icon {
        font-size: 2.5rem;
        margin-bottom: 0.75rem;
        display: block;
      }

      .landing-role-name {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--color-text);
        margin-bottom: 0.25rem;
      }

      .landing-role-desc {
        font-size: 0.7rem;
        color: var(--color-text-muted);
        margin-bottom: 0.5rem;
        line-height: 1.4;
      }

      .landing-role-urdu {
        font-family: var(--font-urdu);
        font-size: 0.95rem;
        color: var(--color-primary);
        direction: rtl;
      }

      .landing-footer {
        animation: fadeIn 0.6s ease 0.5s backwards;
      }

      .landing-disclaimer {
        font-size: 0.75rem;
        color: var(--color-text-light);
        max-width: 600px;
        margin: 0 auto 1rem;
        line-height: 1.5;
        padding: 0.75rem 1rem;
        background: var(--color-warning-bg);
        border-radius: var(--radius-md);
        border: 1px solid rgba(255, 193, 7, 0.2);
      }

      .landing-tech {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        color: var(--color-text-light);
      }

      .landing-tech-badge {
        background: var(--color-bg-alt);
        padding: 2px 8px;
        border-radius: var(--radius-sm);
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--color-text-muted);
      }

      @media (max-width: 600px) {
        .landing-title { font-size: 1.8rem; }
        .landing-urdu-title { font-size: 1.4rem; }
        .landing-roles { grid-template-columns: repeat(2, 1fr); }
        .landing-features { gap: 1rem; }
      }
    </style>
  `;
}
