// News loading functionality
document.addEventListener('DOMContentLoaded', function() {
  // Load news on homepage
  if (document.getElementById('news-container')) {
    fetchTechNews();
    
    // Set up refresh button
    document.getElementById('refresh-news').addEventListener('click', function() {
      fetchTechNews();
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
});

async function fetchTechNews() {
  const container = document.getElementById('news-container')A;
  const refreshBtn = document.getElementById('refresh-news');
  
  if (!container) return;
  
  // Show loading state
  container.innerHTML = `
    <div class="col-md-8">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  
  refreshBtn.disabled = true;
  refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
  
  try {
    const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=3&_=' + Date.now());
    const data = await response.json();
    
    container.innerHTML = '';
    data.results.forEach(article => {
      const div = document.createElement('div');
      div.className = 'col-md-8 mb-4';
      div.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5>${article.title}</h5>
            <p class="text-muted mb-2"><small>${new Date(article.published_at).toLocaleDateString()}</small></p>
            <p>${article.summary}</p>
            <a href="${article.url}" target="_blank" class="btn btn-sm btn-outline-primary">Read More</a>
          </div>
        </div>`;
      container.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    container.innerHTML = `
      <div class="col-md-8">
        <div class="card">
          <div class="card-body text-center">
            <i class="fas fa-exclamation-triangle text-danger mb-3 fa-2x"></i>
            <p class="text-danger">Failed to load news updates.</p>
            <p>Here's some recent tech news instead:</p>
            <div class="text-start">
              <h5>AI is reshaping cloud computing</h5>
              <p>Automation and AI are transforming modern IT landscapes, with cloud providers integrating more AI services.</p>
              <a href="#" class="btn btn-sm btn-outline-primary">Read More</a>
            </div>
          </div>
        </div>
      </div>`;
  } finally {
    if (refreshBtn) {
      refreshBtn.disabled = false;
      refreshBtn.innerHTML = '<i class="fas fa-sync-alt me-2"></i>Refresh News';
    }
  }
}

// Form validation for contact page
if (document.getElementById('contact-form')) {
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! I will get back to you soon.');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message';
    }, 1500);
  });
}
