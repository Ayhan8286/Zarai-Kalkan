// ============================================
// ZARAI KALKAN — Knowledge & Training Center
// ============================================

import store from '../store.js';
import { renderBadge } from '../components/badge.js';
import { renderProgressBar } from '../components/progress-bar.js';
import { renderFilterBar } from '../components/filter-bar.js';
import { debounce, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export default function knowledgeCenterPage(container) {
  let searchQuery = '';
  let selectedCategory = 'all';

  const lessonsList = [
    { id: 'les_1', title: 'Winter Wheat Irrigation Scheduling', category: 'Farming', duration: '5 Mins', desc: 'Critical stages for watering wheat fields to maximize grain yield and save water.', content: 'Wheat requires 4-6 irrigations depending on soil and weather. The first irrigation is crucial at the Crown Root Initiation (CRI) stage, which occurs 20-25 days after sowing. Second watering is at Tillering (40-45 days), third at Jointing (70-75 days), fourth at Flowering (90-95 days), fifth at Milking (110-115 days), and sixth at Dough stage (120-125 days). Water deficit at flowering reduces grain setting, so maintain light irrigation if there is no rain.' },
    { id: 'les_2', title: 'Managing Locust Pest Attacks', category: 'Farming', duration: '8 Mins', desc: 'Early warning signs, protective smokes, and bio-friendly pesticide spraying guidelines.', content: 'Locust swarms are highly destructive to green crops. Keep inspecting fields early mornings. Swarms settle on vegetation at dusk. Coordinate community smoke screens using damp grass and neem oil at sunrise to deflect swarms. If locusts settle, spray approved pyrethroid pesticides like lambda-cyhalothrin at evening. Notify the agricultural department extension office immediately.' },
    { id: 'les_3', title: 'Basic Bookkeeping for Kiryana Shops', category: 'Business', duration: '6 Mins', desc: 'Simple record keeping methods to separate shop cash from personal household expenses.', content: 'Many rural shopkeepers fail because they mix personal and shop cash. Always maintain two separate cash boxes: one for Kiryana sales, and one for home expenses. Record every single credit (Khata) entry immediately. Take a weekly stock inventory of high-value items (oil, flour, tea, ghee) to calculate your operating profit margin. Aim for a 12% profit margin on groceries.' },
    { id: 'les_4', title: 'Marketing Handmade Embroidery Shawls', category: 'Crafts', duration: '7 Mins', desc: 'How to take mobile photos of crafts, write descriptions, and sell to city wholesalers.', content: 'City boutique buyers value authentic handmade Phulkari and Balochi embroidery. To sell online, place your shawl under natural indirect sunlight. Take 3 clean close-up photos focusing on stitch density. Measure dimensions in inches. Describe fabric base (pure cotton, khaddar, silk) and thread dyes. Join rural entrepreneur WhatsApp groups on Zarai Kalkan to connect with buyers directly.' },
    { id: 'les_5', title: 'Livestock Foot-and-Mouth Disease Prevention', category: 'Livestock', duration: '5 Mins', desc: 'Symptom checks, isolation protocols, and vaccine schedule for cows and goats.', content: 'Foot-and-Mouth Disease (FMD) is a highly infectious viral disease in cattle. Symptoms include high fever, blisters in mouth and on feet, and drooling. Isolate sick animals immediately in separate sheds. Disinfect floors with washing soda. Do not feed cattle infected milk. Vaccinate all healthy cows and goats twice a year (before summer and winter seasons) via veterinary extension officers.' },
    { id: 'les_6', title: 'Understanding Crop Insurance (Takaful)', category: 'Finance', duration: '4 Mins', desc: 'How Islamic shariah crop insurance works, how claims are verified, and how payouts are made.', content: 'Islamic Takaful operates on cooperative donation (Tabarru) principles. Farmers pool small monthly premiums into a fund. If weather damages crops, the loss is audited and payouts are distributed. Unlike conventional insurance, there is no interest (Riba) or gambling (Gharar). Keep crop sowing receipts and photographs of damaged fields safe to file claims within 48 hours of weather loss.' }
  ];

  function render() {
    const state = store.getState();
    const completed = state.completedLessons || [];

    // Filter lessons
    const filteredLessons = lessonsList.filter(l => {
      const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            l.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesCat = true;
      if (selectedCategory !== 'all') {
        matchesCat = l.category === selectedCategory;
      }

      return matchesSearch && matchesCat;
    });

    // Calculate progress
    const totalLessons = lessonsList.length;
    const completedCount = completed.length;
    const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    container.innerHTML = `
      <div class="knowledge-page animate-fade-in">
        <!-- Page Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">${t('navKnowledge') || 'Zarai Knowledge & Training Center'}</h2>
            <p class="text-xs text-muted">Read agronomist-verified lessons, animal care guides, and business growth tutorials offline.</p>
          </div>
        </div>

        <!-- Progress Tracking Card -->
        <div class="card mb-6" style="padding: var(--space-5); border-inline-start: 4px solid var(--color-primary);">
          <div class="flex justify-between items-center text-xs mb-2">
            <strong>Training Completion Progress: ${completedCount} / ${totalLessons} Lessons</strong>
            <span class="font-bold text-primary">${progressPct}% Completed</span>
          </div>
          ${renderProgressBar(progressPct)}
        </div>

        <!-- Filter and Search Bar -->
        <div class="card mb-6">
          <div class="card-body-full">
            ${renderFilterBar({
              searchPlaceholder: 'Search tutorials, farming stage guides, veterinary care...',
              searchValue: searchQuery,
              filters: [
                {
                  id: 'filter-knowledge-cat',
                  label: 'Category',
                  selected: selectedCategory,
                  options: [
                    { value: 'all', label: 'All Lessons' },
                    { value: 'Farming', label: '🌾 Crop Farming' },
                    { value: 'Livestock', label: '🐄 Livestock & Veterinary' },
                    { value: 'Business', label: '🏪 Shopkeeper Bookkeeping' },
                    { value: 'Crafts', label: '🧵 Handmade Crafts' },
                    { value: 'Finance', label: '🛡️ Financial Literacy' }
                  ]
                }
              ]
            })}

            <!-- Netflix style video/lesson card grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: var(--space-4); margin-top: var(--space-4);">
              ${filteredLessons.map(l => {
                const isCompleted = completed.includes(l.id);
                return `
                  <div class="card card-clickable" style="border: 1px solid var(--color-border-light); display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div class="card-body-full">
                      <div class="flex justify-between items-start mb-2">
                        <span class="badge badge-primary">${l.category}</span>
                        <span class="text-xs text-muted">⏱️ ${l.duration}</span>
                      </div>
                      
                      <h4 class="font-bold mb-2" style="font-size: var(--text-sm); line-height: 1.3;">${l.title}</h4>
                      <p class="text-xs text-muted mb-4" style="line-height: 1.4;">${l.desc}</p>
                    </div>

                    <div class="card-footer" style="padding: var(--space-3) var(--space-4); background: var(--color-bg-alt); align-items: center; justify-content: space-between;">
                      ${isCompleted 
                        ? `<span class="text-xs text-success" style="font-weight: bold;">✅ Completed</span>`
                        : `<span class="text-xs text-muted">Awaiting Reading</span>`
                      }
                      <button class="btn btn-outline btn-sm read-lesson-btn" data-id="${l.id}">Read Lesson</button>
                    </div>
                  </div>
                `;
              }).join('')}

              ${filteredLessons.length === 0 ? `
                <div class="empty-state" style="grid-column: 1 / -1; width: 100%;">
                  <div class="empty-state-title">No lessons found</div>
                  <p class="empty-state-text">No tutorials match your search query.</p>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    // Bindings
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        searchQuery = e.target.value;
        render();
      }, 300));
    }

    document.getElementById('filter-knowledge-cat')?.addEventListener('change', (e) => {
      selectedCategory = e.target.value;
      render();
    });

    container.querySelectorAll('.read-lesson-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const lesson = lessonsList.find(l => l.id === id);
        if (lesson) openLessonModal(lesson, completed.includes(id));
      });
    });
  }

  function openLessonModal(lesson, isAlreadyCompleted) {
    const content = `
      <div class="animate-fade-in">
        <div class="flex justify-between items-center mb-3">
          <span class="badge badge-primary">${lesson.category}</span>
          <span class="text-xs text-muted">Duration: ${lesson.duration}</span>
        </div>
        
        <div class="lesson-content-text" style="font-size: var(--text-sm); line-height: 1.6; color: var(--color-text-secondary); white-space: pre-wrap; margin-bottom: var(--space-5);">
          ${lesson.content}
        </div>

        <div class="modal-footer" style="padding: 0; border: none; justify-content: space-between; align-items: center;">
          ${isAlreadyCompleted 
            ? `<span></span>`
            : `<button class="btn btn-primary" id="btn-complete-lesson" style="background: var(--color-safe);">✔️ Mark as Completed</button>`
          }
          <button class="btn btn-secondary" onclick="closeModal()">Close Tutorial</button>
        </div>
      </div>
    `;

    openModal(lesson.title, content, { size: 'lg' });

    document.getElementById('btn-complete-lesson')?.addEventListener('click', () => {
      const state = store.getState();
      const completed = [...(state.completedLessons || [])];
      
      if (!completed.includes(lesson.id)) {
        completed.push(lesson.id);
        store.setState({ completedLessons: completed });
        showToast('Lesson marked as completed! 🏆', 'success');
      }
      
      closeModal();
      render();
    });
  }

  // Initial render
  render();
}
