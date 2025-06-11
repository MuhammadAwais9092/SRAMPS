// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add FAQ accordion functionality
    initFAQAccordion();
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Validate form
    if (!validateContactForm(form)) {
        return;
    }
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
        
        // Show success message
        showToast('Thank you for your message! We will get back to you soon.', 'success');
        
        // Clear any error states
        const errorElements = form.querySelectorAll('.error-message');
        errorElements.forEach(error => error.remove());
        
        const errorFields = form.querySelectorAll('.form-control.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
    }, 2000);
}

function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Clear previous errors
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(error => error.remove());
    
    const errorFields = form.querySelectorAll('.form-control.error');
    errorFields.forEach(field => field.classList.remove('error'));
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        
        if (!value) {
            isValid = false;
            showFieldError(field, 'This field is required');
        } else {
            // Specific validation for email
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    showFieldError(field, 'Please enter a valid email address');
                }
            }
            
            // Specific validation for select
            if (field.tagName === 'SELECT' && value === '') {
                isValid = false;
                showFieldError(field, 'Please select an option');
            }
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            // Initially hide all answers
            answer.style.display = 'none';
            question.style.cursor = 'pointer';
            question.style.position = 'relative';
            
            // Add expand/collapse icon
            const icon = document.createElement('i');
            icon.className = 'fas fa-plus';
            icon.style.position = 'absolute';
            icon.style.right = '0';
            icon.style.top = '50%';
            icon.style.transform = 'translateY(-50%)';
            icon.style.color = '#2fa5bf';
            icon.style.transition = 'transform 0.3s ease';
            question.appendChild(icon);
            
            question.addEventListener('click', function() {
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('p');
                    const otherIcon = otherItem.querySelector('i');
                    if (otherAnswer && otherIcon) {
                        otherAnswer.style.display = 'none';
                        otherIcon.className = 'fas fa-plus';
                        otherIcon.style.transform = 'translateY(-50%)';
                    }
                });
                
                // Toggle current item
                if (!isOpen) {
                    answer.style.display = 'block';
                    icon.className = 'fas fa-minus';
                    icon.style.transform = 'translateY(-50%) rotate(180deg)';
                }
            });
        }
    });
}

// Toast notification function (if not already defined in main.js)
if (typeof showToast === 'undefined') {
    function showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: getToastColor(type),
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '400px'
        });
        
        toast.querySelector('.toast-content').style.display = 'flex';
        toast.querySelector('.toast-content').style.alignItems = 'center';
        toast.querySelector('.toast-content').style.gap = '10px';
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide toast after 5 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 5000);
        
        // Allow manual close
        toast.addEventListener('click', () => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        });
    }
    
    function getToastIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }
    
    function getToastColor(type) {
        switch (type) {
            case 'success': return '#4caf50';
            case 'error': return '#f44336';
            case 'warning': return '#ff9800';
            default: return '#2196f3';
        }
    }
}

// Add styles for FAQ items
const faqStyles = `
    .faq-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        max-width: 800px;
        margin: 0 auto;
    }
    
    .faq-item {
        background: white;
        border-radius: 8px;
        padding: 25px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    
    .faq-item:hover {
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    }
    
    .faq-item h4 {
        margin-bottom: 15px;
        color: #1a1a1a;
        font-weight: 600;
        padding-right: 30px;
    }
    
    .faq-item p {
        color: #666;
        line-height: 1.6;
        margin: 0;
    }
    
    .transport-options {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 20px;
    }
    
    .transport-item {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #666;
    }
    
    .transport-item i {
        color: #2fa5bf;
        font-size: 1.2rem;
    }
    
    .directions-info {
        margin-top: 40px;
        text-align: center;
    }
    
    .directions-info h3 {
        color: #1a1a1a;
        margin-bottom: 15px;
    }
    
    .directions-info p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 20px;
    }
    
    @media (max-width: 768px) {
        .transport-options {
            flex-direction: column;
            gap: 15px;
        }
        
        .faq-item {
            padding: 20px;
        }
        
        .faq-item h4 {
            font-size: 1.1rem;
            padding-right: 25px;
        }
    }
`;

// Inject FAQ styles
const styleSheet = document.createElement('style');
styleSheet.textContent = faqStyles;
document.head.appendChild(styleSheet);