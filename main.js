async function fetchTechNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = '<p class="text-center">Loading news...</p>';
    try {
        const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=5&_=' + Date.now());
        const data = await response.json();
        container.innerHTML = '';
        data.results.forEach(article => {
            const div = document.createElement('div');
            div.className = 'col-md-8 mb-3';
            div.innerHTML = `
                <div class="card"><div class="card-body">
                <h5>${article.title}</h5>
                <p>${article.summary}</p>
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">Read more</a>
                </div></div>`;
            container.appendChild(div);
        });
    } catch {
        container.innerHTML = '<p class="text-center text-danger">Failed to load news. Showing fallback.</p>';
        container.innerHTML += `
            <div class="col-md-8 mb-3">
                <div class="card"><div class="card-body">
                <h5>AI is reshaping cloud computing</h5>
                <p>Automation and AI are transforming modern IT landscapes.</p>
                </div></div>
            </div>`;
    }
}

if (document.getElementById('news-container')) {
    fetchTechNews();
}