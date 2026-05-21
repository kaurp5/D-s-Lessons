async function loadLessons() {
  const lessonList = document.getElementById('lesson-list');
  const template = document.getElementById('lesson-card-template');

  try {
    const response = await fetch('content/lessons/index.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to load lessons');

    const lessons = await response.json();

    if (!Array.isArray(lessons) || lessons.length === 0) {
      lessonList.innerHTML = '<div class="empty-state">No lessons yet. Use the “Add a lesson” button to create the first page.</div>';
      return;
    }

    lessons
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .forEach((lesson) => {
        const node = template.content.cloneNode(true);
        node.querySelector('.lesson-meta').textContent = new Date(lesson.date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const link = node.querySelector('.lesson-link');
        link.textContent = lesson.title;
        link.href = lesson.path;
        node.querySelector('.lesson-summary').textContent = lesson.summary;
        lessonList.appendChild(node);
      });
  } catch (error) {
    lessonList.innerHTML = '<div class="empty-state">The lesson archive is not available yet. Once the first lesson is published, it will appear here.</div>';
  }
}

loadLessons();
