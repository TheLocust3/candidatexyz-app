// Stolen from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function uuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

export function volunteerApi(url, hash) {
    return $.ajax(`${VOLUNTEER_API_DOMAIN}${url}`, {
        beforeSend: function(xhr, settings) {
            addAuthHeaders(xhr);
        },
        ...hash
    });
}

export function userApi(url, hash) {
    return $.ajax(`${USER_API_DOMAIN}${url}`, {
        beforeSend: function(xhr, settings) {
            addAuthHeaders(xhr);
        },
        ...hash
    });
}

function addAuthHeaders(xhr) { // attach authentication headers to request, modified from https://github.com/lynndylanhurley/j-toker/blob/0f76481813c6a20642de0756c5077da338ac4a0b/src/j-toker.js#L1172
    let currentHeaders = $.auth.retrieveData('authHeaders');
    for (var key in $.auth.getConfig().tokenFormat) {
        xhr.setRequestHeader(key, currentHeaders[key]);
    }
}

