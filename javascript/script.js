window.addEventListener('load', () => {
    setInterval(() => {
        const date = new Date();
        const displayDate = date.toLocaleDateString();
        const displayTime = date.toLocaleTimeString();
        document.getElementById('datetime').innerHTML = displayDate + " " + displayTime;
    }, 1000);
});

window.addEventListener('load', () => {
    fetch('/ymisty/javascript/quotes.json')
    .then(response => {
        if (!response.ok) throw new Error('HTTP status ' + response.status);
        return response.json();
    })
    .then(data => {
        const quotes = data.quotes;
        if (!quotes || !quotes.length) throw new Error('No quotes found');
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        document.getElementById('quote').innerHTML = `
            <q>${randomQuote.quote}</q><br>
            <em>— ${randomQuote.author}, <strong>${randomQuote.source}</strong></em>
        `;
    })
    .catch(err => {
        console.error('Error fetching quotes:', err);
        document.getElementById('quote').innerHTML = 'Failed to load quote.';
    });
});


window.addEventListener('load', () => {
    if (window.location.pathname.endsWith('fotos.html')) {
        fetch('../img/fotos/images.json')
        .then(response => {
            if (!response.ok) throw new Error('HTTP status ' + response.status);
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('.portrait');
            data.images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = "";
                img.style.maxWidth = '100%';
                img.style.margin = '5px 0';
                container.appendChild(img);
                container.appendChild(document.createElement('br'));
            });
        })
        .catch(error => console.error('Error loading images:', error));
    }
});
