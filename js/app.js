// js/app.js - client side behaviour, form submission
document.addEventListener('DOMContentLoaded', () => {
    // set year
    document.getElementById('year').textContent = new Date().getFullYear();

    const form = document.getElementById('contact-form');
    const msg = document.getElementById('form-message');
    const clearBtn = document.getElementById('clearBtn');

    clearBtn.addEventListener('click', () => {
        form.reset();
        msg.textContent = '';
        msg.className = 'form-message';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        msg.textContent = 'Sending...';

        // Basic client-side validation
        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            paperwork: form.paperwork.value || '',
            keys: form.keys.value || '',
            zipcode: form.zipcode.value.trim(),
            vehicle_type: form.vehicle_type.value,
            notes: form.notes.value.trim(),
            source: form.source.value || 'website'
        };

        // simple checks
        if (!data.name || !data.email || !data.phone || !data.zipcode || !data.vehicle_type) {
            msg.textContent = 'Please fill the required fields.';
            return;
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({ error: 'unknown' }));
                msg.textContent = 'Error sending form: ' + (err.error || res.statusText);
                msg.classList.add('error');
                return;
            }

            const resp = await res.json();
            msg.textContent = resp.message || 'Request sent — we will contact you soon.';
            msg.classList.add('success');
            form.reset();
        } catch (err) {
            console.error(err);
            msg.textContent = 'Network error. Please try again or call 279-675-1575.';
            msg.classList.add('error');
        }
    });
});
