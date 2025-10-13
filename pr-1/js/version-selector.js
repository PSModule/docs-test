document.addEventListener('DOMContentLoaded', function () {
    const select = document.querySelector('.md-version select');
    if (select) {
        const options = Array.from(select.options);
        options.sort((a, b) => {
            const va = a.value;
            const vb = b.value;
            if (va === 'latest') return -1;
            if (vb === 'latest') return 1;
            if (va.startsWith('pr-') && vb.startsWith('pr-')) {
                return parseInt(vb.substring(3)) - parseInt(va.substring(3));
            }
            if (va.startsWith('pr-')) return 1;
            if (vb.startsWith('pr-')) return -1;
            // For other versions, assume semver-like, sort descending
            return vb.localeCompare(va, undefined, { numeric: true, sensitivity: 'base' });
        });
        select.innerHTML = '';
        options.forEach(opt => select.appendChild(opt));
        // Trigger change to update current display if needed
        select.dispatchEvent(new Event('change'));
    }
});
