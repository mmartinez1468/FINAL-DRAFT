// Toggle mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Mobile dropdown toggles
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                // Only handle clicks on mobile
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    this.classList.toggle('active');
                    
                    // Find the dropdown associated with this toggle
                    const dropdown = this.nextElementSibling;
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdownToggles.forEach(otherToggle => {
                        if (otherToggle !== toggle) {
                            otherToggle.classList.remove('active');
                            otherToggle.nextElementSibling.classList.remove('active');
                        }
                    });
                }
            });
        });
        
        // Close mobile menu when clicking on a regular nav link (not dropdown toggle)
        document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
        
        // Close mobile menu when clicking on a dropdown link
        document.querySelectorAll('.dropdown-link').forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    
                    // Also close the active dropdown
                    document.querySelectorAll('.dropdown-toggle.active').forEach(active => {
                        active.classList.remove('active');
                        active.nextElementSibling.classList.remove('active');
                    });
                }
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                // Reset mobile menu and dropdowns for desktop view
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                dropdownToggles.forEach(toggle => {
                    toggle.classList.remove('active');
                    if (toggle.nextElementSibling) {
                        toggle.nextElementSibling.classList.remove('active');
                    }
                });
            }
        });








        











// IIFE to isolate the slider code and prevent conflicts with navbar
(function() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Get slider elements
        const sliderTrack = document.querySelector('.variety-slider-track');
        const navItems = document.querySelectorAll('.variety-nav-item');
        const prevButton = document.querySelector('.variety-prev');
        const nextButton = document.querySelector('.variety-next');
        
        // Get the number of slides
        const slideCount = document.querySelectorAll('.variety-slider-image').length;
        
        // Initialize current index
        let currentIndex = 0;
        let interval;
        
        // Function to update the slider position
        function updateSliderPosition() {
            if (sliderTrack) {
                // Move the track based on current index (-100% * currentIndex)
                sliderTrack.style.transform = `translateX(${-currentIndex * (100 / slideCount)}%)`;
                
                // Update active nav item
                navItems.forEach((item, index) => {
                    if (index === currentIndex) {
                        item.classList.add('variety-active');
                    } else {
                        item.classList.remove('variety-active');
                    }
                });
            }
        }
        
        // Function to go to a specific slide
        function goToSlide(index) {
            // Handle boundaries
            if (index < 0) {
                index = slideCount - 1;
            } else if (index >= slideCount) {
                index = 0;
            }
            
            // Update current index and position
            currentIndex = index;
            updateSliderPosition();
        }
        
        // Add click event listeners to nav items
        navItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                goToSlide(index);
                resetAutoRotation();
            });
        });
        
        // Add click event listeners to prev/next buttons
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                goToSlide(currentIndex - 1);
                resetAutoRotation();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                goToSlide(currentIndex + 1);
                resetAutoRotation();
            });
        }
        
        // Function to reset auto-rotation
        function resetAutoRotation() {
            clearInterval(interval);
            startAutoRotation();
        }
        

        
    });
})(); // Self-executing function to isolate scope




















        










// Intersection Observer to handle animations when elements enter viewport
document.addEventListener('DOMContentLoaded', function() {
  // Get all elements with the 'animate' class
  const animatedElements = document.querySelectorAll('.animate');
  
  // Create an observer with appropriate options
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the element is in the viewport
      if (entry.isIntersecting) {
        // Add the 'visible' class to trigger the animation
        entry.target.classList.add('visible');
        
        // Optionally unobserve the element after it's animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    // Options for the observer
    rootMargin: '0px',   // No margin
  });
  
  // Observe each animated element
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Add visible class immediately for elements already in viewport on page load
  setTimeout(() => {
    animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      ) {
        element.classList.add('visible');
      }
    });
  }, 100);
});













        // Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-switch');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else if (savedTheme === 'dark') {
        document.body.classList.remove('light-mode');
    } else {
        // If no saved preference, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.body.classList.add('light-mode');
        }
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Save preference to localStorage
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { // Only if user hasn't set preference
            if (e.matches) {
                document.body.classList.add('light-mode');
            } else {
                document.body.classList.remove('light-mode');
            }
        }
    });
});






























// Global state for pricing
        let isYearly = false;
        
        // Function to update all pricing displays
        function updateAllPrices() {
            const priceElements = document.querySelectorAll('[data-price="pricing"]');
            const toggleElements = document.querySelectorAll('[data-toggle="pricing"]');
            
            // Update all toggle switches
            toggleElements.forEach(toggle => {
                if (isYearly) {
                    toggle.classList.add('active');
                } else {
                    toggle.classList.remove('active');
                }
            });
            
            // Update all price displays
            priceElements.forEach(priceElement => {
                // Get the monthly price from the data attribute
                let monthlyPrice = parseInt(priceElement.getAttribute('data-monthly')) || 10;
                
                const yearlyPrice = monthlyPrice * 10; // 20% discount on yearly
                const yearlySavings = monthlyPrice * 12 - yearlyPrice;
                const savingsPercent = Math.round((yearlySavings / (monthlyPrice * 12)) * 100);
                
                if (isYearly) {
                    priceElement.innerHTML = `
                        <p>$${yearlyPrice} /year</p>
                        <p style="font-size: 14px; color: #7c7a7a; margin-top: 5px;">
                            Save $${yearlySavings} (${savingsPercent}% off)
                        </p>`;
                } else {
                    priceElement.innerHTML = `
                        <p>$${monthlyPrice} /month</p>
                        <p style="font-size: 14px; color: #7c7a7a; margin-top: 5px;">
                            $${monthlyPrice * 12} /year (Save ${savingsPercent}% yearly)
                        </p>`;
                }
            });
        }
        
        // Setup event listeners for all toggles
        document.querySelectorAll('[data-toggle="pricing"]').forEach(toggle => {
            toggle.addEventListener('click', function() {
                isYearly = !isYearly;
                updateAllPrices();
            });
        });
        
        // Initialize prices on page load
        updateAllPrices();


        












document.addEventListener('DOMContentLoaded', () => {
    // Word rotation animation with instant disappearance
    const words = ["Websites", "Applications", "Solutions", "Experiences", "Innovations"];
    const wordElement = document.getElementById('rotating-word');
    let currentIndex = 0;
    
    // Start the word rotation
    startWordRotation();
    
    function startWordRotation() {
        setInterval(() => {
            // Hide the current word instantly
            wordElement.classList.add('word-hidden');
            wordElement.classList.remove('word-visible');
            
            // After a short delay, show the next word
            setTimeout(() => {
                // Change to next word
                currentIndex = (currentIndex + 1) % words.length;
                wordElement.textContent = words[currentIndex];
                
                // Make the new word visible with animation
                wordElement.classList.remove('word-hidden');
                wordElement.classList.add('word-visible');
            }, 200);
        }, 3000); // Change word every 3 seconds
    }
});














        











document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.querySelector('.toggle-switch-pricing');
    const toggleSlider = document.querySelector('.toggle-slider-pricing');
    
    toggleSwitch.addEventListener('click', function() {
        // Toggle active class
        toggleSlider.classList.toggle('active');
        
        // Change text based on state
        if (toggleSlider.classList.contains('active')) {
            toggleSlider.textContent = 'Social Media';
            pricingDetails.style.display = 'block';
        } else {
            toggleSlider.textContent = 'Web Development';
            pricingDetails.style.display = 'none';
        }
    });
});







































document.addEventListener('DOMContentLoaded', function() {
  const webButton = document.querySelector('.switch-plans-web');
  const mediaButton = document.querySelector('.switch-plans-media');
  
  // Social media plan data
  const mediaData = [
    {
      name: "Basic",
      monthlyPrice: 50,
      features: ["3 Posts/Week", "1 Platform", "Basic Analytics"]
    },
    {
      name: "Growth",
      monthlyPrice: 100,
      features: ["5 Posts/Week", "3 Platforms", "Advanced Analytics"]
    },
    {
      name: "Pro",
      monthlyPrice: 200,
      features: ["Daily Posts", "All Platforms", "Premium Analytics"]
    }
  ];
  
  // Social media services data
  const mediaServicesData = [
    {
      title: "CONTENT CREATION",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4ZM4 5V19H20V5H4ZM9 7H15V9H9V7ZM9 11H15V13H9V11ZM9 15H13V17H9V15Z"></path></svg>',
      features: [
        {
          name: "Posts Per Month",
          tiers: [
            { type: "checkmark", text: "12" },
            { type: "checkmark", text: "20" },
            { type: "checkmark", text: "30" }
          ]
        },
        {
          name: "Custom Graphics",
          tiers: [
            { type: "checkmark", text: "5/month" },
            { type: "checkmark", text: "10/month" },
            { type: "checkmark", text: "Unlimited" }
          ]
        },
        {
          name: "Video Content",
          tiers: [
            { type: "x" },
            { type: "checkmark", text: "2/month" },
            { type: "checkmark", text: "4/month" }
          ]
        },
        {
          name: "Caption Writing",
          tiers: [
            { type: "checkmark" },
            { type: "checkmark" },
            { type: "checkmark" }
          ]
        },
        {
          name: "Hashtag Research",
          tiers: [
            { type: "checkmark", text: "Basic" },
            { type: "checkmark", text: "Advanced" },
            { type: "checkmark", text: "Premium" }
          ]
        }
      ]
    },
    {
      title: "PLATFORM MANAGEMENT",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7ZM4 15V19H20V15H4ZM4 13H20V7H4V13ZM9 3V5H15V3H9ZM10 11H14V9H10V11Z"></path></svg>',
      features: [
        {
          name: "Platforms",
          tiers: [
            { type: "checkmark", text: "1" },
            { type: "checkmark", text: "3" },
            { type: "checkmark", text: "All" }
          ]
        },
        {
          name: "Posting Schedule",
          tiers: [
            { type: "checkmark", text: "Basic" },
            { type: "checkmark", text: "Custom" },
            { type: "checkmark", text: "Advanced" }
          ]
        },
        {
          name: "Comment Management",
          tiers: [
            { type: "x" },
            { type: "checkmark" },
            { type: "checkmark" }
          ]
        },
        {
          name: "DM Response",
          tiers: [
            { type: "x" },
            { type: "x" },
            { type: "checkmark", text: "24hr" }
          ]
        },
        {
          name: "Competitor Monitoring",
          tiers: [
            { type: "x" },
            { type: "checkmark", text: "Monthly" },
            { type: "checkmark", text: "Weekly" }
          ]
        }
      ]
    },
    {
      title: "ANALYTICS & REPORTING",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z"></path></svg>',
      features: [
        {
          name: "Performance Metrics",
          tiers: [
            { type: "checkmark", text: "Basic" },
            { type: "checkmark", text: "Standard" },
            { type: "checkmark", text: "Advanced" }
          ]
        },
        {
          name: "Reporting Frequency",
          tiers: [
            { type: "checkmark", text: "Monthly" },
            { type: "checkmark", text: "Bi-weekly" },
            { type: "checkmark", text: "Weekly" }
          ]
        },
        {
          name: "Audience Insights",
          tiers: [
            { type: "x" },
            { type: "checkmark", text: "Basic" },
            { type: "checkmark", text: "Advanced" }
          ]
        },
        {
          name: "Strategy Adjustment",
          tiers: [
            { type: "checkmark", text: "Quarterly" },
            { type: "checkmark", text: "Monthly" },
            { type: "checkmark", text: "Ongoing" }
          ]
        },
        {
          name: "ROI Analysis",
          tiers: [
            { type: "x" },
            { type: "x" },
            { type: "checkmark" }
          ]
        }
      ]
    }
  ];
  
  // Store original web data
  const webData = [];
  document.querySelectorAll('.pricing-card').forEach((card, index) => {
    const nameElement = card.querySelector('.pricing-card-name h3');
    const priceElement = card.querySelector('[data-price="pricing"]');
    const featureElements = card.querySelectorAll('.pricing-explained li p');
    const features = [];
    
    featureElements.forEach(el => {
      if (el) features.push(el.textContent);
    });
    
    webData.push({
      name: nameElement.textContent,
      monthlyPrice: parseInt(priceElement.getAttribute('data-monthly')),
      features: features
    });
  });

  // Store original web services data
  const webServicesData = [];
  document.querySelectorAll('.pricing-services-container').forEach(container => {
    const titleElement = container.querySelector('.pricing-services-intro h3');
    const iconElement = container.querySelector('.pricing-services-intro svg');
    const features = [];

    container.querySelectorAll('.pricing-services-wrapper').forEach(wrapper => {
      const nameElement = wrapper.querySelector('.pricing-services-name p');
      const tiers = [];

      wrapper.querySelectorAll('.services-explained-card').forEach(card => {
        const checkmarkElement = card.querySelector('svg');
        const textElement = card.querySelector('p');
        
        let tier = {
          type: checkmarkElement && checkmarkElement.id === 'checkmarkNo' ? 'x' : 'checkmark',
          text: textElement ? textElement.textContent : ''
        };
        
        tiers.push(tier);
      });

      features.push({
        name: nameElement ? nameElement.textContent : '',
        tiers: tiers
      });
    });

    webServicesData.push({
      title: titleElement ? titleElement.textContent : '',
      icon: iconElement ? iconElement.outerHTML : '',
      features: features
    });
  });
  
  // Function to update pricing cards
  function updatePricingCards(data, servicesData) {
    // Update desktop pricing cards
    document.querySelectorAll('.pricing-card').forEach((card, index) => {
      if (data[index]) {
        // Update plan name
        const nameElement = card.querySelector('.pricing-card-name h3');
        if (nameElement) nameElement.textContent = data[index].name;
        
        // Update pricing
        const priceElement = card.querySelector('[data-price="pricing"]');
        if (priceElement) priceElement.setAttribute('data-monthly', data[index].monthlyPrice);
        
        // Update features
        const featureElements = card.querySelectorAll('.pricing-explained li p');
        data[index].features.forEach((feature, i) => {
          if (featureElements[i]) {
            featureElements[i].textContent = feature;
          }
        });
      }
    });
    
    // Update mobile pricing cards
    document.querySelectorAll('.pricing-depth-card').forEach((card, index) => {
      if (data[index]) {
        // Update plan name
        const nameElement = card.querySelector('span');
        if (nameElement) nameElement.textContent = data[index].name;
        
        // Update pricing
        const priceElement = card.querySelector('#pricingDepthCost');
        if (priceElement) {
          priceElement.setAttribute('data-monthly', data[index].monthlyPrice);
          priceElement.setAttribute('data-yearly', data[index].monthlyPrice * 10);
          
          // Update the displayed price text
          const priceText = priceElement.querySelector('p');
          if (priceText) {
            if (isYearly) {
              priceText.textContent = `$${data[index].monthlyPrice * 10} /year`;
            } else {
              priceText.textContent = `$${data[index].monthlyPrice} /month`;
            }
          }
        }
      }
    });
    
    // Update services section
    const servicesContainer = document.querySelector('.pricing-services');
    if (servicesContainer) {
      // Clear existing services
      servicesContainer.innerHTML = '';
      
      // Add new services
      servicesData.forEach(serviceCategory => {
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'pricing-services-container';
        
        // Create header
        const headerHtml = `
          <div class="pricing-services-intro">
            ${serviceCategory.icon}
            <h3>${serviceCategory.title}</h3>
          </div>
        `;
        categoryContainer.innerHTML = headerHtml;
        
        // Create features
        serviceCategory.features.forEach(feature => {
          const featureWrapper = document.createElement('div');
          featureWrapper.className = 'pricing-services-wrapper';
          
          // Feature name
          const nameHtml = `
            <div class="pricing-services-name">
              <p>${feature.name}</p>
            </div>
          `;
          featureWrapper.innerHTML = nameHtml;
          
          // Feature tiers
          const tiersContainer = document.createElement('div');
          tiersContainer.className = 'pricing-services-explained';
          
          feature.tiers.forEach((tier, index) => {
            const tierCard = document.createElement('div');
            tierCard.className = 'services-explained-card';
            
            // Apply positioning classes based on index
            if (index === 1) {
              tierCard.classList.add('middle-card');
            } else if (index === 2) {
              tierCard.classList.add('last-card');
            }
            
            let svgHtml = '';
            if (tier.type === 'checkmark') {
              svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>';
            } else if (tier.type === 'x') {
              svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" id="checkmarkNo" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path></svg>';
            }
            
            tierCard.innerHTML = svgHtml;
            
            // Add text if present
            if (tier.text) {
              const textP = document.createElement('p');
              textP.textContent = tier.text;
              tierCard.appendChild(textP);
            }
            
            tiersContainer.appendChild(tierCard);
          });
          
          featureWrapper.appendChild(tiersContainer);
          categoryContainer.appendChild(featureWrapper);
        });
        
        servicesContainer.appendChild(categoryContainer);
      });
    }
    
    // Trigger price update to refresh the displayed prices
    updateAllPrices();
  }
  
  // Enhance existing event listeners for web/media buttons
  webButton.addEventListener('click', function(e) {
    e.preventDefault();
    webButton.classList.add('active');
    mediaButton.classList.remove('active');
    updatePricingCards(webData, webServicesData);
  });
  
  mediaButton.addEventListener('click', function(e) {
    e.preventDefault();
    mediaButton.classList.add('active');
    webButton.classList.remove('active');
    updatePricingCards(mediaData, mediaServicesData);
  });
});











































document.addEventListener('DOMContentLoaded', function() {
  // Only apply on desktop (matching your media query)
  if (window.innerWidth >= 993) {
    // Select ALL pricing-explained elements
    const pricingExplainedElements = document.querySelectorAll('.pricing-card .pricing-explained');
    
    // Create a sentinel element to trigger the hiding
    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.width = '100%';
    sentinel.style.position = 'absolute';
    sentinel.style.top = '100px'; // Adjust this value as needed
    sentinel.style.visibility = 'hidden';
    document.body.appendChild(sentinel);
    
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        // When scrolled down, add the hidden class to ALL pricing-explained elements
        pricingExplainedElements.forEach(element => {
          element.classList.add('hidden');
        });
      } else {
        // When scrolled back up, remove the hidden class from ALL elements
        pricingExplainedElements.forEach(element => {
          element.classList.remove('hidden');
        });
      }
    }, {
      threshold: 0,
      rootMargin: '0px'
    });
    
    observer.observe(sentinel);
  }
});






























