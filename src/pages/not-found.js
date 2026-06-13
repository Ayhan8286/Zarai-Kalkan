// ============================================
// ZARAI KALKAN — 404 Not Found Page
// ============================================

export default function notFound(container) {
  container.innerHTML = `
    <div class="empty-state" style="min-height: 60vh;">
      <div style="font-size: 4rem; margin-bottom: var(--space-4);">🌾</div>
      <h1 class="empty-state-title" style="font-size: var(--text-3xl);">404 — Page Not Found</h1>
      <p class="empty-state-text" style="margin-bottom: var(--space-6);">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" class="btn btn-primary" data-navigo>
        ← Back to Home
      </a>
    </div>
  `;
}
