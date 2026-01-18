// ===========================
// Application Form Functions
// ===========================

function openApplicationForm(jobTitle, jobId) {
    const modal = document.getElementById('applicationModal');
    const modalJobTitle = document.getElementById('modalJobTitle');
    const jobPositionInput = document.getElementById('jobPosition');
    const jobIdInput = document.getElementById('jobId');

    modalJobTitle.textContent = jobTitle;
    jobPositionInput.value = jobTitle;
    jobIdInput.value = jobId;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeApplicationForm() {
    const modal = document.getElementById('applicationModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Reset form
    const form = document.getElementById('applicationForm');
    if (form) {
        form.reset();
        resetFileUpload();
    }
}

// Close modal when clicking outside
document.getElementById('applicationModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'applicationModal') {
        closeApplicationForm();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('applicationModal');
        if (modal && modal.classList.contains('active')) {
            closeApplicationForm();
        }
    }
});

// ===========================
// File Upload Handling
// ===========================

const fileInput = document.getElementById('resume');
const fileLabel = fileInput?.parentElement;

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const fileNameSpan = fileLabel.querySelector('.file-name');

        if (file) {
            // Check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('File size must be less than 5MB', 'error');
                fileInput.value = '';
                return;
            }

            // Check file type
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];

            if (!allowedTypes.includes(file.type)) {
                showNotification('Please upload a PDF, DOC, or DOCX file', 'error');
                fileInput.value = '';
                return;
            }

            fileNameSpan.textContent = file.name;
            fileLabel.classList.add('has-file');
        } else {
            resetFileUpload();
        }
    });
}

function resetFileUpload() {
    if (fileInput) {
        fileInput.value = '';
        const fileNameSpan = fileLabel.querySelector('.file-name');
        fileNameSpan.textContent = '';
        fileLabel.classList.remove('has-file');
    }
}

// ===========================
// Form Submission
// ===========================

const applicationForm = document.getElementById('applicationForm');

if (applicationForm) {
    applicationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(applicationForm);
        const data = Object.fromEntries(formData);

        // Validate required fields
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = applicationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            // In a real application, you would send this to your backend
            // For now, we'll create a mailto link with the application data
            await handleApplicationSubmission(data);

            // Show success message
            showNotification('Application submitted successfully! We will review your application and get back to you soon.', 'success');

            // Close modal after a delay
            setTimeout(() => {
                closeApplicationForm();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);

        } catch (error) {
            console.error('Submission error:', error);
            showNotification('There was an error submitting your application. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function validateForm(data) {
    // Check required fields
    const requiredFields = [
        'fullName',
        'email',
        'phone',
        'citizenship',
        'experience',
        'education'
    ];

    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    // Check if resume is uploaded
    const resumeFile = fileInput?.files[0];
    if (!resumeFile) {
        showNotification('Please upload your resume', 'error');
        return false;
    }

    return true;
}

async function handleApplicationSubmission(data) {
    // Create email body with all application details
    const emailBody = `
New Job Application for ${data.jobPosition}

PERSONAL INFORMATION
--------------------
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
LinkedIn: ${data.linkedin || 'Not provided'}

QUALIFICATIONS
--------------
US Citizen/Permanent Resident: ${data.citizenship}
Years of Experience: ${data.experience}
Education Level: ${data.education}
Certifications: ${data.certifications || 'None listed'}

COVER LETTER
------------
${data.coverLetter || 'No cover letter provided'}

Note: Resume file attached separately by applicant.
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:RFI@noreasinc.com?subject=${encodeURIComponent(`Job Application - ${data.jobPosition} - ${data.fullName}`)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Simulate async operation
    return new Promise(resolve => setTimeout(resolve, 1000));
}

// ===========================
// Enhanced Notification System
// ===========================

function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    const bgColor = type === 'success' ? '#8ec63f' : type === 'error' ? '#dc3545' : '#0760ad';

    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${bgColor};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
        z-index: 100000;
        animation: slideIn 0.4s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 5000);
}

// ===========================
// Smooth Scroll to Job on Direct Link
// ===========================

window.addEventListener('load', () => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(() => {
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Highlight the job card briefly
                targetElement.style.transition = 'all 0.3s ease';
                targetElement.style.boxShadow = '0 0 0 3px var(--primary-green)';

                setTimeout(() => {
                    targetElement.style.boxShadow = '';
                }, 2000);
            }, 100);
        }
    }
});

// ===========================
// Form Field Enhancements
// ===========================

// Auto-format phone number
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        e.target.value = value;
    });
}

// Character count for textarea
const coverLetterTextarea = document.getElementById('coverLetter');
if (coverLetterTextarea) {
    const maxLength = 2000;

    const counterDiv = document.createElement('div');
    counterDiv.style.cssText = `
        text-align: right;
        color: var(--text-gray);
        font-size: 0.875rem;
        margin-top: 4px;
    `;
    coverLetterTextarea.parentNode.appendChild(counterDiv);

    const updateCounter = () => {
        const remaining = maxLength - coverLetterTextarea.value.length;
        counterDiv.textContent = `${remaining} characters remaining`;

        if (remaining < 100) {
            counterDiv.style.color = '#dc3545';
        } else {
            counterDiv.style.color = 'var(--text-gray)';
        }
    };

    coverLetterTextarea.addEventListener('input', updateCounter);
    coverLetterTextarea.setAttribute('maxlength', maxLength);
    updateCounter();
}

// ===========================
// Drag and Drop File Upload
// ===========================

if (fileLabel) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileLabel.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileLabel.addEventListener(eventName, () => {
            fileLabel.classList.add('highlight');
            fileLabel.style.borderColor = 'var(--primary-green)';
            fileLabel.style.background = 'rgba(142, 198, 63, 0.1)';
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileLabel.addEventListener(eventName, () => {
            fileLabel.classList.remove('highlight');
            fileLabel.style.borderColor = '';
            fileLabel.style.background = '';
        }, false);
    });

    fileLabel.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            fileInput.files = files;
            // Trigger change event
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
        }
    }, false);
}

// ===========================
// Initialize Animations on Scroll
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Careers page initialized successfully');

    // Trigger initial animations for elements in view
    setTimeout(() => {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('aos-animate');
            }
        });
    }, 100);
});
