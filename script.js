// Login Credentials
const validCredentials = {
    username: "1",
    password: "1"
};

// Crypto data with logos
const cryptoData = [
    { symbol: "BTC", name: "Bitcoin", logo: "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400", price: 0, change: 0 },
    { symbol: "ETH", name: "Ethereum", logo: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628", price: 0, change: 0 },
    { symbol: "BNB", name: "Binance Coin", logo: "https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970", price: 0, change: 0 },
    { symbol: "XRP", name: "XRP", logo: "https://assets.coingecko.com/coins/images/44/standard/xrp-symbol-white-128.png?1696501442", price: 0, change: 0 },
    { symbol: "SOL", name: "Solana", logo: "https://assets.coingecko.com/coins/images/4128/standard/solana.png?1718769756", price: 0, change: 0 },
    { symbol: "ADA", name: "Cardano", logo: "https://assets.coingecko.com/coins/images/975/standard/cardano.png?1696502090", price: 0, change: 0 },
    { symbol: "DOGE", name: "Dogecoin", logo: "https://assets.coingecko.com/coins/images/5/standard/dogecoin.png?1696501409", price: 0, change: 0 },
    { symbol: "DOT", name: "Polkadot", logo: "https://static.coingecko.com/s/polkadot-73b0c058cae10a2f076a82dcade5cbe38601fad05d5e6211188f09eb96fa4617.gif", price: 0, change: 0 },
    { symbol: "SHIB", name: "Shiba Inu", logo: "https://assets.coingecko.com/coins/images/11939/standard/shiba.png?1696511800", price: 0, change: 0 },
    { symbol: "AVAX", name: "Avalanche", logo: "https://assets.coingecko.com/coins/images/12559/standard/Avalanche_Circle_RedWhite_Trans.png?1696512369", price: 0, change: 0 },
    { symbol: "MATIC", name: "Polygon", logo: "https://assets.coingecko.com/coins/images/4713/standard/polygon.png?1698233745", price: 0, change: 0 },
    { symbol: "LTC", name: "Litecoin", logo: "https://assets.coingecko.com/coins/images/2/standard/litecoin.png?1696501400", price: 0, change: 0 }
];

// News data
const newsData = [
    {
        title: "Stablecoin Transactions Surpass Visa—Experts Warn of 'Redemption Pressure'",
        summary: "Experts say stablecoins are rapidly growing, with Bitwise reporting their 2024 transaction volume surpassed Visa’s. However, DWF Labs’ Andrei Grachev warns of systemic risks like redemption pressure and reserve management.",
        url: "https://news.bitcoin.com/stablecoin-transactions-surpass-visa-experts-warn-of-redemption-pressure/"
    },
    {
        title: "Strategy's Treasury Hauls $5.1B in Bitcoin Gains, Michael Saylor Reveals",
        summary: "Strategy’s powerhouse bitcoin strategy has unleashed a jaw-dropping $5.1 billion gain so far this year, electrifying investors and cementing its dominance as the ultimate bitcoin treasury titan.",
        url: "https://news.bitcoin.com/strategys-treasury-hauls-5-1b-in-bitcoin-gains-michael-saylor-reveals/"
    },
    {
        title: "US Regulators Crack Down on Crypto Exchanges",
        summary: "Several major crypto exchanges have received warnings from US regulators about compliance issues.",
        url: "https://www.bitcoin.com/news/us-regulators-crypto-crackdown"
    },
    {
        title: "Stablecoin Market Cap Approaches $150 Billion",
        summary: "The total market capitalization of stablecoins continues to grow despite market volatility.",
        url: "https://www.bitcoin.com/news/stablecoin-market-cap-growth"
    }
];

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginPage = document.getElementById('login-page');
const walletPage = document.getElementById('wallet-page');
const transactionPage = document.getElementById('transaction-page');
const usernameDisplay = document.getElementById('username-display');
const usernameDisplayTx = document.getElementById('username-display-tx');
const logoutBtn = document.getElementById('logout-btn');
const logoutBtnTx = document.getElementById('logout-btn-tx');
const sendBtn = document.getElementById('send-btn');
const receiveBtn = document.getElementById('receive-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const sendModal = document.getElementById('send-modal');
const receiveModal = document.getElementById('receive-modal');
const withdrawModal = document.getElementById('withdraw-modal');
const loadingModal = document.getElementById('loading-modal');
const sendForm = document.getElementById('send-form');
const withdrawForm = document.getElementById('withdraw-form');
const confirmFeeBtn = document.getElementById('confirm-fee-btn');
const closeBtns = document.querySelectorAll('.close-btn');
const cryptoListLogin = document.getElementById('crypto-list-login');
const cryptoTicker = document.getElementById('crypto-ticker');
const newsList = document.getElementById('news-list');
const txAmount = document.getElementById('tx-amount');
const txAddress = document.getElementById('tx-address');
const txId = document.getElementById('tx-id');
const txTotal = document.getElementById('tx-total');
const backToWalletBtn = document.getElementById('back-to-wallet');
const globalLoader = document.getElementById('global-loader');
const maxButtons = document.querySelectorAll('.max-btn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Show global loader initially
    setTimeout(() => {
        globalLoader.style.opacity = '0';
        setTimeout(() => {
            globalLoader.style.display = 'none';
            loginPage.classList.add('active');
        }, 1000);
    }, 5000);
    
    // Load crypto prices
    fetchCryptoPrices();
    
    // Display news
    displayNews();
    
    // Event listeners
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    logoutBtnTx.addEventListener('click', handleLogout);
    sendBtn.addEventListener('click', () => toggleModal(sendModal));
    receiveBtn.addEventListener('click', () => toggleModal(receiveModal));
    withdrawBtn.addEventListener('click', () => toggleModal(withdrawModal));
    sendForm.addEventListener('submit', handleSend);
    withdrawForm.addEventListener('submit', handleWithdraw);
    confirmFeeBtn.addEventListener('click', handleConfirmFee);
    backToWalletBtn.addEventListener('click', () => navigateTo(walletPage));
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            toggleModal(modal);
        });
    });
    
    maxButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            input.value = '9650.00';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            toggleModal(e.target);
        }
    });
});

// Toggle modal visibility with animation
function toggleModal(modal) {
    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
    } else {
        modal.classList.add('active');
    }
}

// Handle login with page transition
function handleLogin(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    if (username === validCredentials.username && password === validCredentials.password) {
        // Show loading transition
        showLoader(() => {
            // Successful login
            usernameDisplay.textContent = username;
            usernameDisplayTx.textContent = username;
            loginPage.classList.remove('active');
            walletPage.classList.add('active');
        });
    } else {
        // Shake animation for invalid login
        loginForm.classList.add('shake');
        setTimeout(() => {
            loginForm.classList.remove('shake');
        }, 500);
        alert('Invalid username or password');
    }
}

// Handle logout with page transition
function handleLogout() {
    showLoader(() => {
        walletPage.classList.remove('active');
        transactionPage.classList.remove('active');
        loginPage.classList.add('active');
        loginForm.reset();
    });
}

// Show loader with callback
function showLoader(callback) {
    globalLoader.style.display = 'flex';
    globalLoader.style.opacity = '1';
    
    setTimeout(() => {
        callback();
        setTimeout(() => {
            globalLoader.style.opacity = '0';
            setTimeout(() => {
                globalLoader.style.display = 'none';
            }, 500);
        }, 100);
    }, 5000);
}

// Navigate between pages with transition
function navigateTo(page) {
    showLoader(() => {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        page.classList.add('active');
    });
}

// Handle send transaction
function handleSend(e) {
    e.preventDefault();
    
    const amount = document.getElementById('send-amount').value;
    const address = document.getElementById('recipient-address').value;
    const note = document.getElementById('send-note').value;
    
    if (parseFloat(amount) > 9650) {
        alert('Insufficient balance');
        return;
    }
    
    // Update transaction details
    txAmount.textContent = `$${parseFloat(amount).toFixed(2)}`;
    txAddress.textContent = shortenAddress(address);
    txId.textContent = shortenAddress(generateTxId());
    txTotal.textContent = `$${(parseFloat(amount) + 5).toFixed(2)}`;
    
    // Show transaction page
    sendModal.classList.remove('active');
    showLoader(() => {
        walletPage.classList.remove('active');
        transactionPage.classList.add('active');
    });
}

// Handle withdraw transaction
function handleWithdraw(e) {
    e.preventDefault();
    
    const amount = document.getElementById('withdraw-amount').value;
    const address = document.getElementById('withdraw-address').value;
    const network = document.getElementById('withdraw-network').value;
    
    if (parseFloat(amount) > 9650) {
        alert('Insufficient balance');
        return;
    }
    
    // Update transaction details
    txAmount.textContent = `$${parseFloat(amount).toFixed(2)}`;
    txAddress.textContent = shortenAddress(address);
    txId.textContent = shortenAddress(generateTxId());
    txTotal.textContent = `$${(parseFloat(amount) + 5).toFixed(2)}`;
    
    // Show transaction page
    withdrawModal.classList.remove('active');
    showLoader(() => {
        walletPage.classList.remove('active');
        transactionPage.classList.add('active');
    });
}

// Handle fee confirmation
function handleConfirmFee() {
    // Show loading modal
    loadingModal.classList.add('active');
    
    // Animate progress bar
    const progressFill = document.querySelector('.progress-fill');
    progressFill.style.animation = 'progressFill 50s linear';
    
    // Simulate transaction confirmation after 5 seconds
    setTimeout(() => {
        loadingModal.classList.remove('active');
        progressFill.style.animation = 'progressFill 0s linear';
        
        function showNotification(message, type = 'success', duration = 5000) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification-popup ${type}`;
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                                 type === 'error' ? 'times-circle' : 
                                 'exclamation-circle'}"></i>
                <span>${message}</span>
                <span class="close-btn"><i class="fas fa-times"></i></span>
            `;
            
            // Add to DOM
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Close functionality
            const closeBtn = notification.querySelector('.close-btn');
            const closeNotification = () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 1000);
            };
            
            closeBtn.addEventListener('click', closeNotification);
            
            // Auto-close after duration
            if (duration) {
                setTimeout(closeNotification, duration);
            }
            
            return closeNotification;
        }
        
        // Usage example:
        showNotification(
            "Transaction pending! Your transaction is being reviewed by the Bitcoin Network. Funds will be sent after review.", 
            "success", 
            8000
        );
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }, 50);
        
        // Return to wallet page
        showLoader(() => {
            transactionPage.classList.remove('active');
            walletPage.classList.add('active');
        });
    }, 5000);
}

// Generate random transaction ID
function generateTxId() {
    const chars = '0123456789abcdef';
    let result = '0x';
    for (let i = 0; i < 64; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

// Shorten address for display
function shortenAddress(address, chars = 6) {
    if (!address) return '';
    return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
}


// Fetch crypto prices from CoinGecko API
async function fetchCryptoPrices() {
    try {
        // In a real app, you would use the actual API:
        // const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,ripple,solana,cardano,dogecoin,polkadot,shiba-inu,avalanche-2,polygon,litecoin&vs_currencies=usd&include_24hr_change=true');
        // const data = await response.json();
        
        // For demo purposes, we'll simulate API response with random variations
        const simulatedResponse = {
            bitcoin: { usd: 93954.0, usd_24h_change: -0.00747 },
ethereum: { usd: 1798.22, usd_24h_change: 0.00117 },
binancecoin: { usd: 599.05, usd_24h_change: -0.00497 },
ripple: { usd: 2.17, usd_24h_change: -0.00913 },
solana: { usd: 146.45, usd_24h_change: -0.03013 },
cardano: { usd: 0.695102, usd_24h_change: -0.03347 },
dogecoin: { usd: 0.178047, usd_24h_change: -0.04344 },
polkadot: { usd: 4.14, usd_24h_change: -0.03044 },
"shiba-inu": { usd: 0.0000137, usd_24h_change: -0.06929 },
"avalanche-2": { usd: 22.16, usd_24h_change: -0.01204 },
polygon: { usd: 0.246367, usd_24h_change: -0.00566 },
litecoin: { usd: 84.95, usd_24h_change: -0.02401 }

        };
        
        // Update crypto data with prices
        cryptoData[0].price = simulatedResponse.bitcoin.usd;
        cryptoData[0].change = simulatedResponse.bitcoin.usd_24h_change;
        cryptoData[1].price = simulatedResponse.ethereum.usd;
        cryptoData[1].change = simulatedResponse.ethereum.usd_24h_change;
        cryptoData[2].price = simulatedResponse.binancecoin.usd;
        cryptoData[2].change = simulatedResponse.binancecoin.usd_24h_change;
        cryptoData[3].price = simulatedResponse.ripple.usd;
        cryptoData[3].change = simulatedResponse.ripple.usd_24h_change;
        cryptoData[4].price = simulatedResponse.solana.usd;
        cryptoData[4].change = simulatedResponse.solana.usd_24h_change;
        cryptoData[5].price = simulatedResponse.cardano.usd;
        cryptoData[5].change = simulatedResponse.cardano.usd_24h_change;
        cryptoData[6].price = simulatedResponse.dogecoin.usd;
        cryptoData[6].change = simulatedResponse.dogecoin.usd_24h_change;
        cryptoData[7].price = simulatedResponse.polkadot.usd;
        cryptoData[7].change = simulatedResponse.polkadot.usd_24h_change;
        cryptoData[8].price = simulatedResponse["shiba-inu"].usd;
        cryptoData[8].change = simulatedResponse["shiba-inu"].usd_24h_change;
        cryptoData[9].price = simulatedResponse["avalanche-2"].usd;
        cryptoData[9].change = simulatedResponse["avalanche-2"].usd_24h_change;
        cryptoData[10].price = simulatedResponse.polygon.usd;
        cryptoData[10].change = simulatedResponse.polygon.usd_24h_change;
        cryptoData[11].price = simulatedResponse.litecoin.usd;
        cryptoData[11].change = simulatedResponse.litecoin.usd_24h_change;
        
        // Display crypto prices
        displayCryptoPrices();
        
        // Update prices every 30 seconds
        setTimeout(fetchCryptoPrices, 30000);
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        // Fallback to default prices if API fails
        displayCryptoPrices();
    }
}

// Display crypto prices
function displayCryptoPrices() {
    cryptoListLogin.innerHTML = '';
    cryptoTicker.innerHTML = '';
    
    cryptoData.forEach(crypto => {
        const changeClass = crypto.change >= 0 ? 'positive' : 'negative';
        const changeSymbol = crypto.change >= 0 ? '+' : '';
        
        // For login page
        const cryptoItem = document.createElement('div');
        cryptoItem.className = 'crypto-item';
        cryptoItem.innerHTML = `
            <img src="${crypto.logo}" alt="${crypto.name}" class="crypto-logo">
            <div class="crypto-name">${crypto.name}</div>
            <div class="crypto-price">$${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: crypto.price < 1 ? 6 : 2 })}</div>
            <div class="crypto-change ${changeClass}">${changeSymbol}${crypto.change.toFixed(2)}%</div>
        `;
        cryptoListLogin.appendChild(cryptoItem);
        
        // For ticker
        const tickerItem = document.createElement('div');
        tickerItem.className = 'ticker-item';
        tickerItem.innerHTML = `
            <div class="ticker-name">
                <img src="${crypto.logo}" alt="${crypto.name}" class="ticker-logo">
                <span class="ticker-symbol">${crypto.symbol}</span>
            </div>
            <div class="ticker-price">$${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: crypto.price < 1 ? 6 : 2 })}</div>
            <div class="ticker-change ${changeClass}">${changeSymbol}${crypto.change.toFixed(2)}%</div>
        `;
        cryptoTicker.appendChild(tickerItem);
    });
    
    // Clone items for seamless ticker animation
    const tickerItems = cryptoTicker.querySelectorAll('.ticker-item');
    tickerItems.forEach(item => {
        const clone = item.cloneNode(true);
        cryptoTicker.appendChild(clone);
    });
}

// Display news
function displayNews() {
    newsList.innerHTML = '';
    
    newsData.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h4>${news.title}</h4>
            <p>${news.summary}</p>
            <a href="${news.url}" target="_blank"><i class="fas fa-external-link-alt"></i> Read more</a>
        `;
        newsList.appendChild(newsItem);
    });
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show copy notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check"></i>
            <span>Copied to clipboard!</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2000);
        }, 50);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}