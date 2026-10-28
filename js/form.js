/**
 * MUNDO — GET INVOLVED (EXPRESSION OF INTEREST) FORM
 * Manages role switching tabs, field validation, accessible feedback,
 * and transparent local expression recording for Mundo.
 */

document.addEventListener('DOMContentLoaded', () => {
  initInvolvementForm();
});

function initInvolvementForm() {
  const form = document.getElementById('interest-form');
  const studentTabBtn = document.getElementById('tab-student');
  const providerTabBtn = document.getElementById('tab-provider');
  const roleSelect = document.getElementById('form-role');
  const feedbackCard = document.getElementById('form-feedback');
  const formCardBody = document.getElementById('form-fields-container');
  const resetBtn = document.getElementById('feedback-reset-btn');
  const contactMethodRadios = document.querySelectorAll('input[name="contact_method"]');
  const contactInput = document.getElementById('form-contact');
  const contactLabel = document.getElementById('contact-label');

  if (!form) return;

  // Track active role
  let currentRole = 'student'; // 'student' | 'provider'

  // Switch role tabs
  const setRole = (role) => {
    currentRole = role;
    if (role === 'student') {
      studentTabBtn.classList.add('active');
      studentTabBtn.setAttribute('aria-selected', 'true');
      providerTabBtn.classList.remove('active');
      providerTabBtn.setAttribute('aria-selected', 'false');
      if (roleSelect) roleSelect.value = 'student';
      updateRoleHelpText('student');
    } else {
      providerTabBtn.classList.add('active');
      providerTabBtn.setAttribute('aria-selected', 'true');
      studentTabBtn.classList.remove('active');
      studentTabBtn.setAttribute('aria-selected', 'false');
      if (roleSelect) roleSelect.value = 'provider';
      updateRoleHelpText('provider');
    }
  };

  const updateRoleHelpText = (role) => {
    const messagePlaceholder = document.getElementById('form-message');
    if (!messagePlaceholder) return;

    if (role === 'student') {
      messagePlaceholder.placeholder = 'E.g., Your typical campus routes, daily transport challenges, or suggestions for the Mundo WhatsApp service...';
    } else {
      messagePlaceholder.placeholder = 'E.g., Your transport routes, fleet size, operational questions, or interest in exploring a pilot partnership with Mundo...';
    }
  };

  if (studentTabBtn) {
    studentTabBtn.addEventListener('click', () => setRole('student'));
  }

  if (providerTabBtn) {
    providerTabBtn.addEventListener('click', () => setRole('provider'));
  }

  if (roleSelect) {
    roleSelect.addEventListener('change', (e) => {
      if (e.target.value === 'provider') {
        setRole('provider');
      } else {
        setRole('student');
      }
    });
  }

  // Handle contact method radio changes
  contactMethodRadios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'phone') {
        contactLabel.innerHTML = 'WhatsApp / Phone Number <span class="required">*</span>';
        contactInput.placeholder = '+263 77 123 4567';
        contactInput.type = 'tel';
      } else {
        contactLabel.innerHTML = 'Email Address <span class="required">*</span>';
        contactInput.placeholder = 'yourname@example.com';
        contactInput.type = 'email';
      }
      clearError(contactInput);
    });
  });

  // Validation helpers
  const showError = (inputEl, errorId, message) => {
    inputEl.classList.add('error');
    inputEl.setAttribute('aria-invalid', 'true');
    const errEl = document.getElementById(errorId);
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('visible');
    }
  };

  const clearError = (inputEl) => {
    inputEl.classList.remove('error');
    inputEl.removeAttribute('aria-invalid');
    const errEl = document.getElementById(`${inputEl.id}-error`);
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    }
  };

  // Real-time error clearing on input
  form.querySelectorAll('input, select, textarea').forEach((input) => {
    input.addEventListener('input', () => clearError(input));
    input.addEventListener('change', () => clearError(input));
  });

  // Form Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // 1. Full Name
    const nameInput = document.getElementById('form-name');
    const nameValue = nameInput.value.trim();
    if (!nameValue || nameValue.length < 2) {
      showError(nameInput, 'form-name-error', 'Please enter your full name (minimum 2 characters).');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // 2. Contact Detail
    const contactMethod = document.querySelector('input[name="contact_method"]:checked')?.value || 'email';
    const contactValue = contactInput.value.trim();

    if (!contactValue) {
      showError(contactInput, 'form-contact-error', 'Please provide your contact information.');
      isValid = false;
    } else if (contactMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactValue)) {
        showError(contactInput, 'form-contact-error', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError(contactInput);
      }
    } else {
      // Phone format validation (allows international or local Zimbabwean formats)
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      const cleaned = contactValue.replace(/[\s\-\(\)]/g, '');
      if (cleaned.length < 8 || !phoneRegex.test(contactValue)) {
        showError(contactInput, 'form-contact-error', 'Please enter a valid phone number (e.g., +263 77 123 4567).');
        isValid = false;
      } else {
        clearError(contactInput);
      }
    }

    // 3. Data Acknowledgement Checkbox
    const consentInput = document.getElementById('form-consent');
    if (!consentInput.checked) {
      showError(consentInput, 'form-consent-error', 'Please acknowledge the information use terms to proceed.');
      isValid = false;
    } else {
      clearError(consentInput);
    }

    if (!isValid) {
      // Focus first error element for keyboard users
      const firstError = form.querySelector('.form-control.error, input[type="checkbox"].error');
      if (firstError) firstError.focus();
      return;
    }

    // Gather payload
    const submission = {
      fullName: nameValue,
      role: currentRole,
      contactMethod: contactMethod,
      contactDetail: contactValue,
      message: document.getElementById('form-message')?.value.trim() || '',
      submittedAt: new Date().toISOString()
    };

    // Store in localStorage for transparent offline prototype record
    try {
      const existing = JSON.parse(localStorage.getItem('mundo_expressions') || '[]');
      existing.push(submission);
      localStorage.setItem('mundo_expressions', JSON.stringify(existing));
    } catch (err) {
      console.warn('Storage unavailable:', err);
    }

    // Show honest, transparent success state
    formCardBody.style.display = 'none';
    feedbackCard.classList.add('visible');

    const feedbackRoleSpan = document.getElementById('feedback-role-text');
    if (feedbackRoleSpan) {
      feedbackRoleSpan.textContent = currentRole === 'student' ? 'Student Feedback & Pilot Interest' : 'Transport Provider Partnership Interest';
    }

    feedbackCard.setAttribute('tabindex', '-1');
    feedbackCard.focus();
  });

  // Reset form to submit another
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      feedbackCard.classList.remove('visible');
      formCardBody.style.display = 'block';
      setRole('student');
      document.getElementById('form-name').focus();
    });
  }
}
